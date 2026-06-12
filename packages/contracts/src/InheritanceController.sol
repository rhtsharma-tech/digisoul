// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./AssetVault.sol";
import "./NomineeManager.sol";
import "./WillRegistry.sol";

contract InheritanceController is Ownable, ReentrancyGuard {
    enum ClaimStatus { PENDING, APPROVED, REJECTED, EXECUTED, CANCELLED }

    struct Claim {
        uint256 willId;
        address initiatedBy;
        ClaimStatus status;
        uint256 approvals;
        uint256 requiredApprovals;
        uint256 createdAt;
        uint256 approvedAt;
        uint256 executedAt;
        string rejectionReason;
    }

    AssetVault public immutable assetVault;
    NomineeManager public immutable nomineeManager;
    WillRegistry public immutable willRegistry;

    uint256 public inactivityPeriod;
    uint256 public lastPulse;
    uint256 public requiredApprovals;
    mapping(uint256 => Claim) public claims;
    mapping(address => bool) public isApprover;
    mapping(address => uint256) public approvalCount;

    event PulseRecorded(uint256 timestamp, uint256 remainingDays);
    event InactivityPeriodSet(uint256 periodDays);
    event ClaimInitiated(uint256 indexed willId, address nominee, uint256 timestamp);
    event ClaimApproved(uint256 indexed willId, address approver, uint256 totalApprovals);
    event ClaimRejected(uint256 indexed willId, string reason);
    event ClaimExecuted(uint256 indexed willId, uint256 timestamp);
    event ClaimCancelled(uint256 indexed willId, uint256 timestamp);
    event ApproverAdded(address indexed approver);
    event ApproverRemoved(address indexed approver);
    event AssetTransferred(uint256 indexed willId, uint256 indexed assetId, address indexed to, uint256 amount);

    constructor(
        address payable _assetVault,
        address _nomineeManager,
        address _willRegistry
    ) Ownable(msg.sender) {
        assetVault = AssetVault(_assetVault);
        nomineeManager = NomineeManager(_nomineeManager);
        willRegistry = WillRegistry(_willRegistry);
        inactivityPeriod = 90 days;
        lastPulse = block.timestamp;
        requiredApprovals = 2;
    }

    function pulse() external onlyOwner {
        lastPulse = block.timestamp;
        emit PulseRecorded(block.timestamp, inactivityPeriod / 1 days);
    }

    function setInactivityPeriod(uint256 periodDays) external onlyOwner {
        require(periodDays >= 7 days && periodDays <= 365 days, "Period must be 7-365 days");
        inactivityPeriod = periodDays * 1 days;
        emit InactivityPeriodSet(periodDays);
    }

    function setRequiredApprovals(uint256 count) external onlyOwner {
        require(count > 0, "Must require at least 1 approval");
        requiredApprovals = count;
    }

    function addApprover(address approver) external onlyOwner {
        require(approver != address(0), "Invalid address");
        require(!isApprover[approver], "Already approver");

        isApprover[approver] = true;
        approvalCount[approver] = 0;

        emit ApproverAdded(approver);
    }

    function removeApprover(address approver) external onlyOwner {
        require(isApprover[approver], "Not an approver");

        isApprover[approver] = false;
        delete approvalCount[approver];

        emit ApproverRemoved(approver);
    }

    function isInactive() external view returns (bool) {
        return block.timestamp > lastPulse + inactivityPeriod;
    }

    function getRemainingTime() external view returns (uint256) {
        if (block.timestamp >= lastPulse + inactivityPeriod) {
            return 0;
        }
        return (lastPulse + inactivityPeriod - block.timestamp) / 1 days;
    }

    function initiateClaim(uint256 willId) external {
        require(block.timestamp <= lastPulse + inactivityPeriod, "Owner is still active");
        require(willRegistry.getWill(willId).status == WillRegistry.WillStatus.ACTIVE, "Will not active");
        require(claims[willId].createdAt == 0, "Claim already initiated");

        address sender = msg.sender;
        bool isNominee = nomineeManager.isNomineeAddress(sender);
        require(isNominee, "Not a nominee");

        uint256 approverCount = 0;
        for (uint256 i = 0; i < nomineeManager.nomineeCount(); i++) {
            NomineeManager.Nominee memory n = nomineeManager.getNominee(i);
            if (nomineeManager.isNomineeAddress(n.walletAddress)) {
                approverCount++;
            }
        }

        claims[willId] = Claim({
            willId: willId,
            initiatedBy: sender,
            status: ClaimStatus.PENDING,
            approvals: 0,
            requiredApprovals: requiredApprovals > approverCount ? approverCount : requiredApprovals,
            createdAt: block.timestamp,
            approvedAt: 0,
            executedAt: 0,
            rejectionReason: ""
        });

        emit ClaimInitiated(willId, sender, block.timestamp);
    }

    function approveClaim(uint256 willId) external {
        require(claims[willId].status == ClaimStatus.PENDING, "Claim not pending");
        require(isApprover[msg.sender], "Not an approver");
        require(!nomineeManager.isNomineeAddress(msg.sender), "Nominees cannot approve");

        Claim storage claim = claims[willId];
        claim.approvals++;

        emit ClaimApproved(willId, msg.sender, claim.approvals);

        if (claim.approvals >= claim.requiredApprovals) {
            claim.status = ClaimStatus.APPROVED;
            claim.approvedAt = block.timestamp;
        }
    }

    function rejectClaim(uint256 willId, string calldata reason) external {
        require(claims[willId].status == ClaimStatus.PENDING, "Claim not pending");
        require(isApprover[msg.sender], "Not an approver");

        claims[willId].status = ClaimStatus.REJECTED;
        claims[willId].rejectionReason = reason;

        emit ClaimRejected(willId, reason);
    }

    function cancelClaim(uint256 willId) external onlyOwner {
        require(
            claims[willId].status == ClaimStatus.PENDING,
            "Can only cancel pending claims"
        );

        claims[willId].status = ClaimStatus.CANCELLED;

        emit ClaimCancelled(willId, block.timestamp);
    }

    function executeClaim(uint256 willId) external nonReentrant {
        require(claims[willId].status == ClaimStatus.APPROVED, "Claim not approved");

        Claim storage claim = claims[willId];

        WillRegistry.WillAssetAllocation[] memory allocations = willRegistry.getWillAllocations(willId);

        for (uint256 i = 0; i < allocations.length; i++) {
            WillRegistry.WillAssetAllocation memory allocation = allocations[i];
            NomineeManager.Nominee memory nominee = nomineeManager.getNominee(allocation.nomineeId);

            AssetVault.Asset memory asset = assetVault.getAsset(allocation.assetId);

            uint256 transferAmount = (asset.amount * allocation.allocation) / 10000;

            if (transferAmount > 0) {
                assetVault.transferAsset(allocation.assetId, nominee.walletAddress);
                emit AssetTransferred(willId, allocation.assetId, nominee.walletAddress, transferAmount);
            }
        }

        claim.status = ClaimStatus.EXECUTED;
        claim.executedAt = block.timestamp;

        willRegistry.executeWill(willId);

        emit ClaimExecuted(willId, block.timestamp);
    }

    function getClaim(uint256 willId) external view returns (Claim memory) {
        return claims[willId];
    }

    function getApproverCount() external view returns (uint256) {
        return approvalCount[msg.sender];
    }

    receive() external payable {}
}

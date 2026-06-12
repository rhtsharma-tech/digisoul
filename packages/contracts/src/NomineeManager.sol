// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NomineeManager is Ownable {
    struct Nominee {
        uint256 id;
        address walletAddress;
        string name;
        string relationship;
        uint256 percentage;
        string contactInfo;
        bool active;
        uint256 addedAt;
    }

    uint256 public nomineeCount;
    uint256 public totalAllocated;
    mapping(uint256 => Nominee) public nominees;
    mapping(address => bool) public isNomineeAddress;

    constructor() Ownable(msg.sender) {}

    event NomineeAdded(
        uint256 indexed nomineeId,
        address indexed wallet,
        string name,
        uint256 percentage
    );
    event NomineeRemoved(uint256 indexed nomineeId, address indexed wallet);
    event PercentageUpdated(
        uint256 indexed nomineeId,
        uint256 oldPercentage,
        uint256 newPercentage
    );

    modifier onlyVaultOwner() {
        require(msg.sender == owner(), "Not vault owner");
        _;
    }

    function addNominee(
        address wallet,
        string calldata name,
        string calldata relationship,
        uint256 percentage,
        string calldata contactInfo
    ) external onlyVaultOwner returns (uint256) {
        require(wallet != address(0), "Invalid wallet address");
        require(wallet != msg.sender, "Cannot add self as nominee");
        require(!isNomineeAddress[wallet], "Nominee already exists");
        require(percentage > 0 && percentage <= 10000, "Invalid percentage");
        require(totalAllocated + percentage <= 10000, "Exceeds 100% allocation");

        uint256 nomineeId = nomineeCount++;
        nominees[nomineeId] = Nominee({
            id: nomineeId,
            walletAddress: wallet,
            name: name,
            relationship: relationship,
            percentage: percentage,
            contactInfo: contactInfo,
            active: true,
            addedAt: block.timestamp
        });

        isNomineeAddress[wallet] = true;
        totalAllocated += percentage;

        emit NomineeAdded(nomineeId, wallet, name, percentage);
        return nomineeId;
    }

    function removeNominee(uint256 nomineeId) external onlyVaultOwner {
        require(nominees[nomineeId].active, "Nominee not active");
        require(nominees[nomineeId].addedAt > 0, "Nominee does not exist");

        Nominee storage nominee = nominees[nomineeId];
        nominee.active = false;
        isNomineeAddress[nominee.walletAddress] = false;
        totalAllocated -= nominee.percentage;

        emit NomineeRemoved(nomineeId, nominee.walletAddress);
    }

    function updateNominee(
        uint256 nomineeId,
        string calldata name,
        string calldata relationship,
        uint256 percentage,
        string calldata contactInfo
    ) external onlyVaultOwner {
        require(nominees[nomineeId].active, "Nominee not active");
        require(percentage > 0 && percentage <= 10000, "Invalid percentage");

        Nominee storage nominee = nominees[nomineeId];
        uint256 oldPercentage = nominee.percentage;

        totalAllocated = totalAllocated - oldPercentage + percentage;
        require(totalAllocated <= 10000, "Exceeds 100% allocation");

        nominee.name = name;
        nominee.relationship = relationship;
        nominee.percentage = percentage;
        nominee.contactInfo = contactInfo;

        emit PercentageUpdated(nomineeId, oldPercentage, percentage);
    }

    function setPercentage(uint256 nomineeId, uint256 newPercentage) external onlyVaultOwner {
        require(nominees[nomineeId].active, "Nominee not active");
        require(newPercentage > 0 && newPercentage <= 10000, "Invalid percentage");

        Nominee storage nominee = nominees[nomineeId];
        uint256 oldPercentage = nominee.percentage;

        totalAllocated = totalAllocated - oldPercentage + newPercentage;
        require(totalAllocated <= 10000, "Exceeds 100% allocation");

        nominee.percentage = newPercentage;

        emit PercentageUpdated(nomineeId, oldPercentage, newPercentage);
    }

    function getNominee(uint256 nomineeId) external view returns (Nominee memory) {
        require(nominees[nomineeId].addedAt > 0, "Nominee does not exist");
        return nominees[nomineeId];
    }

    function getNominees() external view returns (Nominee[] memory) {
        Nominee[] memory result = new Nominee[](nomineeCount);
        for (uint256 i = 0; i < nomineeCount; i++) {
            result[i] = nominees[i];
        }
        return result;
    }

    function getActiveNominees() external view returns (Nominee[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < nomineeCount; i++) {
            if (nominees[i].active) activeCount++;
        }

        Nominee[] memory result = new Nominee[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < nomineeCount; i++) {
            if (nominees[i].active) {
                result[index++] = nominees[i];
            }
        }
        return result;
    }

    function getRemainingAllocation() external view returns (uint256) {
        return 10000 - totalAllocated;
    }
}

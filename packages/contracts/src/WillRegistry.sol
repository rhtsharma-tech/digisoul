// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WillRegistry is Ownable {
    enum WillStatus { DRAFT, ACTIVE, EXECUTED, REVOKED }

    struct Will {
        uint256 id;
        string title;
        string documentHash;
        string personalMessage;
        WillStatus status;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 executedAt;
    }

    struct WillAssetAllocation {
        uint256 willId;
        uint256 assetId;
        uint256 nomineeId;
        uint256 allocation;
    }

    struct MediaAttachment {
        uint256 id;
        uint256 willId;
        string ipfsHash;
        string mediaType;
        string description;
        uint256 uploadedAt;
    }

    uint256 public willCount;
    mapping(uint256 => Will) public wills;
    mapping(uint256 => WillAssetAllocation[]) private _willAllocations;
    mapping(uint256 => MediaAttachment[]) private _willMedia;
    mapping(uint256 => uint256) private _willTotalAllocation;

    address public inheritanceController;

    constructor() Ownable(msg.sender) {}

    event WillCreated(uint256 indexed willId, string title, address indexed owner);
    event WillUpdated(uint256 indexed willId, uint256 timestamp);
    event WillActivated(uint256 indexed willId, uint256 timestamp);
    event WillRevoked(uint256 indexed willId, uint256 timestamp);
    event WillDeleted(uint256 indexed willId, uint256 timestamp);
    event MediaAttached(uint256 indexed willId, uint256 mediaId, string mediaType);
    event MediaRemoved(uint256 indexed willId, uint256 mediaId);
    event AssetAllocated(
        uint256 indexed willId,
        uint256 assetId,
        uint256 nomineeId,
        uint256 allocation
    );
    event AssetAllocationRemoved(uint256 indexed willId, uint256 assetId, uint256 nomineeId);

    function setInheritanceController(address _controller) external onlyVaultOwner {
        inheritanceController = _controller;
    }

    modifier onlyVaultOwner() {
        require(msg.sender == owner(), "Not vault owner");
        _;
    }

    modifier onlyOwnerOrController() {
        require(msg.sender == owner() || msg.sender == inheritanceController, "Not authorized");
        _;
    }

    function createWill(
        string calldata title,
        string calldata documentHash,
        string calldata personalMessage
    ) external onlyVaultOwner returns (uint256) {
        require(bytes(title).length > 0, "Title required");

        uint256 willId = willCount++;
        wills[willId] = Will({
            id: willId,
            title: title,
            documentHash: documentHash,
            personalMessage: personalMessage,
            status: WillStatus.DRAFT,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            executedAt: 0
        });

        emit WillCreated(willId, title, msg.sender);
        return willId;
    }

    function updateWill(
        uint256 willId,
        string calldata title,
        string calldata documentHash,
        string calldata personalMessage
    ) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.DRAFT, "Can only edit draft wills");

        Will storage will = wills[willId];
        will.title = title;
        will.documentHash = documentHash;
        will.personalMessage = personalMessage;
        will.updatedAt = block.timestamp;

        emit WillUpdated(willId, block.timestamp);
    }

    function deleteWill(uint256 willId) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.DRAFT, "Can only delete draft wills");
        require(wills[willId].createdAt > 0, "Will does not exist");

        delete wills[willId];
        delete _willAllocations[willId];
        delete _willMedia[willId];

        emit WillDeleted(willId, block.timestamp);
    }

    function activateWill(uint256 willId) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.DRAFT, "Will must be draft");
        require(wills[willId].createdAt > 0, "Will does not exist");

        wills[willId].status = WillStatus.ACTIVE;
        wills[willId].updatedAt = block.timestamp;

        emit WillActivated(willId, block.timestamp);
    }

    function deactivateWill(uint256 willId) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.ACTIVE, "Will must be active");

        wills[willId].status = WillStatus.REVOKED;
        wills[willId].updatedAt = block.timestamp;

        emit WillRevoked(willId, block.timestamp);
    }

    function executeWill(uint256 willId) external onlyOwnerOrController {
        require(wills[willId].status == WillStatus.ACTIVE, "Will must be active");

        wills[willId].status = WillStatus.EXECUTED;
        wills[willId].executedAt = block.timestamp;
        wills[willId].updatedAt = block.timestamp;
    }

    function addPersonalMessage(uint256 willId, string calldata message) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.DRAFT, "Can only edit draft wills");

        wills[willId].personalMessage = message;
        wills[willId].updatedAt = block.timestamp;
    }

    function attachMedia(
        uint256 willId,
        string calldata ipfsHash,
        string calldata mediaType,
        string calldata description
    ) external onlyVaultOwner returns (uint256) {
        require(wills[willId].status == WillStatus.DRAFT, "Can only edit draft wills");

        uint256 mediaId = _willMedia[willId].length;
        _willMedia[willId].push(MediaAttachment({
            id: mediaId,
            willId: willId,
            ipfsHash: ipfsHash,
            mediaType: mediaType,
            description: description,
            uploadedAt: block.timestamp
        }));

        emit MediaAttached(willId, mediaId, mediaType);
        return mediaId;
    }

    function removeMedia(uint256 willId, uint256 mediaIndex) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.DRAFT, "Can only edit draft wills");
        require(mediaIndex < _willMedia[willId].length, "Invalid media index");

        _willMedia[willId][mediaIndex] = _willMedia[willId][_willMedia[willId].length - 1];
        _willMedia[willId].pop();

        emit MediaRemoved(willId, mediaIndex);
    }

    function allocateAsset(
        uint256 willId,
        uint256 assetId,
        uint256 nomineeId,
        uint256 allocation
    ) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.DRAFT, "Can only edit draft wills");
        require(allocation > 0 && allocation <= 10000, "Invalid allocation");

        _willAllocations[willId].push(WillAssetAllocation({
            willId: willId,
            assetId: assetId,
            nomineeId: nomineeId,
            allocation: allocation
        }));

        _willTotalAllocation[willId] += allocation;
        require(_willTotalAllocation[willId] <= 10000, "Exceeds 100% allocation");

        emit AssetAllocated(willId, assetId, nomineeId, allocation);
    }

    function removeAssetAllocation(
        uint256 willId,
        uint256 assetIndex
    ) external onlyVaultOwner {
        require(wills[willId].status == WillStatus.DRAFT, "Can only edit draft wills");
        require(assetIndex < _willAllocations[willId].length, "Invalid index");

        _willTotalAllocation[willId] -= _willAllocations[willId][assetIndex].allocation;
        _willAllocations[willId][assetIndex] = _willAllocations[willId][_willAllocations[willId].length - 1];
        _willAllocations[willId].pop();
    }

    function getWill(uint256 willId) external view returns (Will memory) {
        require(wills[willId].createdAt > 0, "Will does not exist");
        return wills[willId];
    }

    function getWills() external view returns (Will[] memory) {
        Will[] memory result = new Will[](willCount);
        for (uint256 i = 0; i < willCount; i++) {
            result[i] = wills[i];
        }
        return result;
    }

    function getActiveWills() external view returns (Will[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < willCount; i++) {
            if (wills[i].status == WillStatus.ACTIVE) activeCount++;
        }

        Will[] memory result = new Will[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < willCount; i++) {
            if (wills[i].status == WillStatus.ACTIVE) {
                result[index++] = wills[i];
            }
        }
        return result;
    }

    function getWillAllocations(uint256 willId) external view returns (WillAssetAllocation[] memory) {
        return _willAllocations[willId];
    }

    function getWillMedia(uint256 willId) external view returns (MediaAttachment[] memory) {
        return _willMedia[willId];
    }

    function getWillTotalAllocation(uint256 willId) external view returns (uint256) {
        return _willTotalAllocation[willId];
    }
}

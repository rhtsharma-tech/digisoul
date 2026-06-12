// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AssetVault is Ownable, ReentrancyGuard {
    enum AssetType { ERC20, ERC721, ERC1155, NATIVE, DOCUMENT }

    struct Asset {
        uint256 id;
        address tokenAddress;
        uint256 tokenId;
        uint256 amount;
        AssetType assetType;
        string name;
        string symbol;
        string metadataURI;
        bool active;
        uint256 registeredAt;
    }

    uint256 public assetCount;
    mapping(uint256 => Asset) public assets;

    constructor() Ownable(msg.sender) {}

    event AssetRegistered(
        uint256 indexed assetId,
        AssetType indexed assetType,
        string name,
        address indexed owner
    );
    event AssetRemoved(uint256 indexed assetId, address indexed owner);
    event AssetUpdated(uint256 indexed assetId, string name, string metadataURI);

    modifier onlyVaultOwner() {
        require(msg.sender == owner(), "Not vault owner");
        _;
    }

    function registerERC20(
        address tokenAddress,
        uint256 amount,
        string calldata name,
        string calldata symbol
    ) external onlyVaultOwner returns (uint256) {
        require(tokenAddress != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");

        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);

        uint256 assetId = assetCount++;
        assets[assetId] = Asset({
            id: assetId,
            tokenAddress: tokenAddress,
            tokenId: 0,
            amount: amount,
            assetType: AssetType.ERC20,
            name: name,
            symbol: symbol,
            metadataURI: "",
            active: true,
            registeredAt: block.timestamp
        });

        emit AssetRegistered(assetId, AssetType.ERC20, name, msg.sender);
        return assetId;
    }

    function registerERC721(
        address tokenAddress,
        uint256 tokenId,
        string calldata name,
        string calldata symbol
    ) external onlyVaultOwner returns (uint256) {
        require(tokenAddress != address(0), "Invalid token address");

        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenId);

        uint256 assetId = assetCount++;
        assets[assetId] = Asset({
            id: assetId,
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            amount: 1,
            assetType: AssetType.ERC721,
            name: name,
            symbol: symbol,
            metadataURI: "",
            active: true,
            registeredAt: block.timestamp
        });

        emit AssetRegistered(assetId, AssetType.ERC721, name, msg.sender);
        return assetId;
    }

    function registerERC1155(
        address tokenAddress,
        uint256 tokenId,
        uint256 amount,
        string calldata name,
        string calldata symbol
    ) external onlyVaultOwner returns (uint256) {
        require(tokenAddress != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");

        IERC1155(tokenAddress).safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        uint256 assetId = assetCount++;
        assets[assetId] = Asset({
            id: assetId,
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            amount: amount,
            assetType: AssetType.ERC1155,
            name: name,
            symbol: symbol,
            metadataURI: "",
            active: true,
            registeredAt: block.timestamp
        });

        emit AssetRegistered(assetId, AssetType.ERC1155, name, msg.sender);
        return assetId;
    }

    function registerNative(
        string calldata name
    ) external payable onlyVaultOwner returns (uint256) {
        require(msg.value > 0, "Must send ETH");

        uint256 assetId = assetCount++;
        assets[assetId] = Asset({
            id: assetId,
            tokenAddress: address(0),
            tokenId: 0,
            amount: msg.value,
            assetType: AssetType.NATIVE,
            name: name,
            symbol: "ETH",
            metadataURI: "",
            active: true,
            registeredAt: block.timestamp
        });

        emit AssetRegistered(assetId, AssetType.NATIVE, name, msg.sender);
        return assetId;
    }

    function registerDocument(
        string calldata name,
        string calldata metadataURI,
        uint256 size
    ) external onlyVaultOwner returns (uint256) {
        require(bytes(name).length > 0, "Name required");
        require(bytes(metadataURI).length > 0, "URI required");

        uint256 assetId = assetCount++;
        assets[assetId] = Asset({
            id: assetId,
            tokenAddress: address(0),
            tokenId: 0,
            amount: size,
            assetType: AssetType.DOCUMENT,
            name: name,
            symbol: "DOC",
            metadataURI: metadataURI,
            active: true,
            registeredAt: block.timestamp
        });

        emit AssetRegistered(assetId, AssetType.DOCUMENT, name, msg.sender);
        return assetId;
    }

    function removeAsset(uint256 assetId) external onlyVaultOwner {
        require(assets[assetId].active, "Asset not active");
        require(assets[assetId].registeredAt > 0, "Asset does not exist");

        assets[assetId].active = false;
        emit AssetRemoved(assetId, msg.sender);
    }

    function getAsset(uint256 assetId) external view returns (Asset memory) {
        require(assets[assetId].registeredAt > 0, "Asset does not exist");
        return assets[assetId];
    }

    function getAssets(uint256 startIndex, uint256 count) external view returns (Asset[] memory) {
        uint256 total = assetCount;
        uint256 endIndex = startIndex + count > total ? total : startIndex + count;
        uint256 size = endIndex > startIndex ? endIndex - startIndex : 0;

        Asset[] memory result = new Asset[](size);
        for (uint256 i = 0; i < size; i++) {
            result[i] = assets[startIndex + i];
        }
        return result;
    }

    function getActiveAssets() external view returns (Asset[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].active) activeCount++;
        }

        Asset[] memory result = new Asset[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].active) {
                result[index++] = assets[i];
            }
        }
        return result;
    }

    function transferAsset(uint256 assetId, address to) external onlyVaultOwner nonReentrant {
        require(assets[assetId].active, "Asset not active");
        require(to != address(0), "Invalid recipient");

        Asset memory asset = assets[assetId];

        if (asset.assetType == AssetType.NATIVE) {
            (bool success, ) = to.call{value: asset.amount}("");
            require(success, "ETH transfer failed");
        } else if (asset.assetType == AssetType.ERC20) {
            IERC20(asset.tokenAddress).transfer(to, asset.amount);
        } else if (asset.assetType == AssetType.ERC721) {
            IERC721(asset.tokenAddress).transferFrom(address(this), to, asset.tokenId);
        } else if (asset.assetType == AssetType.ERC1155) {
            IERC1155(asset.tokenAddress).safeTransferFrom(address(this), to, asset.tokenId, asset.amount, "");
        }

        assets[assetId].active = false;
    }

    receive() external payable {}
}

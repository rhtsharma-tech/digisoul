// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AssetVault.sol";
import "./NomineeManager.sol";
import "./WillRegistry.sol";
import "./InheritanceController.sol";

contract DigiSoulFactory is Ownable {
    struct UserVault {
        address vaultAddress;
        address assetVault;
        address nomineeManager;
        address willRegistry;
        address inheritanceController;
        uint256 createdAt;
    }

    uint256 public vaultCount;
    mapping(address => UserVault) public userVaults;
    mapping(address => bool) public hasVault;

    event VaultCreated(
        address indexed user,
        address indexed vaultAddress,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {}

    function createVault() external returns (address vaultAddress) {
        require(!hasVault[msg.sender], "Vault already exists");

        AssetVault assetVault = new AssetVault();
        NomineeManager nomineeManager = new NomineeManager();
        WillRegistry willRegistry = new WillRegistry();
        InheritanceController inheritanceController = new InheritanceController(
            payable(address(assetVault)),
            address(nomineeManager),
            address(willRegistry)
        );

        willRegistry.setInheritanceController(address(inheritanceController));

        assetVault.transferOwnership(msg.sender);
        nomineeManager.transferOwnership(msg.sender);
        willRegistry.transferOwnership(msg.sender);

        userVaults[msg.sender] = UserVault({
            vaultAddress: address(inheritanceController),
            assetVault: address(assetVault),
            nomineeManager: address(nomineeManager),
            willRegistry: address(willRegistry),
            inheritanceController: address(inheritanceController),
            createdAt: block.timestamp
        });

        hasVault[msg.sender] = true;
        vaultCount++;

        emit VaultCreated(msg.sender, address(inheritanceController), block.timestamp);
        return address(inheritanceController);
    }

    function getUserVault(address user) external view returns (UserVault memory) {
        require(hasVault[user], "No vault found");
        return userVaults[user];
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DigiSoulFactory.sol";
import "../src/AssetVault.sol";
import "../src/NomineeManager.sol";
import "../src/WillRegistry.sol";
import "../src/InheritanceController.sol";

contract DigiSoulFactoryTest is Test {
    DigiSoulFactory public factory;
    address public user = makeAddr("user");

    function setUp() public {
        factory = new DigiSoulFactory();
    }

    function test_CreateVault() public {
        vm.prank(user);
        address vault = factory.createVault();

        assertTrue(factory.hasVault(user), "User should have a vault");
        assertEq(factory.vaultCount(), 1, "Vault count should be 1");

        DigiSoulFactory.UserVault memory uv = factory.getUserVault(user);
        assertEq(uv.vaultAddress, vault, "Vault address should match");
        assertTrue(uv.assetVault != address(0), "Asset vault should be set");
        assertTrue(uv.nomineeManager != address(0), "Nominee manager should be set");
        assertTrue(uv.willRegistry != address(0), "Will registry should be set");
        assertTrue(uv.inheritanceController != address(0), "Inheritance controller should be set");
    }

    function test_RevertIfVaultAlreadyExists() public {
        vm.prank(user);
        factory.createVault();

        vm.prank(user);
        vm.expectRevert("Vault already exists");
        factory.createVault();
    }

    function test_GetUserVaultRevertIfNoVault() public {
        vm.expectRevert("No vault found");
        factory.getUserVault(user);
    }

    function test_MultipleUsersCanCreateVaults() public {
        address user2 = makeAddr("user2");

        vm.prank(user);
        factory.createVault();

        vm.prank(user2);
        factory.createVault();

        assertEq(factory.vaultCount(), 2, "Vault count should be 2");
        assertTrue(factory.hasVault(user), "User 1 should have a vault");
        assertTrue(factory.hasVault(user2), "User 2 should have a vault");
    }
}

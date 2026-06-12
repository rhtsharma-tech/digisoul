// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/DigiSoulFactory.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        DigiSoulFactory factory = new DigiSoulFactory();

        vm.stopBroadcast();

        console.log("DigiSoulFactory deployed to:", address(factory));
        console.log("Deployer:", vm.addr(deployerPrivateKey));
    }
}

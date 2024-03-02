// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract Dappchat is ERC721 {
    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol) {}
}
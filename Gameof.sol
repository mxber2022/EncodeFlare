// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract Gameof {
    RandomNumberV2Interface internal randomV2;

    /**
     * Initializing an instance with RandomNumberV2Interface.
     * The contract registry is used to fetch the contract address.
     */
    constructor() {
        randomV2 = ContractRegistry.getRandomNumberV2();
    }

    event WinnerSelected(string[] names, string winner, address indexed picker, uint256 timestamp);

    /**
     * Fetch the latest secure random number.
     * The random number is generated every 90 seconds.
     */
    function getSecureRandomNumber()
        public
        view
        returns (uint256 randomNumber, bool isSecure, uint256 timestamp)
    {
        (randomNumber, isSecure, timestamp) = randomV2.getRandomNumber();
        /* DO NOT USE THE RANDOM NUMBER IF isSecure=false. */
        require(isSecure, "Random number is not secure");
        return (randomNumber, isSecure, timestamp);
    }

    /**
     * Fetch the secure random number and map it into a custom [min, max] range.
     * Example: min = 10, max = 50 => random number will be between 10 and 50 (inclusive).
     */
    function getRandomInRange(uint256 min, uint256 max)
        external
        view
        returns (uint256 randomInRange)
    {
        require(max > min, "Invalid range");

        (uint256 randomNumber, bool isSecure, ) = randomV2.getRandomNumber();
        require(isSecure, "Random number is not secure");

        randomInRange = (randomNumber % (max - min + 1)) + min;
    }

    function pickRandomWinner(string[] calldata names)
        external
        returns (string memory)
    {
        require(names.length > 0, "Names list is empty");

        (uint256 randomNumber, bool isSecure, uint256 timestamp) = randomV2.getRandomNumber();
        require(isSecure, "Random number is not secure");

        uint256 randomIndex = randomNumber % names.length;
        string memory winner = names[randomIndex];

        emit WinnerSelected(names, winner, msg.sender, timestamp);

        return winner;
    }


}

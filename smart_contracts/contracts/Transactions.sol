// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This is an example of a 'smart contract'
// contract serves purpose of a class
contract Transactions {
    uint256 transactionCount;

    // function that we will emit (or call) later on
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;

        // msg.sender comes into the function by default
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        
        // so this line actually transfers the amount
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) { // 'memory' means get it from memory
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}

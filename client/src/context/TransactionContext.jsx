import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants.js";

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);

	return transactionContract;
};

export const TransactionProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("");
	const [formData, setFormData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [transactionCount, setTransactionCount] = useState(
		window.localStorage.getItem("transactionCount")
	);
	const [transactions, setTransactions] = useState([]);

	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const checkIfTransactionsExist = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask!");

			const transactionContract = getEthereumContract();
			const transactionCount =
				await transactionContract.getTransactionCount();

			window.localStorage.setItem(
				"transactionCount",
				transactionCount.toNumber()
			);
		} catch (error) {
			console.log(error);
		}
	};

	const getAllTransactions = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask!");

			const transactionContract = getEthereumContract();
			const transactions = await transactionContract.getAllTransactions();

			const structuredTransactions = transactions.map((transaction) => {
				return {
					addressTo: transaction.addressTo,
					addressFrom: transaction.addressFrom,
					amount: parseInt(transaction.amount._hex) / 10 ** 18,
					message: transaction.message,
					keyword: transaction.keyword,
					timestamp: new Date(
						transaction.timestamp.toNumber() * 1000
					).toLocaleString(),
				};
			});
			console.log("all transactions:", structuredTransactions);
			setTransactions(structuredTransactions);
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask!");
			const accounts = await ethereum.request({ method: "eth_accounts" });

			if (accounts.length) {
				setCurrentAccount(accounts[0]);

				// getAllTransactions();
			} else {
				console.log("No accounts connected!");
			}

			console.log("accounts:", accounts);
		} catch (error) {
			console.log(error);
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask!");

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask!");

			const { addressTo, amount, keyword, message } = formData;
			const parsedAmount = ethers.utils.parseEther(amount); // converts decimal to wei
			const parsedAmountHex = parsedAmount._hex;

			// now we can call the methods from our contract
			const transactionContract = getEthereumContract();

			// This line actually sends the transaction. The transfer is complete after this, but has not been added to OUR blockchain yet.
			await ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						to: addressTo,
						from: currentAccount,
						gas: "0x5280", // 21000 GWEI
						value: parsedAmountHex,
					},
				],
			});

			// so what is happening down here??
			// I guess this code puts our smart contract out there in the blockchain
			const transactionHash = await transactionContract.addToBlockChain(
				addressTo,
				parsedAmount,
				message,
				keyword
			);
			setIsLoading(true);
			console.log("waiting for transactionHash:", transactionHash);

			await transactionHash.wait(); // wait for transaction to finish
			setIsLoading(false);
			console.log("Transaction successful!: ", transactionHash);

			const transactionCount =
				await transactionContract.getTransactionCount();
			setTransactionCount(transactionCount.toNumber());

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
		getEthereumContract();
	}, []);

	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				currentAccount,
				formData,
				handleChange,
				sendTransaction,
				transactions,
				isLoading,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};

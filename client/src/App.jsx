import { useContext } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { TransactionContext } from "./context/TransactionContext";

function App() {
	const {
		connectWallet,
		currentAccount,
		formData,
		handleChange,
		sendTransaction,
		transactions,
		transactionCount,
		isLoading,
	} = useContext(TransactionContext);

	const handleSubmit = (e) => {
		const { addressTo, amount, keyword, message } = formData;

		e.preventDefault();

		if (!addressTo || !amount || !keyword || !message) {
			return alert("Please fill in all fields");
		}

		sendTransaction();
	};

	return (
		<>
			<h1>Vite x Blockchain</h1>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<div className="card">
				{!currentAccount && (
					<button onClick={connectWallet}>Connect wallet</button>
				)}
			</div>
			<div>
				<div>
					<input
						type="text"
						name="addressTo"
						value={formData.addressTo}
						onChange={(e) => handleChange(e, "addressTo")}
						placeholder="Address To"
					/>
					<input
						type="number"
						name="amount"
						value={formData.amount}
						onChange={(e) => handleChange(e, "amount")}
						placeholder="Amount"
					/>
					<input
						type="text"
						name="keyword"
						value={formData.keyword}
						onChange={(e) => handleChange(e, "keyword")}
						placeholder="Keyword"
					/>
					<input
						type="text"
						name="message"
						value={formData.message}
						onChange={(e) => handleChange(e, "message")}
						placeholder="Message"
					/>
				</div>
				{isLoading ? (
					<button disabled>Loading...</button>
				) : (
					<button onClick={handleSubmit}>Send Transaction</button>
				)}
			</div>
			<div>
				<h2>Transaction History</h2>
				<p>Total transactions: {transactionCount}</p>
				{transactions.reverse().map((transaction, index) => (
					<div key={index} style={{ border: "1px solid black" }}>
						<p>Sender: {transaction.addressFrom}</p>
						<p>Receiver: {transaction.addressTo}</p>
						<p>Amount: {transaction.amount} ETH</p>
						<p>Keyword: {transaction.keyword}</p>
						<p>Message: {transaction.message}</p>
						<p>Timestamp: {transaction.timestamp}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;

const main = async () => {
	const Transactions = await hre.ethers.getContractFactory("Transactions"); // generate instances of our contract
	const transactionsContract = await Transactions.deploy();

	console.log("Contract deployed to address: ", transactionsContract.address);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();

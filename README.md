# Blockchain project

### Steps
1. Install the Metamask browser extension and create an account (will need the private key for deployment)
2. Load some test ethereum (I used sepolia) from a faucet into that Metamask account.
3. Create an account and app on [alchemy.com](https://www.alchemy.com/). This is how we will connect to the Ethereum network without having to set up our own node.
4. Write the smart contract and deploy it to the network using the following command
```shell
npx hardhat run scripts/deploy.js --network sepolia
```
5. Take note of the address the smart contract was deployed to and verify its successful deployment [here](https://sepolia.etherscan.io/)
6. Copy over the `Transactions.json` file from the deployment to the client code. This the Application Binary Interface (ABI) and defines how the client will talk to the deployed smart contract
7. Write client code and call the functions defined in the smart contract

**Final thoughts:** Based on my understanding, the blockchain is simply a database that is not owned by one authority but rather a collection of authorities. 

### Reference
I followed [this awesome YouTube tutorial](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&t) as a starting point. I had a lot of trouble setting the project up initially due to some npm package version inconsistencies.

Other Links: \
[Smart contract hello world example](https://docs.alchemy.com/docs/hello-world-smart-contract) \
[Smart contracts explained by AWS](https://aws.amazon.com/blockchain/what-is-ethereum/)

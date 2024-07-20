require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const { API_URL, METAMASK_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [METAMASK_PRIVATE_KEY],
    }
  }
};

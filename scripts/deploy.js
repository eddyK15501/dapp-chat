// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString());
};

async function main() {
  // Deployment Variables
  const NAME = 'dAppchat';
  const SYMBOL = 'CHAT';

  // Signers
  const signer = await ethers.getSigners();

  // Deploy contract
  const DappchatFactory = await ethers.getContractFactory('Dappchat');
  dappchat = await DappchatFactory.deploy(NAME, SYMBOL);
  await dappchat.deployed();

  console.log(`Dappchat Contract deployed at: ${dappchat.address}`);

  // Channel names/cost to mint
  const CHANNEL_NAMES = ['about', 'questions', 'jobs'];
  const COSTS = [tokens(0.5), tokens(0), tokens(1)];

  // Create 3 Channels
  for (let i = 0; i < 3; i++) {
    const transaction = await dappchat.connect(signer[0]).createChannel(CHANNEL_NAMES[i], COSTS[i]);
    await transaction.wait();

    console.log(`Channels Created: #${CHANNEL_NAMES[i]}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

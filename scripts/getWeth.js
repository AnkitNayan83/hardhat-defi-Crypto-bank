const { getNamedAccounts, ethers } = require("hardhat");
const AMOUNT = ethers.utils.parseEther("0.02");
async function getWeth() {
  const { deployer } = await getNamedAccounts();
  // call the deposite function on the weth contract
  // For that we need abi,contract address (mainnet)
  // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
  const iWeth = await ethers.getContractAt(
    "IWeth",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    deployer
  );
  const tx = await iWeth.deposit({ value: AMOUNT });
  await tx.wait(1);
  const wetBalance = await iWeth.balanceOf(deployer);
  console.log(`Got ${wetBalance.toString()} WETH`);
}

module.exports = { getWeth, AMOUNT };

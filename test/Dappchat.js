const { expect } = require('chai');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString());
};

describe('Dappchat', () => {
  // Contract
  let dappchat;

  // Signers
  let signer;

  // ERC-721 name/symbol
  const NAME = 'dAppchat';
  const SYMBOL = 'CHAT';

  beforeEach(async () => {
    signer = await ethers.getSigners();

    const DappchatFactory = await ethers.getContractFactory('Dappchat');
    dappchat = await DappchatFactory.deploy(NAME, SYMBOL);
    await dappchat.deployed();

    const transaction = await dappchat
      .connect(signer[0])
      .createChannel('general', tokens(1));
    await transaction.wait();
  });

  describe('Deployment', () => {
    it('Set name of ERC-721', async () => {
      expect(await dappchat.name()).to.be.equal('dAppchat');
    });

    it('Set ticker of ERC-721', async () => {
      expect(await dappchat.symbol()).to.be.equal('CHAT');
    });

    it('Msg.sender is the owner', async () => {
      expect(await dappchat.owner()).to.be.equal(signer[0].address);
    });
  });

  describe('Creating Channels', () => {
    it('Returns total number of channels', async () => {
      const total = await dappchat.channelIndex();
      expect(total).to.equal(1);
    });

    it('Get the channel attributes', async () => {
      const result = await dappchat.getChannel(1);
      expect(result.id).to.equal(1);
      expect(result.name).to.equal('general');
      expect(result.cost).to.equal(tokens(1));
    });
  });

  describe('Join Channels', () => {
    const ID = 1;
    const AMOUNT = ethers.utils.parseUnits('1', 'ether');

    beforeEach(async () => {
      const transaction = await dappchat.connect(signer[1]).mint(ID, { value: AMOUNT });
      await transaction.wait();
    });

    it('Join a user', async () => {
      const result = await dappchat.hasJoined(ID, signer[1].address);
      expect(result).to.eq(true);
    });

    it('Increases total supply', async () => {
      const result = await dappchat.totalSupply();
      expect(result).to.eq(1);
    });

    it('Updates contract balance', async () => {
      const result = await ethers.provider.getBalance(dappchat.address);
      expect(result).to.eq(AMOUNT);
    });
  });

  describe('Withdraw funds as owner', () => {
    const ID = 1;
    const AMOUNT = ethers.utils.parseUnits('10', 'ether');
    
    let balanceBefore;

    beforeEach(async () => {
      // Get balance before the withdrawal
      balanceBefore = await ethers.provider.getBalance(signer[0].address);

      // Mint as signer[1] - Smart contract receives payment
      let transaction = await dappchat.connect(signer[1]).mint(ID, { value: AMOUNT });
      await transaction.wait();

      // Withdraw as signer[0] - Owner of the contract
      transaction = await dappchat.connect(signer[0]).withdraw();
      await transaction.wait();
    });

    it('Updates the balance of the owner', async () => {
      // Get balance after the withdrawal
      const balanceAfter = await ethers.provider.getBalance(signer[0].address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it('Updates the balance of the contract', async () => {
      // Empty contract balance after withdrawal from owner
      const contractBalance = await ethers.provider.getBalance(dappchat.address);
      expect(contractBalance).to.eq(0);
    });
  });
});

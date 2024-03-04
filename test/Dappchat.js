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
      const total = await dappchat.index();
      expect(total).to.equal(1);
    })
  });
});

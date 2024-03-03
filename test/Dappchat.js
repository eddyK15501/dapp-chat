const { expect } = require('chai');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString());
};

describe('Dappchat', () => {
  // Contract
  let dappchat;

  // ERC-721 name/symbol
  const NAME = 'dAppchat';
  const SYMBOL = 'CHAT';

  beforeEach(async () => {
    const DappchatFactory = await ethers.getContractFactory('Dappchat');
    dappchat = await DappchatFactory.deploy(NAME, SYMBOL);
    await dappchat.deployed();
  });

  describe('Deployment', () => {
    it('Set name of ERC-721', async () => {
      expect(await dappchat.name()).to.be.equal('dAppchat');
    });

    it('Set ticker of ERC-721', async () => {
      expect(await dappchat.symbol()).to.be.equal('CHAT');
    });
  });
});

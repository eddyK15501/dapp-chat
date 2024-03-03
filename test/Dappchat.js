const { expect } = require('chai');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString());
};

describe('Dappchat', () => {
  let dappchat;

  beforeEach(async () => {
    const DappchatFactory = await ethers.getContractFactory('Dappchat');
    dappchat = await DappchatFactory.deploy('dAppchat', 'CHAT');
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

const { expect } = require('chai');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString());
}

describe('Dappchat', () => {
    describe('Deployment', () => {
        it('Set name of ERC-721', async () => {
            const DappchatFactory = await ethers.getContractFactory('Dappchat');
            const dappchat = await DappchatFactory.deploy('dAppchat', 'CHAT');
            await dappchat.deployed();

            expect(await dappchat.name()).to.be.equal('dAppchat');
        })

        it('Set ticker of ERC-721', async () => {
            const DappchatFactory = await ethers.getContractFactory('Dappchat');
            const dappchat = await DappchatFactory.deploy('dAppchat', 'CHAT');
            await dappchat.deployed();

            expect( await dappchat.symbol()).to.be.equal('CHAT');
        })
    })
})
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const compiledcampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas : '1000000'})
    
        //send because we are modifying
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });
    
    //.call because, func is view func
    [campaignAddress] =  await factory.methods.getDeployedCampaigns().call();
    // above is first method, ES6=> [obj] is saying that it is receiving array of obj and thus take its first obj, which we want as our first and only address of receipt of campaign instance
    // or 1) const address = await fa... 2)campaignAddress = address[0];
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledcampaign.interface),
        campaignAddress
    )
});

describe('Campaigns', () => {
    it('deploys', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('caller', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0],manager);
    });

    it('allows people to contribute and make them approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1] // account #2 of 10
        })

 
    const isContributor = campaign.methods.approvers(accounts[1]).call();
    assert(isContributor)

    });

    it('req a min contri', async () => {
        try{
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    })

    it('it allows a payment req', async () => {
        await campaign.methods
        .createRequest('Buy Batteries', '100', accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy Batteries',request.description)

    });

    it('processes requests', async() => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10','ether')
        });

        await campaign.methods.createRequest('REQ',100,accounts[1])
            .send({
                from:accounts[0],
                gas: '1000000'
            });

       // const request = await campaign.methods.requests(0).call();
        await campaign.methods.approveRequest(0)
        .send({
            from: accounts[0],
            gas: '1000000'
        }); 
        
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        }); 

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 99);

    });

});


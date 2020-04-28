const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
// earlier const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json');

let message_obj = 'Hi there!';

const provider = new HDWalletProvider(
    'adjust usual furnace era dish stick leg govern give volcano near diet',
    'https://rinkeby.infura.io/v3/3a515ae306e74eac8f16be9aab5c8711'
    );
    const web3 = new Web3(provider);

    const deploy = async()=>{
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to deploy from accounts',accounts[0])
    
    const result =  await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
            .deploy({ data :'0x' +  compiledFactory.bytecode})
            .send({ from : accounts[0]});

        console.log('Contract Deployed to this Address: ',result.options.address);
        
    }
    deploy(); 
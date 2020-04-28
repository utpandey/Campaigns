import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x531c0F0d14922E64FAdeD7aB16e71360Ad7DF39E');

    
export default instance;

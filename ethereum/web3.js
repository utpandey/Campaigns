import Web3 from 'web3';

//earlier which gave window not defined error- const web3 = new Web3(window.web3.currentProvider);
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //Browser & metamsak is running
    web3 = new Web3 (window.web3.currentProvider);

} else {
    // server or not metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/3a515ae306e74eac8f16be9aab5c8711'           
    );

    web3 = new Web3(provider);

}


export default web3;
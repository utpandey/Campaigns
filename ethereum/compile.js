const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const campainPath = path.resolve(__dirname,'contracts','campaign.sol');
const source = fs.readFileSync(campainPath,'utf8')
//console.log(solc.compile(source,1));
const output = solc.compile(source,1).contracts;
//console.log(output);
fs.ensureDirSync(buildPath);//checks dir exits
console.log(output);
for (let contract in output) {
    fs.outputJSONSync(   
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}
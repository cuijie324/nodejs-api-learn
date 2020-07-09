const fs = require('fs');
const forge = require('node-forge');

let pem = fs.readFileSync(__dirname + '/ca.cer');

let key = forge.pki.publicKeyFromPem(pem.toString());
console.log(key);

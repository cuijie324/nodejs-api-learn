const tls = require('tls');
const fs = require('fs');
const certpem = require('certpem');

// let test = {
//     host: 'a.com', cert: {
//         subjectaltname: 'DNS:a.com',
//         subject: { CN: 'b.com' }
//     }
// }

// let result = tls.checkServerIdentity(test.host, test.cert);
// console.log(result);

let cert = fs.readFileSync(__dirname + '/server.pem');
console.log(certpem.debug(cert.toString('ascii')));
// let result = tls.checkServerIdentity('112.74.187.5', cert);
// console.log(result);

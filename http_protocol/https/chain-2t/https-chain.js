const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./private.pem'),//私钥
    // cert: [fs.readFileSync('./ca1.pem'), fs.readFileSync('./ca2.pem'), fs.readFileSync('./e1.pem')],//证书
    // cert: [fs.readFileSync('./ca.pem'), fs.readFileSync('./ca1.pem')],
    cert: [fs.readFileSync('./ca2.pem')],
    passphrase: 'test1234' //私钥密码
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);

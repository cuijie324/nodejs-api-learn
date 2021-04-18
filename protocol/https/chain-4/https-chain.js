const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./server.key'),//私钥
    // cert: [fs.readFileSync('./ca1.pem'), fs.readFileSync('./ca2.pem')],
    cert: [fs.readFileSync('./ca.pem'), fs.readFileSync('./client.pem')],//证书链文件
    // ca: [fs.readFileSync('./ca.pem')],//证书链文件
    // pfx: fs.readFileSync('./client.p12'),
    passphrase: 'cha123' //私钥密码
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);

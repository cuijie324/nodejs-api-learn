const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./ca-key.pem'),//私钥
    cert: fs.readFileSync('./ca-cert.pem'),//证书
    passphrase: 'test1234' //私钥密码
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);

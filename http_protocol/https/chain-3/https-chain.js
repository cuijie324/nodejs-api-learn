const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./private.pem'),//私钥
    cert: [fs.readFileSync('./ca1.pem'), fs.readFileSync('./ca2.pem')],
    // cert: [fs.readFileSync('./ca2.cer')]//证书链文件
    // passphrase: 'test1234' //私钥密码
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);

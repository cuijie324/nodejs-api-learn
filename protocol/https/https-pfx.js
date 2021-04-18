const https = require('https');
const fs = require('fs');

const options = {
    pfx: fs.readFileSync('./ca.pfx'),
    passphrase: 'test1234' //私钥密码
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);
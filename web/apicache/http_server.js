const http = require('http');

http.createServer((req, res) => {
    console.log('>>>>>>>>>>>>>>>>>>', req.url, res.headers);
    console.log('1<<<<<<<<<<<<<<<<<<', res._headers);
    let writeHead = res.writeHead;
    res.writeHead = function () {
        console.log('2<<<<<<<<<<<<<<<<<<', res._headers, res.headers);
        writeHead.apply(res, arguments);
    }
    res.writeHead(200, { 'Platform': 'Node.js' });
    res.write('Hello world');
    res.end('end');
}).listen(1337);
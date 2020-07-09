const http = require('http');
// const onHeaders = require('on-headers');
const onHeaders = require('./index');

http.createServer(onRequest).listen(3000);

function onRequest(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    onHeaders(res, addPoweredBy);
    res.writeHead(201, 'not found hahah');
    res.writeHead(201, 'not found hahah');
    res.end('hello!')
}

function addPoweredBy() {
    console.log('addPoweredBy');
    if (!this.getHeader('X-Powered-By')) {
        this.setHeader('X-Powered-By', 'Node.js')
    } else {
        this.setHeader('X-Powered-By2', 'Node.js')
    }
}

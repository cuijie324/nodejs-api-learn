const zlib = require('zlib');
const http = require('http');
const httpProxy = require('http-proxy');
const modifyResponse = require('node-http-proxy-json');

//代理，转发请求给目标服务器
let proxy = httpProxy.createProxyServer({
    target: 'http://localhost:5001'
});

//代理服务器响应事件，修改返回的数据
proxy.on('proxyRes', function (proxyRes, req, res) {
    modifyResponse(res, proxyRes, function (body) {
        if (body) {
            body.age = 2;
            delete body.version;
        }
        return body;
    });
});

//代理服务器
let server = http.createServer(function (req, res) {
    proxy.web(req, res);
}).listen(5000);

//目标服务器
let targetServer = http.createServer(function (req, res) {
    let gzip = zlib.createGzip();
    let _write = res.write;
    let _end = res.end;

    gzip.on('data', function (buf) {
        _write.call(res, buf);
    });

    gzip.on('end', function () {
        _end.call(res);
    });

    res.write = function (data) {
        gzip.write(data);
    }

    res.end = function () {
        gzip.end();
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip'
    });

    res.write(JSON.stringify({
        name: 'node-http-proxy-json',
        age: 1,
        version: '1.0.0'
    }));
    res.end();
}).listen(5001);
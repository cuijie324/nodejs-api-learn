var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

//修改请求
proxy.on('proxyReq', function (proxyReq, req, res, options) {
    console.log('>>>>>>');
    // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    proxyReq.setHeader('Host', 'app.chatu.com');
    proxyReq.setHeader('Origin', 'http://app.chatu.com');
});

var server = http.createServer(function (req, res) {
    proxy.web(req, res, {
        target: 'http://app.chatu.com'
    });
});

console.log("listening on port 5050")
server.listen(5050);
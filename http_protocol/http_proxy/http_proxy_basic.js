const http = require('http');
const httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer({});

//修改请求头部
proxy.on('proxyReq', function (proxyReq, req, res, options) {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36')
});

//响应
proxy.on('proxyRes', function (proxyRes, req, res) {
    // console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
    // console.log(Object.getOwnPropertyNames(proxyRes));
});

http.createServer(function (req, res) {
    proxy.web(req, res, {
        target: 'https://cn.bing.com/',
        changeOrigin: true,
        autoRewrite: true,
        hostRewrite: true,
        secure: false
    });
}).listen(3000, () => {
    console.log('http server started on port 3000');
});
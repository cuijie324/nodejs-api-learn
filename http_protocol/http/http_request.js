const http = require('http');
const net = require('net');
const url = require('url');

//Create an HTTP tunneling proxy 隧道代理服务器
const proxy = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('okay');
});

proxy.on('connect', (req, cltSocket, head) => {
    // connect to an origin server
    const srvUrl = url.parse(`http://${req.url}`);//解析出真正要访问的服务器
    const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
        cltSocket.write('Http/1.1 200 Connection Established\r\n' +
            'Proxy-agent: Node.js-Proxy\r\n' +
            '\r\n');
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
    });
});

proxy.listen(1337, '127.0.0.1', () => {

    // make a request to a tunneling proxy 向隧道代理发送请求
    const options = {
        port: 1337,
        hostname: '127.0.0.1',
        method: 'CONNECT',
        path: 'www.bing.com:80'
    };

    const req = http.request(options);
    req.end();

    req.on('connect', (res, socket, head) => {
        console.log('got connected');

        // make a request over an HTTP tunnel
        socket.write('GET / HTTP/1.1\r\n' +
            'Host: wwww.bing.com:443\r\n' +
            'Connection: close\r\n' +
            '\r\n');

        socket.on('data', (chunk) => {
            console.log(chunk.toString());
        });

        socket.on('end', () => {
            proxy.close();
        })
    });
});
const net = require('net');

// const server = net.createServer((socket) => {
//     socket.end('goodby\n');
// }).on('error', (err) => {
//     throw err;
// });

// server.listen(() => {
//     console.log('opened server on', server.address());
// });

//创建服务器
const server = net.createServer((c) => {
    console.log('>>client connected');
    server.getConnections(console.log);

    // c.setKeepAlive(true, 100);

    c.on('end', () => {
        console.log('>>client disconnected');
    });
    c.write('hello\r\n');
    c.pipe(c);
});

server.on('error', (err) => {
    throw err;
});

//创建TCP服务器，测试命令： telnet localhost 8124
server.listen(8124, () => {
    console.log('>>server bound', server.address());
});

// //创建IPC服务器，测试命令：nc -U /tmp/echo.sock
// server.listen('/tmp/echo.sock', () => {
//     console.log('server bound', server.address());
// });

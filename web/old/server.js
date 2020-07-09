const net = require('net');

//创建服务器
const server = net.createServer({ pauseOnConnect: true }, (c) => {
    console.log('client connected');
    c.on('end', () => {
        console.log('client disconnected');
    });

    c.write('hello\r\n');
    c.pipe(c);
});

server.on('error', (err) => {
    throw err;
});

//创建TCP服务器，测试命令： telnet localhost 8124
server.listen(8124, () => {
    console.log('server bound', server.address());
});

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const multicastAddr = '224.100.100.100';

server.on('close', () => {
    console.log('socket已关闭');
});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('server socket正在监听中...');
    console.log(server.address());
    server.setMulticastInterface('192.168.18.189');
    // server.setMulticastLoopback(false);
    
    server.addMembership(multicastAddr);
    server.setMulticastTTL(128);

    setInterval(() => {
        sendMsg();
    }, 1500);
});

server.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
});

function sendMsg () {
    server.send('大家好啊，我是服务端.', 8061, multicastAddr);
}

server.bind('8060', '192.168.18.189');
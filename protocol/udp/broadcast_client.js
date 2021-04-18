const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.on('close', () => {
    console.log('socket已关闭');
});

client.on('error', (err) => {
    console.log(err);
});
client.on('listening', () => {
    console.log('socket正在监听中...');
    console.log(client.address());
});

client.on('message', (msg, rinfo) => {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
});
client.bind(8061, '192.168.18.189');

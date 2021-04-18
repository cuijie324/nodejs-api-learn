const net = require('net');

let socket = new net.Socket();
socket.connect(8124, (event) => {
    console.log('>>connected', event);
    console.log('connecting', socket.connecting);
    console.log(socket.address());
    console.log('local', socket.localAddress, socket.localPort);
    console.log('remote', socket.remoteAddress, socket.remotePort, socket.remoteFamily);
});

socket.setEncoding('ascii');
socket.setTimeout(2000, () => console.log('its timeout'));
// socket.setKeepAlive(true, 150);

console.log('connecting', socket.connecting);

socket.on('lookup', (err, address, family, host) => console.log('>>lookup', address, family, host));
socket.on('connect', (event) => console.log('>>connected success', event));
socket.on('ready', (event) => console.log('>>ready', event));
socket.on('data', (data) => {
    console.log('>>data', data);
    // console.log('>>data', data.toString(), socket.bytesRead);
    // setTimeout(() => {
    //     socket.write('node.js', (err, res) => {
    //         console.log(err, res);
    //     })
    // }, 200);
});

socket.on('timeout', (event) => console.log('>>timeout', event));
socket.on('error', err => console.error(err));

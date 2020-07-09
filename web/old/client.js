const net = require('net');

const client = net.createConnection({ port: 8124 }, () => {
    console.log('connected to server!');
    client.write('world!\r\n');
    console.log(client.bytesRead, client.bytesWritten);
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});

client.on('end', () => {
    console.log('disconnected from server');
});

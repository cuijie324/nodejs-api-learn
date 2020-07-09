const dgram = require('dgram');

let client = dgram.createSocket('udp4');

client.on('message', (msg, rinfo) => {
    console.log('received ', msg.toString(), rinfo);
});

client.bind(() => {
    console.log('client bind', client.address());
    client.setBroadcast(true);

    client.send('hello world', 6541, '192.168.3.59', (err, response) => {
        console.log(err, response);
    });
});

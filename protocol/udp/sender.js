const dgram = require('dgram');

const client = dgram.createSocket('udp4');

client.send('hello', 41234, console.log);

const tls = require('tls');
const fs = require('fs');

const option = {

};

const socket = tls.connect(8000, option, () => {
    console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
});

socket.setEncoding('utf8');
socket.on('data', (data) => {
    console.log(data);
});

socket.on('end', () => {
    console.log('end');
    // socket.close();
});

socket.on('error', err => {
    console.error(err);
});

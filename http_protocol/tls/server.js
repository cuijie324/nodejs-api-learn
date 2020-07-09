const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./ca-key.pem'),//私钥
    cert: fs.readFileSync('./ca-cert.pem'),//证书
    passphrase: 'test1234', //私钥密码

    // This is necessary only if using the client certificate authentication.
    requestCert: false,

    // This is necessary only if the client uses the self-signed certificate.
    ca: [fs.readFileSync('./ca-cert.pem')]
};

const server = tls.createServer(options, (socket) => {
    console.log('server connected',
        socket.authorized ? 'authorized' : 'unauthorized');
    socket.write('welcome!\n');
    
    socket.setEncoding('utf8');
    socket.pipe(socket);
});

server.on('secureConnection', (socket) => {
    console.log('>>>secureConnection');
})

server.listen(8000, () => {
    console.log('server bound');
    console.log(server.address());
});

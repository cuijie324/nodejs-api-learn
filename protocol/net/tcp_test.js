const net = require('net');

const server = net.createServer((socket) => {
    console.log('connected');
    server.getConnections((err, count) => {
        console.log('current connections', count);
        console.log('max', server.maxConnections, server.getMaxListeners());
        if (count > 2) {
            // server.maxConnections = 2;
            // server.unref();
        }
    });

    socket.on('data', (data) => console.log(data.toString()));

    socket.on('end', () => console.log('>>>>end'));

});

server.listen(8000, 2, (event) => {
    console.log('the server is listening', event);
    console.log(server.address());
});

server.on('listening', (event) => {
    console.log('>>> listening', event);
});

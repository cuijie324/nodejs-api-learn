const http = require('http');

let server = http.createServer(function first(req, res) {
    res.end('end');
}).listen(1337);

server.on('request', function second(req, res) {
    res.end('end second');
});

console.log(server.listeners.length);
console.log(server.listeners('request').length, server.listeners('request')[0]);

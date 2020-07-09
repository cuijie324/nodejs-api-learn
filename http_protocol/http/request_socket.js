const http = require('http');
const options = {
    host: 'www.bing.com'
};
const req = http.get(options);
req.end();

req.once('response', (res) => {
    const ip = req.socket.localAddress;
    const port = req.socket.localPort;
    console.log(`Your IP address is ${ip} and your port is ${port}`);
});
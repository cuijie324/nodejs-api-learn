const http = require('http');
const keepAliveAgent = new http.Agent({
    keepAlive: true
});
let options = {
    agent: keepAliveAgent
};

// http.request(options, onResponseCallback);
// console.log(keepAliveAgent.maxFreeSockets, keepAliveAgent.maxSockets);
console.log(keepAliveAgent.sockets, keepAliveAgent.requests);
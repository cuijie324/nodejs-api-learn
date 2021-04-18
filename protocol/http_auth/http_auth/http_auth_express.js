const express = require('express');
const auth = require('http-auth');

let basic = auth.basic({
    realm: 'Simon Area.',
    file: __dirname + '/users.htpasswd'
});

basic.on('success', (result, req) => {
    console.log(`User authenticated: ${result.user}`);
});

basic.on('fail', (result, req) => {
    console.log(`User authentication failed - ${result.user}`);
});

basic.on('error', (error, req) => {
    console.error('something is error', error);
});

let app = express();
app.use(auth.connect(basic));

app.get('/', (req, res) => {
    res.send(`Hello from express - ${req.user}`);
});

//认证具体路径
app.get('/auth', auth.connect(basic), (req, res) => {
    res.send(`Hello from express auth - ${req.user}`);
});

app.listen(1338);
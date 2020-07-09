const http = require('http');
const auth = require('http-auth');

//基本认证
// let basic = auth.basic({
//     realm: 'Simon Area.',
//     file: __dirname + "/users.htpasswd"
// });

//自定义认证
let basic = auth.basic({
    realm: 'Simon Area.'
}, (username, password, callback) => {
    console.log('basic.....', username, password);
    callback(username === 'cha' && password === '123456');
});

basic.on('success', (result, req) => console.log('success', result, req.headers));

http.createServer(basic, (req, res) => {
    console.log(req.user);
    res.end(`Welcome to private area - ${req.user}!`);
}).listen(1337, () => console.log('listening on 1337'));
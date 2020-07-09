const finalhandler = require('finalhandler');
const http = require('http');
const fs = require('fs');
const serveStatic = require('serve-static');

// let server = http.createServer(function (req, res) {
//     var done = finalhandler(req, res);
//     done();
// }).listen(3000);

// http.createServer(function (req, res) {
//     let done = finalhandler(req, res);
//     fs.readFile(`${__dirname}/index.html`, function (err, buf) {
//         if (err) return done(err);
//         res.setHeader('Content-Type', 'text/html');
//         res.end(buf);
//     });
// }).listen(3000);

// 中间件风格
// let serve = serveStatic('public');
// http.createServer(function (req, res) {
//     let done = finalhandler(req, res);
//     serve(req, res, done);
// }).listen(3000);

function logerror(err) {
    console.error(err.stack || err.toString());
}

http.createServer(function (req, res) {
    let done = finalhandler(req, res, { onerror: logerror });
    fs.readFile('index.html', function (err, buf) {
        if (err) return done(err);
        res.setHeader('Content-Type', 'text/html');
        res.end(buf);
    });
}).listen(3000);
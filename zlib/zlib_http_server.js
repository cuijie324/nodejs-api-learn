const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    const raw = fs.createReadStream('index.html');
    let acceptEncoding = request.headers['accept-encoding'];
    console.log('accepEncoding', acceptEncoding);

    if (!acceptEncoding) {
        acceptEncoding = '';
    }

    if (!/\bdeflate\b/.test(acceptEncoding)) {
        response.writeHead(200, {
            'Content-Encoding': 'deflate'
        });
        raw.pipe(zlib.createDeflate()).pipe(response);
    } else if (/\bgzip\b/.test(acceptEncoding)) {
        response.writeHead(200, {
            'Content-Encoding': 'gzip'
        });
        raw.pipe(zlib.createGzip()).pipe(response);
    } else {
        response.writeHead(200, {});
        raw.pipe(response);
    }
}).listen(1337);
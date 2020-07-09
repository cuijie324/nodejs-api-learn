const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

const request = http.get({
    host: 'localhost',
    path: '/',
    port: 1337,
    headers: {
        'Accept-Encoding': 'gzip,deflate'
    }
});

request.on('response', (response) => {
    console.log('response encoding', response.headers['content-encoding']);
    const output = fs.createWriteStream('zlib_http_index.html');
    switch (response.headers['content-encoding']) {
        case 'gzip':
            response.pipe(zlib.createGunzip()).pipe(output);
            break;
        case 'deflate':
            response.pipe(zlib.createInflate()).pipe(output);
            break;
        default:
            response.pipe(output);
            break;
    }
});
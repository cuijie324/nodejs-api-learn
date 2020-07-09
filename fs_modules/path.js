const path = require('path');

// let res = path.extname('index.html');
// res = path.join(__dirname, '..', 'config', 'weixin.json');
// console.log(res);

let res = path.dirname(__dirname);
// console.log(res, path.dirname(res));
console.log(path.delimiter);
console.log(process.env.PATH);

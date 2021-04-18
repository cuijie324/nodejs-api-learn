const url = require('url');
const href = 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash';
// console.log(new url.URL(href));//使用WHATWG
// console.log(url.parse(href));//老规范

let myUrl = new url.URL(href);
console.log(myUrl.hash);

myUrl.hash = 'newhash';
console.log(myUrl.hash);
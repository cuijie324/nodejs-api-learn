const http = require('http');
const fileType = require('file-type');
// const url = 'http://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif';
const url = 'http://mmbiz.qpic.cn/mmbiz_jpg/2oTfzsJvWEDIGpA4NK1BcNibaFTTT9aW04Banh5x5wh0TicXt1bCuuzL7uWAr439k9edbGrkd0Hjq0F0RNVNxmDw/0?wx_fmt=jpeg';
 
http.get(url, res => {
    res.once('data', chunk => {
        res.destroy();
        console.log(fileType(chunk));
        //=> {ext: 'gif', mime: 'image/gif'}
    });
});
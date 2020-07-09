const express = require('express');
const apicache = require('apicache');
const redis = require('redis');
const path = require('path');

let app = express();

//全局配置
apicache.options({ debug: true, redisClient: redis.createClient() });

const onlyStatus200andHtml = (req, res) => {
    let headers = req.headers;
    if (res.statusCode === 200 && headers && /text\/html/.test(headers['accept'])) {
        return true;
    }
    return false;
}

//使用内存缓存，指定具体路径
let cache = apicache.middleware;
app.use(cache('5 minutes', onlyStatus200andHtml));

app.use(express.static(path.join(__dirname, '.')));
app.listen(4000);
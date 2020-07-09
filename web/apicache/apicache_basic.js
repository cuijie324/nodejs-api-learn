const express = require('express');
const apicache = require('apicache');
const redis = require('redis');

let app = express();

//全局配置
apicache.options({ debug: true });

//使用内存缓存，指定具体路径
let cache = apicache.middleware;

app.get('/api/collection/:id?', cache('5 minutes'), (req, res) => {
    res.json({ foo: 'bar' });
});

app.listen(4000);
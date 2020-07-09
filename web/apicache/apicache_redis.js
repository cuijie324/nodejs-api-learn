const express = require('express');
const apicache = require('apicache');
const redis = require('redis');

let app = express();

//使用redis缓存
let cacheWithRedis = apicache.options({
    redisClient: redis.createClient(),
    debug: true
}).middleware;

app.get('/redis-cached', cacheWithRedis('1 minutes'), (req, res) => {
    res.json({
        success: new Date()
    });
});

app.listen(4000);
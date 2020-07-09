const express = require('express');
const apicache = require('apicache');
const redis = require('redis');

let app = express();

//缓存分组和手工控制，有点问题？
app.use(apicache.options({
    debug: true,
    redisClient: redis.createClient()
}).middleware('5 minutes'));

app.get('/api/cache/index', (req, res) => {
    res.json(apicache.getIndex());
});

app.get('/api/cache/clear/:target?', (req, res) => {
    res.json(apicache.clear(req.params.target));
});

app.get('/api/:collection/:item?', (req, res) => {
    req.apicacheGroup = req.params.collection;
    console.log('>>>>>', req.apicacheGroup);
    res.json({
        success: true
    });
});

app.listen(4000);
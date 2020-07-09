const express = require('express');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);

let options = {
    host: '127.0.0.1',
    port: 6379,
    ttl: 60 * 60 * 24 * 7
}

let app = express();
app.use(session({
    store: new RedisStore(options),
    secret: 'keyboard cat',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    saveUninitialized: true,
    resave: false
}));

app.use('/test', (req, res) => {
    console.log(req.session.id);
    console.log('>>>', req.originalUrl);
    req.session.stockAccount = 'haha';
    res.json({ user: req.session.stockAccount, date: new Date() });
});

app.use('/getUser', (req, res) => {
    if (req.session.stockAccount) {
        let user = req.session.stockAccount;
        req.session.regenerate(() => {
            req.session.stockAccount = 'haha';
            req.session.save();
            res.send(req.session.stockAccount + '======user==========');
        });
    }
});

app.listen(3000);
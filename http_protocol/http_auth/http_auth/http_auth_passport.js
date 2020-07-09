const express = require('express');
const auth = require('http-auth');
const passport = require('passport');

let basic = auth.basic({
    realm: 'Simon Ares.',
    file: __dirname + '/users.htpasswd'
});

let app = express();
passport.use(auth.passport(basic));

app.get('/', passport.authenticate('http', {
    session: false
}), (req, res) => {
    res.end(`Welcome to private area - ${req.user}`);
});

app.listen(1339);
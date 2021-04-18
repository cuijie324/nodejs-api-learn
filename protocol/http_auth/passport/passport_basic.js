const express = require('express');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');

passport.use(new BasicStrategy(
    function (username, password, done) {
        console.log(username, password);
        if (username !== 'node') return done(null, false);
        done(null, { name: username, age: 22 });
    })
);

let app = express();
app.use(passport.initialize());
app.use('/auth', passport.authenticate('basic', { session: false }), (req, res) => {
    console.log(req.user);
    res.json(`logined user ${req.user.name}`);
});
app.use((req, res, next) => {
    res.json('xxxx');
})

app.listen(3010);
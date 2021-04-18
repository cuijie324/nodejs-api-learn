const express = require('express');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');

passport.use(new BasicStrategy(
    function (username, password, done) {
        console.log(username, password);
        if (username !== 'node') return done(null, false);
        done(null, { name: username, age: 23 });
    })
);

passport.serializeUser((user, done) => {
    console.log('serializeUser', user.name);
    done(null, user.name);
});

passport.deserializeUser((name, done) => {
    console.log('deserializeUser', name);
    done(null, { name, age: Date.now() });
});

let app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', passport.authenticate('basic', { session: true }), (req, res) => {
    console.log('/auth', req.user);
    res.json(`logined user ${req.user.name}`);
});
app.use((req, res, next) => {
    res.json('xxxx');
})

app.listen(3010);
const connect = require('connect');
const http = require('http');

let app = connect();
app.use(function (req, res) {
    res.end('Hello Connect');
});

app.listen(3000);
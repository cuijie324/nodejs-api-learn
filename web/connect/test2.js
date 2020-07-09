const connect = require('.');

let app = connect();
app.use('/admin/', (req, res, next) => {
    res.end('admin')
});
app.use((req, res) => {
    res.end('index');
});

app.listen(4000);

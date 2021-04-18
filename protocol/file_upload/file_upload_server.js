const express = require('express');
const multer = require('multer');
const path = require('path');

let app = express();
var storage = multer.diskStorage({
    destination: __dirname,
    filename: function (req, file, cb) {//这里拿到的file文件内容没有下面打印出来的那么多
        cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

app.use('/upload', upload.single('file'), (req, res) => {
    res.json('upload');
});

app.use((req, res) => {
    res.json('test file upload');
});

app.listen(3010);

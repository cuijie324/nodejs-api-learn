const express = require('express');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: './',
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, file.originalname);
    }
});
let upload = multer({ storage });

let app = express();
app.use('/upload', upload.single('file'), (req, res) => {
    console.log('uploading>>>>>>');
    console.log(req.body);
    console.log(req.file)
    res.json('ok')
});

app.listen(3000, () => console.log('listening...'));

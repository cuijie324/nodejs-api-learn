const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

let form = new FormData();
form.append('name', 'nodejs');
form.append('file', fs.createReadStream(path.join(__dirname, 'some.txt')));

fetch('http://localhost:3010/upload', { method: 'POST', body: form })
    .then(res => console.log(res))
    .catch(err => console.error(err));

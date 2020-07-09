const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');

let url = 'http://localhost:3000/upload';

let form = new FormData();
form.append('a', 123);
form.append('file', fs.createReadStream(__dirname + '/luhan.jpeg'));

fetch(url, { method: 'POST', headers: form.getHeaders(), body: form })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));

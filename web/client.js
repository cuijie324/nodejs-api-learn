const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');
const _ = require('lodash');

// let url = 'http://localhost:3000/upload';
let url = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=12_X5LNImOqFYe68ENsNiXCOiG8ij21kEUBo1bMChTrervkv3Fc7viGhLKkwBW1O7rShNksr1b1-5ETbqmNhsIo2aaSENyJBz76qLQH26P_b2cNlp9vChGSM-4mCK8AJdDBRNl_2FUtD_uVvSotVQBdCJAPKV';
let form = new FormData();
form.append('media', fs.createReadStream(__dirname + '/p2525028832.jpg'));

// form.getLength((err, length) => {
//     if (err) throw err;

//     fetch(url, { method: 'POST', body: form, headers: _.assign({}, form.getHeaders, { 'Content-Length': length }) })
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.error(err));
// });

form.submit({
    // protocol: 'https',
    host: 'api.weixin.qq.com',
    path: '/cgi-bin/media/uploadimg?access_token=12_X5LNImOqFYe68ENsNiXCOiG8ij21kEUBo1bMChTrervkv3Fc7viGhLKkwBW1O7rShNksr1b1-5ETbqmNhsIo2aaSENyJBz76qLQH26P_b2cNlp9vChGSM-4mCK8AJdDBRNl_2FUtD_uVvSotVQBdCJAPKV'
}, function (err, res) {
    if (err) throw err;

    // res – response object (http.IncomingMessage)  //
    res.on('data', data => console.log(data.toString()));

    res.resume();
});
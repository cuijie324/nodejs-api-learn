const fs = require('fs');
const fetch = require('node-fetch');
let FormData = require('form-data');

let form = new FormData();
form.append('media', fs.createReadStream(__dirname + '/MIT.jpg'));
// let token = '12_Eoocj0OTnjo-ByPM1WpTvzsGqsAL6tkVSqdaoszplygIDxr0raBgk4P0OaKpDKYN7f-tMomURd-_6vYgW09HeNICuh1lvJCy0CpmZo9ltq0Gp00xcQoM2P0op9Z7nCDjYFfQquveXdUUecd2PZJhCIAKUE';
// let url = `https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${token}`;
let url = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=12_Eoocj0OTnjo-ByPM1WpTvzsGqsAL6tkVSqdaoszplygIDxr0raBgk4P0OaKpDKYN7f-tMomURd-_6vYgW09HeNICuh1lvJCy0CpmZo9ltq0Gp00xcQoM2P0op9Z7nCDjYFfQquveXdUUecd2PZJhCIAKUE';

console.log(form.getHeaders());

fetch(url, { method: 'POST', body: form, headers: form.getHeaders() })
    // .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));

// console.log(url);
// form.submit(url, (err, res) => {
//     // console.log(err, res);
//     res.on('data', data => console.log(data.toString()))
//     res.on('end', (data) => console.log('end', data));
// })

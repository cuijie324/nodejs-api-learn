const fs = require('fs');
const request = require('request');

var formData = {
    media: fs.createReadStream(__dirname + '/p2525028832.jpg')
};
let url = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=12_2bEI62ApHt-SuWRxppndI8IcUKmCcRfDicr4lJDrGUw8t2Xs6UujLpj5HHQxuG_Z6H3YBNOaZzWmhrPFVijZSDfTM9gYHnVdXUHxF_iIDs9zSidipEDXM9QQNYpVpkGs9pLh36r-rm5QZvJmQHKdCHAXOR';

request.post({ url, formData: formData }, (err, response, body) => {
    if (err) {
        return console.error('upload failed:', err);
    } else {
        console.log(response, body);
    }
});
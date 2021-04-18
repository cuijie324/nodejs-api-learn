const querystring = require('querystring');

let basic = {
    age: '',
    gender: '',
    area: '',
    os: '',
    connection: '',
    businessinterest: '',
    marriage_status: '',
    device_brand_model: [],
    device_price: [],
    education: '',
    telcom: '',
    payment: '',
    // app_behavior_object_id_list: 
    // platform_type: 0
    ad_behavior: [{ "in_action_list": [], "not_in_action_list": [] }]
}

let result = querystring.stringify(basic);
// console.log(result);

// console.log('a=' + JSON.stringify(basic.ad_behavior));

// console.log(JSON.stringify(basic));

// let url = 'https://mp.weixin.qq.com/promotion/mptargetEstimate?age=21~25&gender=&area=&os=&connection=&businessinterest=&marriage_status=&device_brand_model=%5B%5D&device_price=%5B%5D&education=&telcom=&payment=&app_behavior_object_id_list=&platform_type=0&ad_behavior=%5B%7B%22in_action_list%22%3A%5B%5D%2C%22not_in_action_list%22%3A%5B%5D%7D%5D&token=1211104942&appid=&spid=&_=1522141528835';
let url = 'device_price=%5B%5D';
console.log(querystring.parse(url));

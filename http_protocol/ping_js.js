let ping = require('ping');
let _ = require('lodash');

_.each(['112.74.187.5', 'google.com', 'baidu.com'], host => {
    ping.sys.probe(host, isAlive => {
        let msg = 'host ' + host + ' is ' + (isAlive ? 'alive' : 'dead');
        console.log(msg);
    });
});

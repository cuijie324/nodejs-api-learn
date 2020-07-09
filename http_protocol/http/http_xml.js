const http = require('http');

let server = http.createServer(function (req, res) {
    let result = {
        FromUserName: 'weixin',
        ToUserName: 'segment',
        Content: 'xxxx'
    }, now = Date.now();

    res.setHeader('Content-Type', 'text/xml')
    var response = `<xml>
            <ToUserName><![CDATA[${result.FromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${result.ToUserName}]]></FromUserName>
            <CreateTime>${now}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${result.Content}]]></Content>
        </xml>`
    res.end(response)
}).listen(3001);

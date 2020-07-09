const { StringDecoder } = require('string_decoder');

const decoder = new StringDecoder('utf-8');
console.log(decoder.write(Buffer.from('张', 'utf-8')));
console.log(decoder.write(Buffer.from('abc', 'ascii')));
console.log(decoder.end(Buffer.from('cuijie', 'base64')));

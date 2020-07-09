const { TextEncoder, TextDecoder } = require('util');

// const encoder = new TextEncoder();
// let str = encoder.encode('hello sf  空格');

// console.log(encoder.encoding, str);

// const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
// let result = decoder.decode(str);
// console.log('result', result);

let res = new Uint8Array([
    104,
    101,
    108,
    108,
    111,
    32,
    115,
    102,
    32,
    32,
    231,
    169
])

let res2 = new Uint8Array([186,
    230,
    160,
    188
]);

const decoder_stream = new TextDecoder();
// let result = decoder_stream.decode(res, { stream: true });
// console.log(result);

// result = decoder_stream.decode(res2, { stream: true });
// console.log(result);

const encoder = new TextEncoder();
const uint8array = encoder.encode('this is some data');
// console.log(uint8array);

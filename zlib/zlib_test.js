const zlib = require('zlib');

// const deflate_str = 'x��I�,��H���W���L���P�O';
// zlib.unzip(deflate_str, (err, buffer) => {
//     if (!err) {
//         console.log(buffer.toString());
//     } else {
//         console.error(err);
//     }
// })

//解压部分
const buffer = Buffer.from('eJzT0yMA', 'base64');

zlib.unzip(buffer, {
    finishFlush: zlib.constants.Z_SYNC_FLUSH
}, (err, buff) => {
    if (!err) {
        console.log(buff.toString());
    } else {
        console.error(err);
    }
})
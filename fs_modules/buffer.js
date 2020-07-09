// const str = `\u00bd + \u00bc = \u00be`;
// console.log(`${str}: ${str.length} characters,
//     ${Buffer.byteLength(str, 'ascii')} bytes
// `);

// const buf1 = Buffer.from('1234');
// const buf2 = Buffer.from('1234');
// const arr = [buf1, buf2];
// console.log(Buffer.compare(buf1, buf2));

// const buf1 = Buffer.alloc(10);
// const buf2 = Buffer.alloc(14);
// const buf3 = Buffer.alloc(18);
// const totalLength = buf1.length + buf2.length + buf3.length;
// console.log(totalLength);

// const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
// console.log(bufA);
// console.log(bufA.length, totalLength);

// const buf = Buffer.from([0x62, 0x75, 0xff, 1, 3, 'a', 'b']);
// console.log(buf);

// const arr = new Uint16Array(2);
// arr[0] = 5000;
// arr[1] = 4000;
// const buf = Buffer.from(arr.buffer);
// console.log(buf);
// arr[1] = 5000;
// console.log(buf, arr);
// buf[0] = 12;
// console.log(buf, arr);

// const buf1 = Buffer.from('buffer');
// const buf2 = Buffer.from(buf1);
// buf1[0] = 0x61;
// console.log(buf1, buf2, buf1.toString(), buf2.toString());

// const buf1 = Buffer.from('this is a test');
// const buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');
// console.log(buf1.toString(), buf2.toString());

// let str = new String('this is a test');
// console.log(str, str.valueOf());
// const buf = Buffer.from(str);
// console.log(buf);

// class Foo {
//     [Symbol.toPrimitive] () {
//         return 'this is a test';
//     }
// }

// const buf = Buffer.from(new Foo());
// console.log(buf.toString());
// console.log(Buffer.isBuffer(buf));

// console.log(Buffer.isEncoding('ags'))

// const str = 'Node.js';
// const buf = Buffer.allocUnsafe(str.length);
// for (let i = 0; i < str.length; i++) {
//     buf[i] = str.charCodeAt(i);
// }
// console.log(buf.toString());

// const arrayBuffer = new ArrayBuffer(16);
// let buffer = Buffer.from(arrayBuffer);
// buffer = Buffer.from('cha');

// console.log(buffer.buffer === arrayBuffer);
// console.log(buffer.buffer)

// const buf1 = Buffer.allocUnsafe(26).fill('i');
// const buf2 = Buffer.allocUnsafe(26);

// for (let i = 0; i < 26; i++) {
//     buf2[i] = 97 + i;
// }

// console.log(buf1.toString(), buf2.toString());
// buf2.copy(buf1, 8, 16, 20);
// console.log(buf1.toString(), buf2.toString());ß

const buf = Buffer.from('abc123');
for (let i of buf.entries()) {
    console.log(i);
}












setImmediate(() => console.log(2));

setTimeout(() => console.log(1));
setTimeout(() => console.log(11));

process.nextTick(() => console.log(31));

setImmediate(() => console.log(21));

process.nextTick(() => console.log(3));

Promise.resolve().then(() => console.log(4));
Promise.resolve().then(() => console.log(41));

(() => console.log(5))();

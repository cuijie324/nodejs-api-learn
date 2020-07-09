// // 下面两行，次轮循环执行
// setTimeout(() => console.log(1));
// setImmediate(() => console.log(2));
// // 下面两行，本轮循环执行
// process.nextTick(() => console.log(3));
// Promise.resolve().then(() => console.log(4));
// (() => console.log(5))();

const _ = require('lodash');
const assert = require('assert');
let num = 100000;

function create_timer (time, action) {
    return setTimeout(action, time);
}

let arr = [];

for (let i = 1; i < num; i++) {
    let timer = create_timer(i * Math.random() * 600, () => {
        console.log('timeout', arr.length, i);
        _.remove(arr, timer);
    })
    arr.push(timer);
}

console.log(arr.length, '>>>>');
// console.log(arr[1]);

setTimeout(() => {
    console.log('>>>>>sssss');
}, 100);
//async的执行顺序？async是基于Promise实现的
async function async1 () {
    console.log('async1 start');//await前面的代码是直接执行的，就跟普通函数调用一样
    let item = await async2();//await的返回值相当于异步的回调
    console.log('>>>>item', item);
    console.log('async1 end');
}

async function async2 () {
    console.log('async2');
    return await new Promise((resolve) => {
        console.log('inner');
        resolve(1);
    }).then(res => {
        console.log('inner2');
        return res + 1;
    }).catch(err => console.error(err));
}

console.log('script start>>>>');

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});

console.log('script end<<<<<');

//输出
//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2
//setTimeout

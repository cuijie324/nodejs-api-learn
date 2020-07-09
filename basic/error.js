let a = 5;
let b = 6;
// let error = new Error('something is error');
// console.log(error.code, error.message);
// error.message = 'changed';
// console.log(error.message);
// console.log(error.stack);

// const myObject = {};
// Error.stackTraceLimit = 59;
// Error.captureStackTrace(myObject);
// console.log(myObject.stack);
// console.log(`${myObject.name}: ${myObject.message}.`);

// require('net').connect(-1);
// require('url').parse(() => { });

try {
    throw 'except';
} catch (err) {
    console.log(err, err.message);
}

console.log('ssss');

var EventEmitter = require('events');

// var myEmitter = new EventEmitter();
// myEmitter.on('event', () => {
//      console.log('an event occurred!');
// });

// myEmitter.emit('event');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
    console.log(this);
});
myEmitter.emit('event');
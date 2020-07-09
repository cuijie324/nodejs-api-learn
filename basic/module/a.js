const EventEmitter = require('events');

console.log('a.js', module.loaded, module.parent);

module.exports = new EventEmitter();

setTimeout(() => {
    module.exports.emit('ready');
}, 1000);
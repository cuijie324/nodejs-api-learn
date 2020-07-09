const a = require('./a');
console.log('b.js', module.loaded, module.parent);

a.on('ready', () => {
    console.log('module a is ready');
});

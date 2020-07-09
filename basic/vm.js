const vm = require('vm')
const util = require('util');

// const x = 1
// const sandbox = {
//     x: 2
// }
// vm.createContext(sandbox)

// const code = 'x += 40; var y = 17;';
// vm.runInContext(code, sandbox);

// console.log(sandbox.x, sandbox.y);
// console.log(x);

// const sandbox = {
//     animal: 'cat',
//     count: 2
// }

// const script = new vm.Script('count += 1; name = "kitty";');
// const context = vm.createContext(sandbox);
// for (let i = 0; i < 10; i++) {
//     script.runInContext(context);
// }

// console.log(util.inspect(sandbox));
global.name = 'node.js hh';
console.log(global.name);

let code = `
    // console.log(global);
    name = 'cuijie';
`;
const script = new vm.Script(code);
script.runInThisContext();

console.log(global.name);
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('what do you think of Node.js?', (answer) => {
//     console.log(`Thank you for your valuable feedback: ${answer}`);
//     rl.close();
// });

rl.on('pause', () => {
    console.log('pause');
});

rl.on('SIGINT', () => {
    console.log('ctrl + c');
});

rl.on('line', (line) => {
    console.log('>>>line', line);
});

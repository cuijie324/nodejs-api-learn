// console.log(process.pid, process.memoryUsage());
// console.log(process.title);

// process.exit(33);

process.on('uncaughtException', (error) => {
    console.error('>uncaughtException', error);
})

process.on('unhandledRejection', (reason, p) => {
    console.log('>unhandledRejection', reason, p);
    p.catch(err => console.log('catch in event handler', err));
})

process.on('rejectionHandled', (p) => {
    console.log('>rejectionHandled', p);
    console.log('&&&&&&&', p.catch(err => console.log('ss', err)));
})

// process.on('beforeExit', (event) => {
//     console.log(`>>beforeExit, Received Event ${event}`);
// });

// process.on('exit', (code) => {
//     console.log('>>exit right now', code);
// })

process.on('warning', (warning) => {
    // console.log('warning', warning);
    console.warn(warning.name);
    console.warn(warning.message);
    console.warn(warning.code);
    console.warn(warning.stack);
    console.warn(warning.detail);
});

// Promise.reject('hello');

// process.stdin.resume();

process.on('SIGINT', () => {
    console.log('Signal Event SIGINT');
});

// process.abort();
// console.log(process.arch);
// console.log('argv', process.argv);
// console.log('argv0', process.argv0);
// console.log('execArgv', process.execArgv);
// console.log('execPath', process.execPath);

// console.log(`Starting directory: ${process.cwd()}`);
// try {
//     process.chdir('tmp');
//     console.log(`New directory: ${process.cwd()}`);
// } catch (err) {
//     console.error(`chdir: ${err}`);
// }

// console.log(process.config);

// const startUsage = process.cpuUsage();
// console.log(startUsage);

// const now = Date.now();
// // while (Date.now() - now < 500);
// console.log(process.cpuUsage(startUsage));
// console.log(process.cpuUsage());

// console.log(process.cwd());

// process.emitWarning('Something happened!', {
//     code: 'MY_WARNING',
//     detail: 'This is some additional information'
// });

// console.log(process.env);
// console.log('getegid', process.getegid(), process.geteuid());
// console.log('getgid', process.getgid(), process.getuid());
// console.log('getproups', process.getgroups());

// const NS_PER_SEC = 1e9;
// const time = process.hrtime();
// const now = Date.now();
// console.log(time);

// setTimeout(() => {
//     console.log('unix', Date.now() - now);
//     const diff = process.hrtime(time);
//     console.log(`Benchmark took ${diff[0] * 1000 + diff[1] / 1000} nanoseconds`);
//     console.log('unix', Date.now() - now);
// }, 20);

// console.log(process.getgroups());
// process.initgroups('bnoordhuis', 1000);
// console.log(process.getgroups());

// process.on('SIGHUP', () => {
//     console.log('Got SIGHUB signal.');
// });

// setTimeout(() => {
//     console.log('Exiting.');
//     process.exit(0);
// }, 100);

// process.kill(process.pid, 'SIGHUP');

// console.log(process.mainModule);
// console.log(process.memoryUsage());

// console.log(process.noDeprecation);
// console.log(process.pid, process.ppid, process.platform);

// console.log(process.release);
let start = new Date();
let hrstart = process.hrtime();

setTimeout(() => {
    let end = new Date() - start;
    let hrend = process.hrtime(hrstart);
    console.log(hrend);

    console.log('date', end);
    console.log('hrtime', hrend[0] * 1000 + hrend[1] / 1000000);
}, 5000);

module.exports = { a: 1, b: 2 }

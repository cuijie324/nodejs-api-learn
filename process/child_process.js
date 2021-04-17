const { spawn, exec, execFile, fork } = require('child_process');
const util = require('util');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

// exec('echo "The \\$HOME variable is $HOME"');

// const execPromise = util.promisify(exec);

// async function lsExample () {
//     const { stdout, stderr } = await execPromise('ls');
//     console.log('stdoout: ', stdout);
//     console.log('stderr', stderr);
// }

// lsExample();

// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//     if (error) {
//         throw error;
//     }
//     console.log(stdout);
// });

// exec('node --version', (err, stdout, stderr) => {
//     console.log(stdout);
// });

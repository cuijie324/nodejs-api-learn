const fs = require('fs');

// fs.mkdir('temp', err => console.log(err.code));

// fs.exists('temp/dir', console.log);

// const makeDir = require('make-dir');
// makeDir('temp/rainbow/cake').then(path => console.log(path))
//     .catch(err => console.error(err));

// const fse = require('fs-extra');
// fse.ensureDir('temp2/test/cake', console.log);

fs.appendFile('append.json', JSON.stringify({ num_iid: 111, title: 'test' }) + ',\n', (err) => {
    if (err) throw err;
});

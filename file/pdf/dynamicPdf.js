var fs = require('fs');
let path = require('path');
var pdf = require('dynamic-html-pdf');
var html = fs.readFileSync(path.join(__dirname, 'report.html'), 'utf8');

// Custom handlebar helper
pdf.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
})

var options = {
    format: "A4",
    orientation: "portrait",
    // border: "10mm"
};

var users = [
    {
        name: 'aaa',
        age: 24,
        dob: '1/1/1991'
    },
    {
        name: 'cuijie',
        age: 25,
        dob: '1/1/1995'
    },
    {
        name: 'ccc',
        age: 24,
        dob: '1/1/1994'
    }
];

var document = {
    type: 'file',     // 'file' or 'buffer'
    template: html,
    context: {
        users: users
    },
    path: path.join(__dirname, "./output.pdf")    // it is not required if type is buffer
};

pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });
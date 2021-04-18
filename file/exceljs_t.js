const Excel = require('exceljs');

let workbook = new Excel.Workbook();
workbook.creator = 'cuijie';
workbook.lastModifiedBy = 'Her';
workbook.created = new Date(1997, 12, 23);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2017, 1, 1);

workbook.properties.date1904 = true;

workbook.views = [{
    x: 0,
    y: 0,
    width: 10000,
    height: 20000,
    firstSheet: 0,
    activeTab: 1,
    visibility: 'visible'
}];

let sheet = workbook.addWorksheet('My Sheet', {
    properties: {
        tabColor: {
            argb: 'FFC000'
        }
    }
});

workbook.addWorksheet('My Sheet2', {
    properties: {
        showGridLines: false
    }
});

workbook.addWorksheet('My Sheet3', {
    views: [{xSplit: 1, ySplit: 1}]
});

workbook.xlsx.writeFile('test_exceljs.xlsx')
    .then(console.log);
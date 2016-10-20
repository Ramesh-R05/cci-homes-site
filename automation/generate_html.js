var dateStamp = Date.now();
var Report = require('cucumber-html-report');

var options = {
    source:    './reports/regression.json', // source json
    dest:      './reports',          // target directory (will create if not exists)
    name:      dateStamp+'Regression.html',        // report file name (will be index.html if not exists)
    title:     'Cucumber Report'    // Title for default template. (default is Cucumber Report)
};

var report = new Report(options);
report.createReport();

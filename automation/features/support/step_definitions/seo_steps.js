module.exports = function() {
    var string = 'User-agent: *\nDisallow: /';


    this.Given(/^I can validate the below sites have the correct meta description$/, function (table) {
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            console.log("testing URL : "+row['site']);
            browser.url(row['site']);
            expect(browser.getText('body')).toMatch(String(row['meta']));
        }
    });

    this.Given(/^I can validate the below sites have the correct robots.txt config$/, function (table) {
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates the robots.txt content
            browser.url('http://'+row['site']);
            expect(browser.getText('body')).not.toEqual(string);
        }
    });

    this.Given(/^I can validate the below DEV sites have the correct robots.txt config$/, function (table) {
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates the robots.txt content
            browser.url('http://'+row['site']);
            console.log(browser.getText('body'));
            expect(browser.getText('body')).toEqual(string);
        }
    });

};

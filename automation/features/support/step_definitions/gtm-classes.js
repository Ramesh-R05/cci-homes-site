var world = require('../world');

module.exports = function(){

    this.Then(/^I can click the elements with gtm class$/, function (table) {
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['URL']);
            browser.url(world.Urls.home_page+row['URL']);
            console.log(row['gtm class']);
            browser.scroll('.'+row['gtm class']);
            browser.waitForVisible('.'+row['gtm class'], 6000);
            browser.click('.'+row['gtm class']);
        }
    });
};

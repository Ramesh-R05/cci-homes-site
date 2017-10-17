var error = require('../page_objects/error_widget');

module.exports = function() {


    this.Then(/^I should see the error title as "([^"]*)"$/, function (content) {
        browser.waitForVisible(error.errorTitle, 5000);
        var errorTitle = browser.getText(error.errorTitle);
        expect(errorTitle).toEqual(content);
    });

    this.Then(/^I should see the text clickable to homepage with gtm "([^"]*)"$/, function (gtm) {
        //Get values
        var errorText = browser.getText(error.errorLink);
        var errorLink = browser.getAttribute(error.errorLink,'href');
        var errorGTM = browser.getAttribute(error.errorLink,'class');

        //Validate text, link and gtm
        expect(errorText).not.toEqual('');
        expect(errorLink).not.toEqual('');
        expect(errorGTM).toMatch(gtm);
    });
};

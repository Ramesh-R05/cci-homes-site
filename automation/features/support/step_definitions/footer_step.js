var footer = require('../page_objects/footer_widget');

module.exports = function() {

    this.Given(/^I can see the social logo in the footer$/, function () {
        // Validate the existence of the logo
        var socialLogo = browser.getCssProperty(footer.footerSocialLogo, 'background-image').value;
        expect(socialLogo).toMatch("/assets/logos/follow-homes-to-love-logo.svg");
    });

    this.Given(/^I can see the social icons clickable to open its page in the footer$/, function (dataTable) {
        var rows = dataTable.hashes();

        // Below captures the array of social links to validate against the table
        var socialLink = browser.getAttribute(footer.footerSocialLink, 'href');

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of social icons on Index and their link
            console.log(row['social'] + ' : ' + socialLink[i]);
            expect(socialLink[i]).toEqual(row['url']);
        }
    });

    this.Given(/^I can see the brands title in the footer as "([^"]*)"$/, function (text) {
        //Validate the brands title is correct.
        expect(browser.getText(footer.footerLogosTitle)).toEqual(text)
    });

    this.Given(/^I can navigate to all sites in the footer$/, function (dataTable) {
        var rows = dataTable.hashes();

        // Below captures the array of menu items to validate against the table
        var brandTitle = browser.getAttribute(footer.footerLogosList, 'title');
        var brandHref = browser.getAttribute(footer.footerLogosList, 'href');
        // End

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of menu base on Index including their url and gtm
            expect(brandTitle[i]).toEqual(row['title']);
            expect(brandHref[i]).toMatch(row['url']);
        }
    });

    this.Given(/^I can navigate to all standard pages in the footer$/, function (dataTable) {
        var rows = dataTable.hashes();

        // Below captures the array of menu items to validate against the table
        var pageTitle = browser.getText(footer.footerStandardPage);
        var pageLink = browser.getAttribute(footer.footerStandardPage, 'href');
        // End

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            expect(pageTitle[i]).toEqual(row['page']);
            expect(pageLink[i]).toMatch(row['url']);
        }
    });

    this.Given(/^I can see the standard copyright text in the footer as "([^"]*)"$/, function (text) {
        // Validate the copyright text is correct
        expect(browser.getText(footer.footerElementCopyright)).toContain(text)
    });

    this.Given(/^I can see all main elements in the footer$/, function () {
        // Validate that the four main elements in the footer appears
        expect(browser.isVisible(footer.footerElementSocialContainer)).toBe(true);
        expect(browser.isVisible(footer.footerElementLogos)).toBe(true);
        expect(browser.isVisible(footer.footerElementNavigation)).toBe(true);
        expect(browser.isVisible(footer.footerElementCopyright)).toBe(true);
    });
};

var site_nav = require('../page_objects/site_navigation_widget');
var wait = require('../utils/wait');
var uniheader = require('../page_objects/uniheader_widget');

module.exports = function() {
    this.Then(/^I should see the site Header banner$/, function () {
        browser.waitForVisible(site_nav.siteNavHeader, 3000);
    });

    this.Then(/^I should see the site navigation links$/, function () {
        var navLink = browser.getText(site_nav.siteNavLinks);
        expect(navLink).not.toEqual("");
        console.log(navLink);
    });

    this.Then(/^I should see the site navigation hamburger icon$/, function () {
        browser.click(site_nav.siteNavHamburger);
        browser.waitForVisible(site_nav.siteNavHamburgerLinks, 3000);
        var burgerLink = browser.getText(site_nav.siteNavHamburgerLinks);
        expect(burgerLink).not.toEqual("");
        console.log(burgerLink);
        wait(500); // ensure it waits for transition effect to complete
        browser.click(site_nav.siteNavClose);
    });

    this.Then(/^I should see the site Header logo$/, function () {
        browser.waitForVisible(site_nav.siteNavHeaderLogo, 3000);
    });

    this.Then(/^I should not see the site navigation links$/, function () {
        expect(browser.isVisible(site_nav.siteNavLinks)).toEqual(false);
    });

    this.Then(/^I can see the link "([^"]*)" is highlighted on the navigation links$/, function (section) {
        var activeLink = (browser.getText(site_nav.siteNaveActiveLink));
        expect(activeLink).toEqual(section);
    });

    this.Then(/^I can see the link "([^"]*)" is highlighted on the hamburger navigation links$/, function (section) {
        browser.click(site_nav.siteNavHamburger);
        browser.waitForVisible(site_nav.siteNavHamburgerLinks, 3000);
        var activeLink = (browser.getText(site_nav.siteNaveHamburgerActiveLink));
        expect(activeLink).toEqual(section);
        wait(500); // ensure it waits for transition effect to complete
        browser.click(site_nav.siteNavClose);
    });

    this.Then(/^when I scroll down in the page$/, function () {
        browser.scroll(0, 1000);
    });

    this.Then(/^I can not see the hamburger menu$/, function () {
        expect(browser.isVisible(site_nav.siteNavHamburger)).toEqual(false);
    });

    this.Then(/^I can navigate to all sites in the desktop list on the header$/, function (dataTable) {
        var rows = dataTable.hashes();
        //below captures the array of menu items to validate agains the table

        var brandTitle = browser.getAttribute(uniheader.uniHeader, 'title');
        var brandHref = browser.getAttribute(uniheader.uniHeader, 'href');
        var brandGTM = browser.getAttribute(uniheader.uniHeader, 'class');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(brandTitle[i]).toEqual(row['title']);
            expect(brandHref[i]).toMatch(row['url']);
            expect(brandGTM[i]).toEqual(row['gtm']);
        }
    });
};

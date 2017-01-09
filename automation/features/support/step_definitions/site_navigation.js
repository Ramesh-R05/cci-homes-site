var site_nav = require('../page_objects/site_navigation_widget');
var wait = require('../utils/wait');
var uniheader = require('../page_objects/uniheader_widget');

module.exports = function() {
    this.Then(/^I should see the site header banner$/, function () {
        browser.waitForVisible(site_nav.siteNavHeader, 3000);
    });

    this.Then(/^I should see the site header logo clickable to open homepage and contain "([^"]*)" class name$/, function (gtm) {
        browser.waitForVisible(site_nav.siteNavHeaderLogo, 3000);
        //Validate the existence of the logo
        var headerLogo = browser.getCssProperty(site_nav.siteNavHeaderLogo, 'background-image').value;
        expect(headerLogo).toMatch("/assets/logo/homes-logo.svg");
        //Validate the logo is clickable to open homepage
        var headerLogoLink = browser.getAttribute(site_nav.siteNavHeaderLogo,'href');
        expect(headerLogoLink).not.toEqual('');
        //Validate GTM
        var headerLogoClass = browser.getAttribute(site_nav.siteNavHeaderLogo,'class');
        expect(headerLogoClass).toContain(gtm);
    });

    this.Then(/^I should see the site "([^"]*)" navigation links and "([^"]*)" class name in "([^"]*)"$/, function (nav, gtm, position) {
        //Identify the element of position
        switch(position) {
            case 'header':
                if (nav == 'main') {
                    var sectionDetail = site_nav.siteNavSectionDetail
                } else if (nav == 'sub') {
                    browser.click(site_nav.siteNavSectionDetailSubHeader);
                    var sectionDetail = site_nav.siteNavSectionDetailSub
                }
                break;
            case 'hamburger':
                browser.click(site_nav.siteHamburger);
                if (nav == 'main') {
                    browser.waitForVisible(site_nav.siteHamburgerDetail, 3000);
                    var sectionDetail = site_nav.siteHamburgerDetail
                } else if (nav == 'sub') {
                    browser.waitForVisible(site_nav.siteHamburgerDetailSub, 3000);
                    var sectionDetail = site_nav.siteHamburgerDetailSub
                }
                break;
        }

        //Get values of class, href, and name
        var navClass = browser.getAttribute(sectionDetail,'class');
        var navLink = browser.getAttribute(sectionDetail,'href');
        var navName = browser.getText(sectionDetail);

        //Validate the values
        for (var i=0; i<navName.length; i++){
            console.log( i + ":" + navClass[i] + " => " + navLink[i] + " => " + navName[i]);
            expect(navClass[i]).toContain(gtm);
            expect(navLink[i]).not.toEqual('');
            expect(navName[i]).not.toEqual('');
        }

        //Close the hamburger menu
        if (position == 'hamburger') {
            wait(500); // ensure it waits for transition effect to complete
            browser.click(site_nav.siteHamburgerClose);
            wait(500); // ensure the hamburger is closed completely before going to the next step
        }
    });

    this.Then(/^I should see the site navigation links$/, function () {
        var navLink = browser.getText(site_nav.siteNavSection);
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
        expect(browser.isVisible(site_nav.siteNavSection)).toEqual(false);
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

    this.Then(/^I can navigate to all sites in the hamburger navigation menu/, function(dataTable){
        browser.click(site_nav.siteHamburger);
        browser.waitForVisible(site_nav.siteHamburgerDetail, 3000);
        wait(500); // ensure it waits for transition effect to complete
        var rows = dataTable.hashes();

        var menuTitle = browser.getAttribute(site_nav.siteNavLogos, 'title');
        var menuhref = browser.getAttribute(site_nav.siteNavLogos, 'href');
        var menuGTM = browser.getAttribute(site_nav.siteNavLogos, 'class');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(menuTitle[i]).toEqual(row['title']);
            expect(menuhref[i]).toMatch(row['url']);
            expect(menuGTM[i]).toEqual(row['gtm']);
        }
        browser.click(site_nav.siteHamburgerClose);
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

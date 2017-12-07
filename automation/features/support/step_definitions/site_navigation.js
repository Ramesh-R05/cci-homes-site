var site_nav = require('../page_objects/site_navigation_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var uniheader = require('../page_objects/uniheader_widget');
//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var site_domain = nconf.get('URL');

module.exports = function() {

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

    this.Then(/^I can always see the navigation at the top of the screen$/, function () {
        //validate header is at the top even after scrolling
        browser.waitForVisible(site_nav.siteNavSection, 2000);
        browser.scroll(0,500);
        browser.waitForVisible(site_nav.siteNavSection, 2000);
    });

    this.Then(/^I can navigate to our network sites in the hamburger navigation menu/, function(dataTable){
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

    this.Then(/^all top navigation sections have "([^"]*)"$/, function (gtmClass) {
        //main menu
        var menuList = browser.getAttribute(site_nav.siteNavSectionDetail, 'class');
        for (var i = 0; i < menuList.length; ++i) {
        expect(menuList[i]).toEqual(gtmClass);
        }
        //sub headers
        var subMenuList = browser.getAttribute(site_nav.siteNavSectionDetailSub, 'class');
        for (var i = 0; i < subMenuList.length; ++i) {
            expect(subMenuList[i]).toEqual(gtmClass);
        }
    });

    this.Then(/^all hamburger sections have "([^"]*)"$/, function (gtmClass) {
        var menuList = browser.getAttribute(site_nav.siteHamburgerDetail, 'class');
        for (var i = 0; i < menuList.length; ++i) {
            expect(menuList[i]).toEqual(gtmClass);
        }
        //sub headers
        var subMenuList = browser.getAttribute(site_nav.siteHamburgerDetailSub, 'class');
        for (var i = 0; i < subMenuList.length; ++i) {
            expect(subMenuList[i]).toEqual(gtmClass);
        }
    });

    this.Then(/^the navigation homes icon has "([^"]*)"$/, function (gtmClass) {
        var menuClass = browser.getAttribute(site_nav.siteNavHeaderLogo, 'class');
        expect(menuClass).toContain(gtmClass);
    });

    this.Then(/^the menu fades out as I scroll down the page$/, function () {
        expect(browser.isVisible(site_nav.menuHeader)).toBe(true);
        browser.scroll(0,1000);
        wait(500);
        expect(browser.getAttribute(site_nav.menuHeader,'class')).toContain('fade-out');
    });

    this.Then(/^I should see the site header logo to open homepage$/, function () {
        browser.waitForExist(site_nav.smallIconlink, 3000);
        //Validate the logo is clickable to open homepage
        var headerLogoLink = browser.getAttribute(site_nav.smallIconlink,'href');
        expect(headerLogoLink).toEqual(site_domain);
    });
};

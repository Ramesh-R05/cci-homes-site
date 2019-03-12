var site_nav = require('../page_objects/site_navigation_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var site_domain = nconf.get('URL');

module.exports = function() {    

    this.Then(/^I can always see the navigation at the top of the screen$/, function () {
        //validate header is at the top even after scrolling
        browser.waitForVisible(site_nav.siteNavSection, 2000);
        browser.scroll(0,500);
        browser.waitForVisible(site_nav.siteNavSection, 2000);
    });

    this.Then(/^I can navigate to our network sites in the hamburger navigation menu/, function(dataTable){
        browser.click(site_nav.siteHamburger);
        wait(500); // ensure it waits for transition effect to complete
        var rows = dataTable.hashes();

        var menuTitle = browser.getAttribute(site_nav.siteNavLogos, 'title');
        var menuhref = browser.getAttribute(site_nav.siteNavLogos, 'href');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(menuTitle[i]).toEqual(row['title']);
            expect(menuhref[i]).toMatch(row['url']);
        }
        browser.click(site_nav.siteHamburgerClose);
    });    

    this.Then(/^I should see the site header logo to open homepage$/, function () {
        browser.waitForExist(site_nav.smallIconlink, 3000);
        //Validate the logo is clickable to open homepage
        var headerLogoLink = browser.getAttribute(site_nav.smallIconlink,'href');
        if (headerLogoLink.endsWith('/')) {
            headerLogoLink = headerLogoLink.substr(0, headerLogoLink.length - 1);
        }
        expect(site_domain).toContain(headerLogoLink);
    });

    this.When(/^I click on the brands modal button$/, () => {
        browser.waitForExist(site_nav.brandsModalButton, 3000);
        expect(browser.isVisible(site_nav.brandsModalButton)).toBe(true);        
        browser.click(site_nav.brandsModalButton);
    });

    this.Then(/^I can navigate to the brands in the modal$/, (dataTable) => {
        const rows = dataTable.hashes();
        expect(browser.isVisible(site_nav.brandsModal)).toBe(true);

        browser.$$(site_nav.brandsModalLink).forEach((el, index) => {
            const { title, url } = rows[index];
            
            expect(el.getAttribute('href')).toContain(url);
            expect(el.$('img').getAttribute('alt')).toEqual(title);
        });
    });    

    this.When(/^I close the brands modal$/, function () {
        browser.$(site_nav.brandsModalCloseButton).click();
      });

    this.Then(/^I can no longer see the brands modal$/, () => {
        expect(browser.isVisible(site_nav.brandsModal)).toBe(false);
      })
};
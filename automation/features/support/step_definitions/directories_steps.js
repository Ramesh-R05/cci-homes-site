var directories = require('../page_objects/directories_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');

module.exports = function() {

    this.When(/^I can see the site logo and button clickable to open its page$/, function () {
        browser.scroll(directories.siteLogo);
        expect(browser.waitForVisible(directories.siteLogo,5000)).toBe(true);
        expect(browser.waitForVisible(directories.siteButton,5000)).toBe(true);

        var siteLink = browser.getAttribute(directories.siteLogo, 'href');
        expect(siteLink).toContain('http');
    });

    this.When(/^I can see the social icons next to the logo$/, function () {
        expect(browser.waitForVisible(directories.externalLinksFacebook,2000)).toBe(true);
        expect(browser.waitForVisible(directories.externalLinksInstagram,2000)).toBe(true);
        expect(browser.waitForVisible(directories.externalLinksPinterest,2000)).toBe(true);

        var facebookLink = browser.getAttribute(directories.externalLinksFacebook, 'href');
        expect(facebookLink).toContain('www.facebook.com');
        var instagramLink = browser.getAttribute(directories.externalLinksInstagram, 'href');
        expect(instagramLink).toContain('www.instagram.com');
        var pinterestLink = browser.getAttribute(directories.externalLinksPinterest, 'href');
        expect(pinterestLink).toContain('www.pinterest.com');
    });

};


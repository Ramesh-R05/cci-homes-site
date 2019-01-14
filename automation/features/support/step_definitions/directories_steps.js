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

    this.When(/^I can see the directory filters$/, function () {
        browser.scroll(0,0);

        //Below will be removed once we remove the polar ad around the section title
        wait(3000); //wait for 3 seconds to allow ads loaded
        if (browser.isExisting(directories.nativeAd)) {
            browser.scroll(directories.nativeAd);
        } else {
            browser.scroll(directories.sectionTitle);
        }

        //check the filter title
        expect(browser.waitForVisible(directories.filterTitle,5000)).toBe(true);
        expect(browser.getText(directories.filterTitle)).not.toBe('');

        //check the drop down fields
        browser.scroll(directories.filterTitle);
        expect(browser.waitForExist(directories.filterSelectCategory,5000)).toBe(true);
        expect(browser.waitForExist(directories.filterSelectLocation,5000)).toBe(true);

        //check the submit button
        browser.scroll(directories.sectionTitle);
        expect(browser.waitForExist(directories.filterSubmitButton,5000)).toBe(true);
    });



    this.When(/^I can see the directory "([^"]*)" feed on "([^"]*)"$/, function (part, device) {
        var feedTeaserTitle_element;

        switch(part) {
            case 'top':
                if (device === 'desktop' || device === 'tablet landscape' || device === 'tablet portrait') {
                    feedTeaserTitle_element = directories.topFeedTeaserTitle_Desktop;
                } else {
                    feedTeaserTitle_element = directories.topFeedTeaserTitle_Mobile;
                }
                break;
            case 'bottom':
                feedTeaserTitle_element = directories.bottomFeedTeaserTitle;
                break;
        }

        //verify titles of all teasers
        var feedTeaserTitle = browser.getText(feedTeaserTitle_element);
        var feedTeaserTitleLink = browser.getAttribute(feedTeaserTitle_element,'href');
        expect(feedTeaserTitle).not.toEqual('');
        expect(feedTeaserTitleLink).not.toEqual('');
    });


};


var lipstick = require('../page_objects/lipstick_widget');
var world = require('../world');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');

module.exports = function() {

    this.When(/^I should see the latest video element$/, function () {
        expect(browser.isVisible(lipstick.latestVideoHeading)).toBe(true);
    });

    this.Then(/^I should see (\d+) video items$/, function (itemCount) {
        var itemImageLink = browser.getAttribute(lipstick.latestVideoItemImage,'href');
        var itemTitleLink = browser.getAttribute(lipstick.latestVideoItemTitle,'href');
        var itemTitle = browser.getText(lipstick.latestVideoItemTitle);

        //check the number of items
        expect(itemImageLink.length).toEqual(parseInt(itemCount),10);

        //check the image link, the title link, and the title
        expect(itemImageLink[0]).not.toBe('');
        expect(itemTitleLink[1]).not.toBe('');
        expect(itemTitle[2]).not.toBe('');
    });

    this.When(/^I should see the brand switcher element$/, function () {
        expect(browser.isVisible(lipstick.featuredBrandsHeading)).toBe(true);
        expect(browser.isVisible(lipstick.featuredBrandsSwitcher)).toBe(true);
    });

    this.Then(/^I should see (\d+) featured brand items$/, function (itemCount) {
        var itemImageLink = browser.getAttribute(lipstick.featuredBrandsItemImage,'href');
        var itemTitleLink = browser.getAttribute(lipstick.featuredBrandsItemTitle,'href');
        var itemTitle = browser.getText(lipstick.featuredBrandsItemTitle);

        //check the number of items
        expect(itemImageLink.length).toEqual(parseInt(itemCount),10);

        //check the image link, the title link, and the title
        expect(itemImageLink[0]).not.toBe('');
        expect(itemTitleLink[1]).not.toBe('');
        expect(itemTitle[2]).not.toBe('');
    });

};

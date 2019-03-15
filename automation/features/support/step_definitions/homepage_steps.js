var home = require('../page_objects/homepage_widget');
var world = require('../world');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var loadMore = require('../page_objects/loadmore_widget');
var validateImageURL = require('../../../node_modules/@bxm/automation/lib/utils/validateImageURL');

module.exports = function(){

    this.When(/^I should see the homepage hero element$/, function () {
        expect(browser.isVisible(home.heroElmt)).toBe(true);
    });

    this.When(/^I should see the homepage hero image$/, function () {
        var heroImgUrl = browser.getAttribute(home.heroImgUrl, 'src');
        validateImageURL(heroImgUrl);
    });

    this.When(/^The homepage hero image should be clickable to open its page$/, function () {
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroImgLink).not.toBeUndefined();
    });

    this.When(/^The homepage hero title should be clickable to open its page$/, function () {
        var heroTitleLink = browser.getAttribute(home.heroTitleLink, 'href');
        expect(heroTitleLink).not.toBeUndefined();
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroTitleLink).toEqual(heroImgLink);
    });

    this.When(/^I should see the homepage hero containing its tag and clickable to open its page$/, function () {
        var heroTags = browser.getText(home.heroTag);
        expect(heroTags).not.toEqual('');
    });

    this.When(/^I should see (\d+) top teasers on the homepage page$/, function (number) {
        var topTeasers = browser.getAttribute(home.topTeasers,'data-reactid');
        expect(topTeasers.length).toEqual(parseInt(number),10);
    });

    this.When(/^I should see (\d+) bottom teasers on the homepage page$/, function (number) {
        var bottomTeasers = browser.getAttribute(home.bottomTeasers,'data-reactid');
        expect(bottomTeasers.length).toEqual(parseInt(number),10);
    });

    this.When(/^I should see a "([^"]*)" feed item containing its image and clickable to open its page$/, function (part) {
        const { topFeedTeaserImg, topFeedTeaserImgLink, bottomFeedTeaserImg, bottomFeedTeaserImgLink  } = home;
        /* wait for polar to replace teasers */
        wait(6000);

        const { feedTeaserImg_element, feedTeaserImgLink_element } = {
            top: {
                feedTeaserImg_element: browser.$$(topFeedTeaserImg)[4],
                feedTeaserImgLink_element: browser.$$(topFeedTeaserImgLink)[4]
            },
            bottom: {
                feedTeaserImg_element: browser.$$(bottomFeedTeaserImg)[5],
                feedTeaserImgLink_element: browser.$$(bottomFeedTeaserImgLink)[5]
            }
        }[part]

        //verify images of all teasers
        const feedTeaserImgUrl = feedTeaserImg_element.getAttribute('data-srcset');
        const feedTeaserImgLink = feedTeaserImgLink_element.getAttribute('href');        
        
        validateImageURL(feedTeaserImgUrl);
        expect(feedTeaserImgLink).not.toEqual('');
    });

    this.When(/^I should see a "([^"]*)" feed item containing its title and clickable to open its page$/, function (part) {
        var feedTeaserTitle_element, i;

        switch(part) {
            case 'top':
                feedTeaserTitle_element = home.topFeedTeaserTitle;
                i = 4; //Test the 5th item which is array no.4
                break;
            case 'bottom':
                feedTeaserTitle_element = home.bottomFeedTeaserTitle;
                i = 5; //Test the 6th item which is array no.5
                break;
        }

        //verify titles of all teasers        
        var feedTeaserTitle = browser.getText(feedTeaserTitle_element);
        var feedTeaserTitleLink = browser.getAttribute(feedTeaserTitle_element,'href');
        expect(feedTeaserTitle[i]).not.toEqual('');
        expect(feedTeaserTitleLink[i]).not.toEqual('');
    });

    this.When(/^I should see a "([^"]*)" feed item containing its tag and clickable to open its page$/, function (pageLocation) {
        const { topFeedTeaserTag, bottomFeedTeaserTag } = home;
        const topFeedItemIndex = 4;
        const bottomFeedItemIndex = 5;

        const feedTeaserTagElement = {
            top: browser.$$(topFeedTeaserTag)[topFeedItemIndex],
            bottom: browser.$$(bottomFeedTeaserTag)[bottomFeedItemIndex]
        }[pageLocation]
        

        //verify tag of a teaser
        const feedTeaserTagText = feedTeaserTagElement.getText();
        const feedTeaserTagLink = feedTeaserTagElement.getAttribute('href');
        
        expect(feedTeaserTagText).not.toEqual('');
        expect(feedTeaserTagLink).not.toEqual('');
    });

    this.Then(/^I should not see the homepage hero source$/, function () {
        var heroSource = browser.isVisible(home.heroSource);
        expect(heroSource).toBe(false);
    });

    //------------------- for mobile

    this.When(/^I should see the homepage mobile hero element$/, function () {
        expect(browser.isVisible(home.mobHeroElmt)).toBe(true);
    });

    this.When(/^The homepage mobile hero image should be clickable to open its page$/, function () {
        var heroImgLink = browser.getAttribute(home.mobHeroImgLink, 'href');
        expect(heroImgLink).not.toBeUndefined();
    });

    this.When(/^The homepage mobile hero title should be clickable to open its page$/, function () {
        var heroTitleLink = browser.getAttribute(home.mobHeroTitleLink, 'href');
        expect(heroTitleLink).not.toBeUndefined();
        var heroImgLink = browser.getAttribute(home.mobHeroImgLink, 'href');
        expect(heroTitleLink).toEqual(heroImgLink);
    });

    this.When(/^I should see the homepage mobile hero containing its tag and clickable to open its page$/, function () {
        var heroTags = browser.getText(home.mobHeroTag);
        expect(heroTags).not.toEqual('');
    });

    this.Then(/^I should see hero content primary tag "([^"]*)"$/, function (tagTxt) {
        var pTagText = browser.getText(home.primaryHeroTag);
        expect(pTagText).toEqual(tagTxt)
    });

    this.Then(/^I should see hero content secondary tag "([^"]*)"$/, function (tagTxt) {
        var sTagText = browser.getText(home.secondaryHeroTag);
        expect(sTagText).toEqual(tagTxt)
    });

    this.Then(/^I should see mobile hero content primary tag "([^"]*)"$/, function (tagTxt) {
        var pTagText = browser.getText(home.mobPrimaryHeroTag);
        expect(pTagText).toEqual(tagTxt)
    });

    this.Then(/^I should see mobile hero content secondary tag "([^"]*)"$/, function (tagTxt) {
        var sTagText = browser.getText(home.mobSecondaryHeroTag);
        expect(sTagText).toEqual(tagTxt)
    });

    this.When(/^I should see a load more feed item containing its image and clickable to open its page$/, function () {
        //verify images of one teaser
        var loadMoreFeedTeaserImgUrl = browser.getAttribute(home.loadMoreFeedTeaserImg,'data-srcset');
        var loadMoreFeedTeaserImgLink = browser.getAttribute(home.loadMoreFeedTeaserImgLink,'href');
        validateImageURL(loadMoreFeedTeaserImgUrl);
        expect(loadMoreFeedTeaserImgLink).not.toEqual('');
    });    
};

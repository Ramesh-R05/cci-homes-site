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
        var feedTeaserImg_element, feedTeaserImgLink_element, i;

        switch(part) {
            case 'top':
                feedTeaserImg_element = home.topFeedTeaserImg;
                feedTeaserImgLink_element = home.topFeedTeaserImgLink;
                i = 4; //Test the 5th item which is array no.4
                break;
            case 'bottom':
                feedTeaserImg_element = home.bottomFeedTeaserImg;
                feedTeaserImgLink_element = home.bottomFeedTeaserImgLink;
                i = 5; //Test the 6th item which is array no.5
                break;
        }

        //verify images of all teasers
        var feedTeaserImgUrl = browser.getAttribute(feedTeaserImg_element,'data-srcset');
        var feedTeaserImgLink = browser.getAttribute(feedTeaserImgLink_element,'href');
        validateImageURL(feedTeaserImgUrl[i]);
        expect(feedTeaserImgLink[i]).not.toEqual('');
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

    this.When(/^I should see a "([^"]*)" feed item containing its tag and clickable to open its page$/, function (part) {
        var feedTeaserTag_element, i;

        switch(part) {
            case 'top':
                feedTeaserTag_element = home.topFeedTeaserTag;
                i = 4; //Test the 5th item which is array no.4
                break;
            case 'bottom':
                feedTeaserTag_element = home.bottomFeedTeaserTag;
                i = 5; //Test the 6th item which is array no.5
                break;
        }

        //verify tag of a teaser
        var feedTeaserTag = browser.getText(feedTeaserTag_element);
        var feedTeaserTagLink = browser.getAttribute(feedTeaserTag_element,'href');
        expect(feedTeaserTag[i]).not.toEqual('');
        expect(feedTeaserTagLink[i]).not.toEqual('');
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

    this.Then(/^User will be provided with (\d+) "([^"]*)"$/, function (imageCount, sectionTitle) {
        //Validate the title is correct
        expect(browser.getText(home.latestHomeTitle)).toEqual(sectionTitle);

        //Validate that 4 latest real home teasers
        var latestHomeTeasers = browser.getAttribute(home.latestHomeTeasers,'class');
        expect(latestHomeTeasers.length).toEqual(parseInt(imageCount),10);
    });

    this.Then(/^each image will display text and be opaque when hover$/, function () {
        var latestHomeTeasers = browser.elements(home.latestHomeTeasers).value;
        for (var i = 0; i < latestHomeTeasers.length; ++i) {
            // simulating hover on the latest home teaser
            browser.moveToObject(home.latestHomeTeasers+':nth-child('+(i+1)+') img');
            wait(1000);
            // validating the opacity of the teaser
            var opacityProperty = browser.getCssProperty(home.latestHomeTeasers+':nth-child('+(i+1)+') h2','opacity');
            expect(opacityProperty.value).not.toEqual(0);
            console.log("Opacity value is :"+opacityProperty.value);
            // validating the text after the hover is correct and not empty
            var elmTitle = browser.getText(home.latestHomeTeasers+':nth-child('+(i+1)+') h2');
            console.log(elmTitle);
            expect(elmTitle).not.toEqual('');
        }
    });

    this.When(/^I should see a load more feed item containing its image and clickable to open its page$/, function () {
        //verify images of one teaser
        var loadMoreFeedTeaserImgUrl = browser.getAttribute(home.loadMoreFeedTeaserImg,'data-srcset');
        var loadMoreFeedTeaserImgLink = browser.getAttribute(home.loadMoreFeedTeaserImgLink,'href');
        validateImageURL(loadMoreFeedTeaserImgUrl);
        expect(loadMoreFeedTeaserImgLink).not.toEqual('');
    });    
};

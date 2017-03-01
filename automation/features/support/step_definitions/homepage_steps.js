var home = require('../page_objects/homepage_widget');
var world = require('../world');
var wait = require('../utils/wait');
var loadMore = require('../page_objects/loadmore_widget');

module.exports = function(){

    this.When(/^I should see the homepage hero element$/, function () {
        expect(browser.isVisible(home.heroElmt)).toBe(true);
    });
    this.When(/^I should see the homepage hero image$/, function () {
        var heroImgUrl = browser.getAttribute(home.heroImgUrl, 'src');
        expect(heroImgUrl).not.toBeUndefined();
        console.log(heroImgUrl);
    });
    this.When(/^The homepage hero image should be clickable to open its page$/, function () {
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroImgLink).not.toBeUndefined();
        console.log(heroImgLink);
    });
    this.When(/^I should see the homepage hero title$/, function () {
        var heroImgTitle = browser.getText(home.heroTitle);
        expect(heroImgTitle).not.toBeUndefined();
        console.log(heroImgTitle);
    });
    this.When(/^The homepage hero title should be clickable to open its page$/, function () {
        var heroTitleLink = browser.getAttribute(home.heroTitleLink, 'href');
        expect(heroTitleLink).not.toBeUndefined();
        var heroImgLink = browser.getAttribute(home.heroImgLink, 'href');
        expect(heroTitleLink).toEqual(heroImgLink);
        console.log(heroTitleLink);
    });
    this.When(/^I should see the homepage hero short teaser$/, function () {
        var herShortTeaser = browser.getText(home.heroShortTeaser);
        expect(herShortTeaser).not.toBeUndefined();
        console.log(herShortTeaser);
    });

    this.When(/^I should see the homepage hero containing its tag and clickable to open its page$/, function () {
        var heroTags = browser.getText(home.heroTag);
            console.log("Hero image tags are "+heroTags.length + ": " + heroTags);
        expect(heroTags).not.toEqual('');
        });
    this.When(/^I should see (\d+) top teasers on the homepage page$/, function (number) {
        var topTeasers = browser.getAttribute(home.topTeasers,'data-reactid');
        console.log("top "+number+" teser Ids: "+'\n'+topTeasers);
        expect(topTeasers.length).toEqual(parseInt(number),10);
    });
    this.When(/^I should see each top teaser containing its image and is clickable to open its page$/, function () {
        var topTeaserImgsCount = browser.elements(home.topTeaserImgs).value.length;
        console.log("Teaser images count: "+topTeaserImgsCount);
        var topTeaserImgsUrl = browser.getAttribute(home.topTeaserImgs, 'data-srcset');
        for(var i=0; i<topTeaserImgsUrl.length; i++){
            expect(topTeaserImgsUrl[i]).not.toBeUndefined();
            console.log("top 10 teaser urls are: "+'\n'+topTeaserImgsUrl[i]);
        }
    });
    this.When(/^I should see each top teaser containing its title and is clickable to open its page$/, function () {
        var topTeaserTitleCount = browser.elements(home.topTeaserTitles).value.length;
        console.log("Teaser Titles count: "+topTeaserTitleCount);
        var topTeaserTitles = browser.getText(home.topTeaserTitles);
        console.log(topTeaserTitles);
        var topTeaserTitleUrl = browser.getAttribute(home.topTeaserImgs, 'data-srcset');
        for(var i=0; i<topTeaserTitleUrl.length; i++){
            expect(topTeaserTitleUrl[i]).not.toBeUndefined();
           }
    });
    this.When(/^I should see each top teaser containing its tag and is clickable to open its page$/, function () {
        var topTeaserTags = browser.getText(home.topTeaserTags);
        console.log("Teaser Tags are: "+topTeaserTags);
        var topTeaserTagsUrl = browser.getAttribute(home.topTeaserTagLinks, 'href');
        for(var i=0; i<topTeaserTagsUrl.length; i++){
            expect(topTeaserTagsUrl[i]).not.toBeUndefined();
            console.log(topTeaserTagsUrl[i]);
            }
    });
    this.When(/^I should see each bottom teaser containing its image and is clickable to open its page$/, function () {
        var topTeaserImgsCount = browser.elements(home.bottomTeaserImgs).value.length;
        console.log("Teaser images count: "+topTeaserImgsCount);
        var topTeaserImgsUrl = browser.getAttribute(home.bottomTeaserImgs, 'data-srcset');
        for(var i=0; i<topTeaserImgsUrl.length; i++){
            expect(topTeaserImgsUrl[i]).not.toBeUndefined();
            console.log("top teaser urls are: "+'\n'+topTeaserImgsUrl[i]);
        }
    });
    this.When(/^I should see each bottom teaser containing its title and is clickable to open its page$/, function () {
        var topTeaserTitleCount = browser.elements(home.bottomTeaserTitles).value.length;
        console.log("Teaser Titles count: "+topTeaserTitleCount);
        var topTeaserTitles = browser.getText(home.bottomTeaserTitles);
        console.log(topTeaserTitles);
        var topTeaserTitleUrl = browser.getAttribute(home.bottomTeaserImgs, 'data-srcset');
        for(var i=0; i<topTeaserTitleUrl.length; i++){
            expect(topTeaserTitleUrl[i]).not.toBeUndefined();
        }
    });
    this.When(/^I should see each bottom teaser containing its tag and is clickable to open its page$/, function () {
        var topTeaserTags = browser.getText(home.bottomTeaserTags);
        console.log("Teaser Tags are: "+topTeaserTags);
        var topTeaserTagsUrl = browser.getAttribute(home.bottomTeaserTagLinks, 'href');
        for(var i=0; i<topTeaserTagsUrl.length; i++){
            expect(topTeaserTagsUrl[i]).not.toBeUndefined();
            console.log(topTeaserTagsUrl[i]);
        }
    });
    this.Then(/^I should not see the homepage hero source$/, function () {
        var heroSource = browser.isVisible(home.heroSource);
        expect(heroSource).toBe(false);
        console.log("homepage hero source has been removed");
    });


    //-------------------

    this.When(/^I should see the homepage mobile hero element$/, function () {
        expect(browser.isVisible(home.mobHeroElmt)).toBe(true);
    });
    this.When(/^I should see the homepage mobile hero image$/, function () {
        var heroImgUrl = browser.getAttribute(home.mobHeroImgUrl, 'src');
        expect(heroImgUrl).not.toBeUndefined();
        console.log(heroImgUrl);
    });
    this.When(/^The homepage mobile hero image should be clickable to open its page$/, function () {
        var heroImgLink = browser.getAttribute(home.mobHeroImgLink, 'href');
        expect(heroImgLink).not.toBeUndefined();
        console.log(heroImgLink);
    });
    this.When(/^I should see the homepage mobile hero title$/, function () {
        var heroImgTitle = browser.getText(home.mobHeroTitle);
        expect(heroImgTitle).not.toBeUndefined();
        console.log(heroImgTitle);
    });
    this.When(/^The homepage mobile hero title should be clickable to open its page$/, function () {
        var heroTitleLink = browser.getAttribute(home.mobHeroTitleLink, 'href');
        expect(heroTitleLink).not.toBeUndefined();
        var heroImgLink = browser.getAttribute(home.mobHeroImgLink, 'href');
        expect(heroTitleLink).toEqual(heroImgLink);
        console.log(heroTitleLink);
    });
    this.When(/^I should see the homepage mobile hero short teaser$/, function () {
        var herShortTeaser = browser.getText(home.mobHeroShortTeaser);
        expect(herShortTeaser).not.toBeUndefined();
        console.log(herShortTeaser);
    });

    this.When(/^I should see the homepage mobile hero containing its tag and clickable to open its page$/, function () {
        var heroTags = browser.getText(home.mobHeroTag);
        console.log("Hero image tags are "+heroTags.length + ": " + heroTags);
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

    this.Given(/^the below position top teasers are replaced with polar ads$/, function (table) {
        browser.waitForExist('.teaser--polar', 3000);
        var listOfItems = browser.getAttribute(home.topTeasers, 'class');
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['pos']);
            console.log(listOfItems[row['pos']-1]);
            expect(listOfItems[row['pos']-1]).toContain('polar');}
    });

    this.Given(/^the below position bottom teasers are replaced with polar ads$/, function (table) {
        browser.waitForExist('.teaser--polar', 3000);
        var listOfItems = browser.getAttribute(home.bottomTeasers, 'class');
        console.log(listOfItems.length);
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['pos']);
            console.log(listOfItems[row['pos']-1]);

            expect(listOfItems[row['pos']-1]).toContain('polar');}
    });

    this.Given(/^the below position added more teasers are replaced with polar ads$/, function (table) {
        browser.waitForExist('.teaser--polar', 3000);
        var listOfItems = browser.getAttribute(home.loadMoreFeed, 'class');
        console.log(listOfItems.length);
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['pos']);
            console.log(listOfItems[row['pos']-1]);

            expect(listOfItems[row['pos']-1]).toContain('polar');}
    });

    this.Then(/^I can see the sticky ad when the top banner disappears from view in homepage$/, function () {
        //Scroll through the page to confirm is sticky
        expect(browser.isVisible(home.stickyMobileBanner)).toBe(false);
        browser.scroll(0, 1500);
        expect(browser.waitForVisible(home.stickyMobileBanner, 2000)).toBe(true);
        browser.scroll(1500, 2500);
        expect(browser.waitForVisible(home.stickyMobileBanner, 2000)).toBe(true);

    });

    this.Then(/^I can see the sticky ad on the homepage page$/, function () {
        browser.moveToObject(loadMore.loadMoreButton);
        browser.waitForVisible(home.stickyMobileBanner,3000);
    });

};

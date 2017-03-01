var sectionPage = require('../page_objects/section_page');
var world = require('../world');
var loadMore = require('../page_objects/loadmore_widget');

module.exports = function(){

    this.Then(/^I should see the section title "([^"]*)"$/, function (titleTxt) {
        expect(browser.getText(sectionPage.sectionTitle)).toEqual(titleTxt);
    });
    this.Then(/^I should see (\d+) top teasers on the top feed section page$/, function (teaserCount) {
        var topTeasers = browser.getAttribute(sectionPage.sectionTopFeedTeaser,'data-reactid');
        console.log("top "+teaserCount+" teser");
        expect(topTeasers.length).toEqual(parseInt(teaserCount),10);
    });
    this.Then(/^every top teaser image takes the user to the content page$/, function () {
        var topTeaserImgsCount = browser.elements(sectionPage.sectionTopFeedTeaserImg).value.length;
        console.log("Teaser images count: "+topTeaserImgsCount);
        var topTeaserImgsUrl = browser.getAttribute(sectionPage.sectionTopFeedTeaserImg, 'href');
        for(var i=0; i<topTeaserImgsUrl.length; i++) {
            expect(topTeaserImgsUrl[i]).not.toBeUndefined();
            console.log("top teaser urls are: " + '\n' + topTeaserImgsUrl[i]);
        }
    });
    this.Then(/^every top teaser title takes the user to the content page$/, function () {
        var topTeaserTitles = browser.getText(sectionPage.sectionTopFeedTeaserTitle);
        console.log("Teaser Titles are: "+topTeaserTitles);

        var topTeaserTitlesUrls = browser.getAttribute(sectionPage.sectionTopFeedTeaserTitle+' a', 'href');
        for(var i=0; i<topTeaserTitlesUrls.length; i++) {
            expect(topTeaserTitlesUrls[i]).not.toBeUndefined();
            console.log("top teaser urls are: " + '\n' + topTeaserTitlesUrls[i]);
        }
    });
    this.Then(/^every top teaser has a source tag$/, function () {
        var topTeaserTags = browser.getText(sectionPage.sectionTopFeedTeaserSource);
        for(var i=0; i<topTeaserTags.length; i++) {
            expect(topTeaserTags[i]).not.toBeUndefined();
            console.log("top teaser Source Tags are: " + '\n' + topTeaserTags[i]);
        }
    });
    this.Then(/^the tag is a link to a page with all content tagged with it$/, function () {
        var topTeaserTagsUrls = browser.getAttribute(sectionPage.sectionTopFeedTeaserSource+' a', 'href');
        for(var i=0; i<topTeaserTagsUrls.length; i++) {
            expect(topTeaserTagsUrls[i]).not.toBeUndefined();
            expect(topTeaserTagsUrls[i]).toContain(world.Urls.home_page);
            console.log("top teaser Source URLs are: " + '\n' + topTeaserTagsUrls[i]);
        }
    });


//    Bottom Feed
    this.Then(/^I should see (\d+) top teasers on the bottom feed section page$/, function (teaserCount) {
        var topTeasers = browser.getAttribute(sectionPage.sectionRepeatableSectionTeaser,'data-reactid');
        console.log("top "+teaserCount+" teser");
        expect(topTeasers.length).toEqual(parseInt(teaserCount),10);
    });

    this.Then(/^every bottom teaser image takes the user to the content page$/, function () {
        var topTeaserImgsCount = browser.elements(sectionPage.sectionRepeatableSectionTeaserImg).value.length;
        console.log("Teaser images count: "+topTeaserImgsCount);
        var topTeaserImgsUrl = browser.getAttribute(sectionPage.sectionRepeatableSectionTeaserImg, 'href');
        for(var i=0; i<topTeaserImgsUrl.length; i++) {
            expect(topTeaserImgsUrl[i]).not.toBeUndefined();
            console.log("bottom teaser urls are: " + '\n' + topTeaserImgsUrl[i]);
        }
    });
    this.Then(/^every bottom teaser title takes the user to the content page$/, function () {
        var topTeaserTitles = browser.getText(sectionPage.sectionRepeatableSectionTeaserTitle);
        console.log("Teaser Titles are: "+topTeaserTitles);

        var topTeaserTitlesUrls = browser.getAttribute(sectionPage.sectionRepeatableSectionTeaserTitle+' a', 'href');
        for(var i=0; i<topTeaserTitlesUrls.length; i++) {
            expect(topTeaserTitlesUrls[i]).not.toBeUndefined();
            console.log("top teaser urls are: " + '\n' + topTeaserTitlesUrls[i]);
        }
    });
    this.Then(/^every bottom teaser has a source tag$/, function () {
        var topTeaserTags = browser.getText(sectionPage.sectionRepeatableSectionTeaserSource);
        for(var i=0; i<topTeaserTags.length; i++) {
            expect(topTeaserTags[i]).not.toBeUndefined();
            console.log("top teaser Source Tags are: " + '\n' + topTeaserTags[i]);
        }
    });
    this.Then(/^the bottom teaser tag is a link to a page with all content tagged with it$/, function () {
        var topTeaserTagsUrls = browser.getAttribute(sectionPage.sectionRepeatableSectionTeaserSource+' a', 'href');
        for(var i=0; i<topTeaserTagsUrls.length; i++) {
            expect(topTeaserTagsUrls[i]).not.toBeUndefined();
            expect(topTeaserTagsUrls[i]).toContain(world.Urls.home_page);
            console.log("top teaser Source URLs are: " + '\n' + topTeaserTagsUrls[i]);
        }
    });

    //Load More content
    this.Then(/^I should see extra (\d+) top teasers on the loaded feed section page$/, function (teaserCount) {
        var extraTeasers = browser.elements(sectionPage.sectionRepeatableSectionTeaser).value.length;
        console.log("extra "+extraTeasers+" teser");
        //need to check how to improve the below validation
        //expect(extraTeasers-6).toEqual(parseInt(teaserCount),10);
    });

    this.Given(/^the below position top teasers are replaced with polar ads in section page$/, function (table) {
        browser.waitForExist('.teaser--polar', 3000);
        var listOfItems = browser.getAttribute(sectionPage.sectionTopTeasers, 'class');
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['pos']);
            console.log(listOfItems[row['pos']-1]);
            expect(listOfItems[row['pos']-1]).toContain('polar');}
    });

    this.Given(/^the below position bottom teasers are replaced with polar ads in section page$/, function (table) {
        browser.waitForExist('.teaser--polar', 3000);
        var listOfItems = browser.getAttribute(sectionPage.sectionBottomTeasers, 'class');
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['pos']);
            console.log(listOfItems[row['pos']-1]);
            expect(listOfItems[row['pos']-1]).toContain('polar');}
    });

    this.Given(/^the below position added more teasers are replaced with polar ads in section page$/, function (table) {
        browser.waitForExist('.teaser--polar', 3000);
        var listOfItems = browser.getAttribute(sectionPage.sectionLoadMoreFeed, 'class');
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['pos']);
            console.log(listOfItems[row['pos']-1]);
            expect(listOfItems[row['pos']-1]).toContain('polar');}
    });

    this.Then(/^I can see the sticky ad when the top banner disappears from view in section page$/, function () {
        //Scroll through the page to confirm is sticky
        expect(browser.isVisible(sectionPage.sectionStickyMobileBanner)).toBe(false);
        browser.scroll(0, 1500);
        expect(browser.waitForVisible(sectionPage.sectionStickyMobileBanner, 2000)).toBe(true);
        browser.scroll(1500, 2000);
        expect(browser.waitForVisible(sectionPage.sectionStickyMobileBanner, 2000)).toBe(true);

    });

    this.Then(/^I can see the sticky ad on the section page$/, function () {
        //browse to next loadmore button and check sticky mobile banner
        browser.moveToObject(loadMore.loadMoreButton);
        browser.waitForVisible(sectionPage.sectionStickyMobileBanner,3000);

    });

};


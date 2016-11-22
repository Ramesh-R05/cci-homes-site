var home = require('../page_objects/homepage_widget');
var world = require('../world');

module.exports = function(){

    this.When(/^I should see the homepage hero element$/, function () {
    expect(browser.isVisible(home.heroImg)).toBe(true);
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
    this.When(/^I should see the homepage hero source and it should be clickable$/, function () {
        var heroSource = browser.getText(home.heroSource);
        expect(heroSource).not.toBeUndefined();
        console.log(heroSource);
        var heroSourceLink = browser.getAttribute(home.heroSourceLink, 'href');
        expect(heroSourceLink).not.toEqual('');
        });

    this.When(/^I should see the homepage hero containing its tag and clickable to open its page$/, function () {
        var heroTags = browser.getText(home.heroTag);
            console.log("Hero image tags are "+heroTags.length + ": " + heroTags);
        expect(heroTags).not.toEqual('');
        });
    this.When(/^I should see (\d+) top teasers on the homepage page$/, function (number) {
        var topTeasers = browser.getAttribute(home.topTeasers,'data-reactid');
        console.log("top 10 teser Ids: "+'\n'+topTeasers);
        expect(topTeasers.length).toEqual(parseInt(number),10);
    });
    this.When(/^I should see each top teaser containing its image and clickable to open its page$/, function () {
        var topTeaserImgsCount = browser.elements(home.topTeaserImgs).value.length;
        console.log("Teaser images count: "+topTeaserImgsCount);
        var topTeaserImgsUrl = browser.getAttribute(home.topTeaserImgs, 'data-srcset');
        for(var i=0; i<topTeaserImgsUrl.length; i++){
            expect(topTeaserImgsUrl[i]).not.toBeUndefined();
            console.log("top 10 teaser urls are: "+'\n'+topTeaserImgsUrl[i]);
        }
    });
    this.When(/^I should see each top teaser containing its title and clickable to open its page$/, function () {
        var topTeaserTitleCount = browser.elements(home.topTeaserTitles).value.length;
        console.log("Teaser Titles count: "+topTeaserTitleCount);
        var topTeaserTitles = browser.elements(home.topTeaserTitles).getText();
        console.log(topTeaserTitles);
        var topTeaserTitleUrl = browser.getAttribute(home.topTeaserImgs, 'data-srcset');
        for(var i=0; i<topTeaserTitleUrl.length; i++){
            expect(topTeaserTitleUrl[i]).not.toBeUndefined();
           }
    });
    this.When(/^I should see each top teaser containing its tag and clickable to open its page$/, function () {
        var topTeaserTags = browser.elements(home.topTeaserTags).getText();
        console.log("Teaser Tags are: "+topTeaserTags);
        var topTeaserTagsUrl = browser.getAttribute(home.topTeaserTagLinks, 'href');
        for(var i=0; i<topTeaserTagsUrl.length; i++){
            expect(topTeaserTagsUrl[i]).not.toBeUndefined();
            console.log(topTeaserTagsUrl[i]);
            }
    });
};

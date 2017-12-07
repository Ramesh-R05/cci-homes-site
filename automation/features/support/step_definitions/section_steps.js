var sectionPage = require('../page_objects/section_page');
var world = require('../world');
var loadMore = require('../page_objects/loadmore_widget');

module.exports = function(){

    this.Then(/^I should see the section title "([^"]*)"$/, function (titleTxt) {
        expect(browser.getText(sectionPage.sectionTitle)).toEqual(titleTxt);
    });

    this.Then(/^I should see (\d+) top teasers on the feed section page$/, function (teaserCount) {
        var topTeasers = browser.getAttribute(sectionPage.sectionTopFeedTeaser,'data-reactid');
        expect(topTeasers.length).toEqual(parseInt(teaserCount),10);
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
    this.Then(/^I should see (\d+) bottom teasers on the feed section page$/, function (teaserCount) {
        var bottomTeasers = browser.getAttribute(sectionPage.sectionRepeatableSectionTeaser,'data-reactid');
        expect(bottomTeasers.length).toEqual(parseInt(teaserCount),10);
    });

    //Load More content
    this.Then(/^I should see extra (\d+) teasers after loading more$/, function (teaserCount) {
        var extraTeasers = browser.elements(sectionPage.sectionRepeatableSectionTeaserAfterLoadMore).value.length;
        expect(extraTeasers).toEqual(parseInt(teaserCount),10);
    });

};


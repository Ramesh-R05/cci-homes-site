
var wn_ads = require('../page_objects/ads_widget');
var gallery = require('../page_objects/gallery_widget');
var wait = require('../utils/wait');
module.exports = function() {

    this.Then(/^I should see leaderboard ad slots at top middle and bottom$/, function () {
       var topAdSlot = browser.elements(wn_ads.leaderBoard, 5000);
        expect((topAdSlot.value.length)).toEqual(1);
        var midAdSlot = browser.elements(wn_ads.midLeaderBoard, 5000);
        expect((midAdSlot.value.length)).toEqual(1);
        var bottomAdSlot = browser.elements(wn_ads.bottomLeaderBoard, 5000);
        expect((bottomAdSlot.value.length)).toEqual(1);

    });
    this.Given(/^I should see sticky MREC ad next to the top news feed$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
       browser.scroll(0,500);
       //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.topFeedMrec)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,900);
        browser.scroll(0,1500);
        expect(browser.isVisible(wn_ads.topFeedMrec)).toBe(true);
        expect(browser.getAttribute(wn_ads.mrecTopFeedSticky, 'style')).toContain("fixed");
    });
    this.Given(/^I should see sticky MREC ad next to the bottom news feed$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,2200);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.topFeedMrec)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        wait(3000);
        browser.scroll(0,2700);
        browser.scroll(0,3000);
        expect(browser.isVisible(wn_ads.bottomFeedMrec)).toBe(true);
        expect(browser.getAttribute(wn_ads.mrecBottomFeedSticky, 'style')).toContain("fixed");
    });
    this.Then(/^I should see (\d+) mrec ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.mrec, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) middle leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.middleLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) middle mrec ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.middleMrec, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) top leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleTopLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) bottom leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleBottomLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) mrec ad slots in LHS feed$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleLHSMrec, 6000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) mrec ad slots above recommendation$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleBottomMrec, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) top mobile banner ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.topMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) top mobile banner ad slots under short teaser$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.homesTopMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see (\d+) bottom leaderboard ad slots above recommendation$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.homesBottomMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });
    this.Then(/^I should see the top leaderboard ad above the gallery slide$/, function () {
        expect(browser.isVisible(wn_ads.galleryAdTopLeaderBoard)).toBe(true);
    });

    this.Then(/^I should see the bottom leaderboard ad under the gallery slide$/, function () {
        expect(browser.isVisible(wn_ads.galleryAdBottomLeaderBoard)).toBe(true);
    });
    this.Then(/^I should not see the MREC ad at the bottom right of the gallery$/, function () {
        expect(browser.isVisible(wn_ads.adMrecBottomRightGallery)).toBe(false);
    });
    this.Then(/^I should see the MREC ad at the bottom right of the gallery$/, function () {
        expect(browser.isVisible(wn_ads.adMrecBottomRightGallery)).toBe(true);
    });

    this.Then(/^I should see the MREC ad after the (\d+) slide$/, function (slide) {
        //Go to the MREC slide
        for (var i=0; i<slide; i++){
            browser.click(gallery.galleryNextButton);
        }
        //Validate
        browser.waitForVisible(wn_ads.adMrecInSlideGallery,3000);
        expect(browser.isVisible(wn_ads.adMrecInSlideGallery)).toBe(true);
    });

    //BELOW ARE THE STEPS TO TEST WALLPAPER, SIDE PANEL, OUT OF PAGE ADs
    this.Then(/^I should "([^"]*)" the wallpaper ad slot on "([^"]*)"$/, function (visibility, page) {
        //Identify the element
        switch(visibility) {
            case 'see':
                var valueVisible = true
                break;
            case 'not see':
                var valueVisible = false
                break;
        }
        switch(page) {
            case 'homepage':
            case 'section':
            case 'brand':
                var adWallpaper = wn_ads.adWallpaperBrandPage
                break;
            //case 'article':
            //    var adWallpaper = wn_ads.adWallpaperBrandPage
            //    break;
            //case 'gallery':
            //    var adWallpaper = wn_ads.adWallpaperBrandPage
            //    break;
        }

        //Validate
        expect(browser.isVisible(adWallpaper)).toBe(valueVisible);
    });

    this.Then(/^I should "([^"]*)" the left and right side ad slot on "([^"]*)"$/, function (visibility, page) {
        //Identify the element
        switch(visibility) {
            case 'see':
                var valueVisible = true
                break;
            case 'not see':
                var valueVisible = false
                break;
        }
        switch(page) {
            case 'homepage':
            case 'section':
            case 'brand':
                var adLeftSide = wn_ads.adLeftSideBrandPage
                var adRightSide = wn_ads.adRightSideBrandPage
                break;
            //case 'article':
            //    var adLeftSide = wn_ads.adLeftSideArticle
            //    var adRightSide = wn_ads.adRightSideArticle
            //    break;
            //case 'gallery':
            //    var adLeftSide = wn_ads.adLeftSideGallery
            //    var adRightSide = wn_ads.adRightSideGallery
            //    break;
        }

        //Validate
        expect(browser.isVisible(adLeftSide)).toBe(valueVisible);
        expect(browser.isVisible(adRightSide)).toBe(valueVisible);
    });

    this.Then(/^I should "([^"]*)" the out of page ad slot on "([^"]*)"$/, function (visibility, page) {
        //Identify the element
        switch(visibility) {
            case 'see':
                var valueVisible = true
                break;
            case 'not see':
                var valueVisible = false
                break;
        }
        switch(page) {
            case 'brand':
                var adOutOfPage = wn_ads.adOutOfPageBrandPage
                break;
            //case 'article':
            //    var adOutOfPage = wn_ads.adOutOfPageArticle
            //    break;
            //case 'gallery':
            //    var adOutOfPage = wn_ads.adOutOfPageGallery
            //    break;
        }

        //Validate
        expect(browser.isVisible(adOutOfPage)).toBe(valueVisible);
    });

};

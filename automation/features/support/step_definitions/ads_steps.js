var wn_ads = require('../page_objects/ads_widget');
var gallery = require('../page_objects/gallery_widget');
var wait = require('../utils/wait');
var visibilityFunctions = require('../utils/visibilityFunctions');

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
        expect(browser.isVisible(wn_ads.mrecBottomFeedSticky)).toBe(true);
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

    this.Then(/^I should see (\d+) mrec ad slot beneath short teaser$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleAdBeneathShortTeaser, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see (\d+) mrec ad slot at the end of the body content$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleAdAfterBodyContent, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    //combine leadearboard check due to changes in layout and div class names
    this.Then(/^I should see (\d+) leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see (\d+) mrec ad slots in LHS feed$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleLHSMrec, 6000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see (\d+) mrec ad slots(" |above recommendation")$/, function (slot_count) {
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
        expect(browser.waitForVisible(wn_ads.adMrecBottomRightGallery, 3000)).toBe(true);
    });

    this.Then(/^I should see the MREC ad after the (\d+) slide$/, function (slide) {
        //Go to the MREC slide
        for (var i=0; i<slide; i++){
            browser.click(gallery.galleryNextButton);
            wait(500);
        }
        //Validate
        browser.waitForVisible(wn_ads.adMrecInSlideGallery,3000);
        expect(browser.waitForVisible(wn_ads.adMrecInSlideGallery, 3000)).toBe(true);
    });

    //BELOW ARE THE STEPS TO TEST WALLPAPER, SIDE PANEL, OUT OF PAGE ADs
    this.Then(/^I should "([^"]*)" the wallpaper ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.adWallpaperBrandPage);
    });

    this.Then(/^I should "([^"]*)" the left and right side ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.adLeftSideBrandPage);
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.adRightSideBrandPage);
    });

    this.Then(/^I should "([^"]*)" the out of page ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.adOutOfPageBrandPage);
    });

    this.Given(/^I should see sticky MREC ad next to the top news feed on the homepage$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,500);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.homepagetopFeedMrec)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,900);
        browser.scroll(0,1500);
        expect(browser.isVisible(wn_ads.homepagetopFeedMrec)).toBe(true);
    });

    this.Given(/^I should see sticky MREC ad next to the bottom news feed on the homepage$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,2200);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.homepagetopFeedMrec)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        wait(3000);
        browser.scroll(0,2700);
        browser.scroll(0,3000);
        expect(browser.isVisible(wn_ads.homepageBottomFeedMrec)).toBe(true);
        expect(browser.isVisible(wn_ads.homepageMrecBottomFeedSticky)).toBe(true);
    });

    this.Then(/^I should see sticky MREC ad next to the top news feed of the section Page$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,500);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.sectionpagetopFeedMrec)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,900);
        browser.scroll(0,1500);
        expect(browser.waitForVisible(wn_ads.sectionpagetopFeedMrec,5000)).toBe(true);
    });

    this.Then(/^I should see sticky MREC ad next to the bottom news feed of the section Page$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,2200);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.sectionpagetopFeedMrec)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        wait(3000);
        browser.scroll(0,2700);
        browser.scroll(0,3000);
        expect(browser.waitForVisible(wn_ads.sectionpageBottomFeedMrec,5000)).toBe(true);
    });

    this.Then(/^I should see sticky MREC on the new feed$/, function () {
        browser.moveToObject(wn_ads.homepageLoadMoreStickyMrec);
        expect(browser.waitForVisible(wn_ads.homepageLoadMoreStickyMrec,5000)).toBe(true);
    });

};

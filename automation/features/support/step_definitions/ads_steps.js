var wn_ads = require('../page_objects/ads_widget');
var gallery = require('../page_objects/gallery_widget');
var wait = require('../utils/wait');
var visibilityFunctions = require('../utils/visibilityFunctions');

module.exports = function() {

    this.Then(/^I should see the top leaderboard ad under navigation$/, function () {
        browser.waitForVisible(wn_ads.adTopLeaderboard, 15000); // long wait due to browser stack load times over the cloud
        expect(browser.isVisible(wn_ads.adTopLeaderboard)).toBe(true);
    });

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

    this.Then(/^I should see MREC ad above recommendation$/, function () {
        browser.moveToObject(wn_ads.adMrecAboveRecommendation);
        expect(browser.isVisible(wn_ads.adMrecAboveRecommendation)).toBe(true);
    });

    this.Then(/^I should not see MREC ad above recommendation$/, function () {
        expect(browser.isVisible(wn_ads.adMrecAboveRecommendation)).toBe(false);
    });

    this.Then(/^I should see (\d+) top mobile banner ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.topMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see (\d+) top mobile banner ad slots under short teaser$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.homesTopMobileBanner, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see the bottom leaderboard ad above the footer on article$/, function () {
        browser.moveToObject(wn_ads.adBottomLeaderboard);
        expect(browser.isVisible(wn_ads.adBottomLeaderboard)).toBe(true);
    });

    //BELOW ARE STEPS FOR GALLERY
    this.Then(/^I should see the top leaderboard ad above the gallery slide$/, function () {
        expect(browser.isVisible(wn_ads.adTopLeaderboardGallery)).toBe(true);
    });

    this.Then(/^I should not see the bottom leaderboard ad under the gallery slide$/, function () {
        expect(browser.isVisible(wn_ads.adBottomLeaderboardGallery)).toBe(false);
    });

    this.Then(/^I should see the MREC ad at the bottom right of the gallery$/, function () {
        expect(browser.isVisible(wn_ads.adMrecBottomRightGallery)).toBe(true);
    });

    this.Then(/^I should not see the MREC ad at the bottom right of the gallery$/, function () {
        expect(browser.isVisible(wn_ads.adMrecBottomRightGallery)).toBe(false);
    });

    this.Then(/^I should see MREC ad between images$/, function () {
        browser.moveToObject(wn_ads.adMrecBetweenGalleryImages1);
        expect(browser.isVisible(wn_ads.adMrecBetweenGalleryImages1)).toBe(true);
        browser.moveToObject(wn_ads.adMrecBetweenGalleryImages2);
        expect(browser.isVisible(wn_ads.adMrecBetweenGalleryImages2)).toBe(true);
    });

    this.Then(/^I should see four MREC ads in the RHR feed$/, function () {
        browser.moveToObject(wn_ads.adMrecRHRFeed1);
        browser.moveToObject(wn_ads.adMrecRHRFeed2);
        browser.moveToObject(wn_ads.adMrecRHRFeed3);
        browser.moveToObject(wn_ads.adMrecRHRFeed4);
    });

    this.Then(/^I should see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.adMrecUnderHeroArticle)).toBe(true);
    });

    this.Then(/^I should not see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.adMrecUnderHeroArticle)).toBe(false);
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

    this.Then(/^I should see each ad slot element containing proper class name$/, function(dataTable){
        var rows = dataTable.hashes();
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var className = browser.getAttribute('#' + row['no'],'class');
            expect(className).toEqual(row['class-name']);
        }
    });

};

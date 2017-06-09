var wn_ads = require('../page_objects/ads_widget');
var wait = require('../utils/wait');
var visibilityFunctions = require('../utils/visibilityFunctions');

module.exports = function() {

    this.Then(/^I should see the top leaderboard ad under navigation$/, function () {
        browser.waitForVisible(wn_ads.ad_TopLeaderboard, 15000); // long wait due to browser stack load times over the cloud
        expect(browser.isVisible(wn_ads.ad_TopLeaderboard)).toBe(true);
    });

    this.Then(/^I should see leaderboard ad slots at top middle and bottom$/, function () {
        var topAdSlot = browser.elements(wn_ads.ad_TopLeaderboard, 5000);
        expect((topAdSlot.value.length)).toEqual(1);
        var midAdSlot = browser.elements(wn_ads.ad_MiddleLeaderboard, 5000);
        expect((midAdSlot.value.length)).toEqual(1);
        var bottomAdSlot = browser.elements(wn_ads.ad_BottomLeaderboard, 5000);
        expect((bottomAdSlot.value.length)).toEqual(1);

    });

    this.Given(/^I should see sticky MREC ad next to the top news feed on the brand page$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
       browser.scroll(0,500);
       //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.ad_TopMrecRhs_Brand)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,900);
        browser.scroll(0,1500);
        expect(browser.isVisible(wn_ads.ad_TopMrecRhs_Brand)).toBe(true);
        expect(browser.getAttribute(wn_ads.mrecTopFeedSticky, 'style')).toContain("fixed");
    });

    this.Given(/^I should see sticky MREC ad next to the bottom news feed$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,2200);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.ad_BottomMrecRhs)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        wait(3000);
        browser.scroll(0,2700);
        browser.scroll(0,3000);
        expect(browser.isVisible(wn_ads.ad_BottomMrecRhs)).toBe(true);
        expect(browser.isVisible(wn_ads.mrecBottomFeedSticky)).toBe(true);
    });

    this.Then(/^I should see (\d+) mrec ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.mrec, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see (\d+) mrec ad slot beneath short teaser$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.ad_MrecUnderHeroImage, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see (\d+) mrec ad slot at the end of the body content$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.ad_MrecBeforeRecommendation, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    //combine leaderboard check due to changes in layout and div class names
    this.Then(/^I should see (\d+) leaderboard ad slots$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleLeaderBoard, 5000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see (\d+) mrec ad slots in RHS feed$/, function (slot_count) {
        var adSlots = browser.elements(wn_ads.articleRHSMrec, 6000);
        expect((adSlots.value.length.toString())).toEqual(slot_count);
    });

    this.Then(/^I should see MREC ad above recommendation$/, function () {
        browser.moveToObject(wn_ads.ad_MrecBeforeRecommendation);
        expect(browser.isVisible(wn_ads.ad_MrecBeforeRecommendation)).toBe(true);
    });

    this.Then(/^I should not see MREC ad above recommendation$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecBeforeRecommendation)).toBe(false);
    });

    this.Then(/^I should see the bottom leaderboard ad above the footer on article$/, function () {
        browser.moveToObject(wn_ads.ad_BottomLeaderboard_Article);
        wait(1500);
        browser.moveToObject(wn_ads.ad_BottomLeaderboard_Article); //move to the object again after the images on gallery are loaded from the first move.
        expect(browser.isVisible(wn_ads.ad_BottomLeaderboard_Article)).toBe(true);
    });

    //BELOW ARE STEPS FOR GALLERY
    this.Then(/^I should see MREC ad between images$/, function () {
        wait(2000)
        browser.moveToObject(wn_ads.ad_MrecAfterSlide3);
        expect(browser.waitForVisible(wn_ads.ad_MrecAfterSlide3,5000)).toBe(true);
        browser.moveToObject(wn_ads.ad_MrecAfterSlide7);
        expect(browser.waitForVisible(wn_ads.ad_MrecAfterSlide7,5000)).toBe(true);
    });

    this.Then(/^I should see four MREC ads in the RHR feed$/, function () {
        browser.moveToObject(wn_ads.ad_MrecRhs1);
        browser.moveToObject(wn_ads.ad_MrecRhs2);
        browser.moveToObject(wn_ads.ad_MrecRhs3);
        browser.moveToObject(wn_ads.ad_MrecRhs4);
    });

    this.Then(/^I should not see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecUnderHeroImage)).toBe(false);
    });

    this.Then(/^I should see MREC ad under the hero image$/, function () {
        expect(browser.isVisible(wn_ads.ad_MrecUnderHeroImage)).toBe(true);
    });

    //BELOW ARE THE STEPS TO TEST WALLPAPER, SIDE PANEL, OUT OF PAGE ADs
    this.Then(/^I should "([^"]*)" the wallpaper ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_Wallpaper);
    });

    this.Then(/^I should "([^"]*)" the left and right side ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_LeftSidePanel);
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_RightSidePanel);
    });

    this.Then(/^I should "([^"]*)" the out of page ad slot on "([^"]*)"$/, function (visibility, page) {
        visibilityFunctions.isAdVisible(page, visibility,wn_ads.ad_OutOfPage);
    });

    this.Given(/^I should see sticky MREC ad next to the top news feed on the homepage$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,500);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.ad_TopMrecRhs_Homepage)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,900);
        browser.scroll(0,1500);
        expect(browser.isVisible(wn_ads.ad_TopMrecRhs_Homepage)).toBe(true);
        expect(browser.isVisible(wn_ads.homepageMrecTopFeedSticky)).toBe(true);
    });

    this.Given(/^I should see sticky MREC ad next to the bottom news feed on the homepage$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,2200);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.ad_BottomMrecRhs)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        wait(3000);
        browser.scroll(0,2700);
        browser.scroll(0,3000);
        expect(browser.isVisible(wn_ads.ad_BottomMrecRhs)).toBe(true);
        expect(browser.isVisible(wn_ads.homepageMrecBottomFeedSticky)).toBe(true);
    });

    this.Then(/^I should see sticky MREC ad next to the top news feed on the section page$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,500);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.ad_TopMrecRhs_Section)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        browser.scroll(0,900);
        browser.scroll(0,1500);
        expect(browser.waitForVisible(wn_ads.ad_TopMrecRhs_Section,5000)).toBe(true);
        expect(browser.waitForVisible(wn_ads.sectionMrecTopFeedSticky,5000)).toBe(true);
    });

    this.Then(/^I should see sticky MREC ad next to the bottom news feed on the section page$/, function () {
        //Always scroll to the top first to allow this scenario can be reused for tablet landscape after testing desktop
        browser.scroll(0,2200);
        //Verify the ad is appearing
        expect(browser.isVisible(wn_ads.ad_BottomMrecRhs)).toBe(true);
        //Verify the ad is a sticky ad after scrolling down
        wait(3000);
        browser.scroll(0,2700);
        browser.scroll(0,3000);
        expect(browser.waitForVisible(wn_ads.ad_BottomMrecRhs,5000)).toBe(true);
        expect(browser.isVisible(wn_ads.sectionMrecBottomFeedSticky)).toBe(true);
    });

    this.Then(/^I should see sticky MREC on the new feed$/, function () {
        browser.moveToObject(wn_ads.ad_LoadMoreMrecInBottomFeed);
        expect(browser.waitForVisible(wn_ads.ad_LoadMoreMrecInBottomFeed,5000)).toBe(true);
    });

    this.Then(/^I should see each outside ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Top Leaderboard':
                    adElement = wn_ads.ad_TopLeaderboard;
                    break;
                case 'Middle Leaderboard':
                    adElement = wn_ads.ad_MiddleLeaderboard;
                    break;
                case 'Bottom Leaderboard':
                    adElement = wn_ads.ad_BottomLeaderboard;
                    break;
                case 'Bottom Leaderboard on Gallery':
                case 'Bottom Leaderboard on Article':
                    adElement = wn_ads.ad_BottomLeaderboard_Article;
                    break;
                case 'Teads':
                    adElement = wn_ads.ad_Teads;
                    break;
                case 'MREC Under Hero Teaser': //mobile
                    adElement = wn_ads.ad_MrecUnderHeroTeaser;
                    break;
                case 'MREC Under Hero Teaser on Section': //mobile
                    adElement = wn_ads.ad_MrecUnderHeroTeaser_Section;
                    break;
                case 'MREC Under Hero Teaser on Brand': //mobile
                    adElement = wn_ads.ad_MrecUnderHeroTeaser_Brand;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each body ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'MREC After Slide 3':
                    adElement = wn_ads.ad_MrecAfterSlide3;
                    break;
                case 'MREC After Slide 7':
                    adElement = wn_ads.ad_MrecAfterSlide7;
                    break;
                case 'MREC In Bottom Feed': //mobile
                    adElement = wn_ads.ad_MrecInBottomFeed;
                    break;
                case 'MREC Before Recommendation': //mobile
                    adElement = wn_ads.ad_MrecBeforeRecommendation;
                    break;
                case 'MREC Under Hero Image': //mobile
                    adElement = wn_ads.ad_MrecUnderHeroImage;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each RHS ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Top MREC RHS on Homepage':
                    adElement = wn_ads.ad_TopMrecRhs_Homepage;
                    break;
                case 'Top MREC RHS on Section':
                    adElement = wn_ads.ad_TopMrecRhs_Section;
                    break;
                case 'Top MREC RHS on Brand':
                    adElement = wn_ads.ad_TopMrecRhs_Brand;
                    break;
                case 'Top MREC RHS on Navigation Section':
                    adElement = wn_ads.ad_TopMrecRhs_NavigationSection;
                    break;
                case 'Bottom MREC RHS':
                    adElement = wn_ads.ad_BottomMrecRhs;
                    break;
                case 'MREC RHS 1':
                    adElement = wn_ads.ad_MrecRhs1;
                    break;
                case 'MREC RHS 2':
                    adElement = wn_ads.ad_MrecRhs2;
                    break;
                case 'MREC RHS 3':
                    adElement = wn_ads.ad_MrecRhs3;
                    break;
                case 'MREC RHS 4':
                    adElement = wn_ads.ad_MrecRhs4;
                    break;
                case 'Sticky MREC RHS':
                    adElement = wn_ads.ad_StickyMrecRhs;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each additional ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch(row['ad']) {
                case 'Out Of Page':
                    adElement = wn_ads.ad_OutOfPage;
                    break;
                case 'Left Side Panel':
                    adElement = wn_ads.ad_LeftSidePanel;
                    break;
                case 'Right Side Panel':
                    adElement = wn_ads.ad_RightSidePanel;
                    break;
                case 'Wallpaper':
                    adElement = wn_ads.ad_Wallpaper;
                    break;
            }
            var className = browser.getAttribute(adElement,'class');
            expect(className).toEqual(row['class-name']);
        }
    });

    this.Then(/^I should see each load more ad slot element containing proper class name$/, function (dataTable) {
        var rows = dataTable.hashes();
        var adElement;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            switch (row['ad']) {
                case 'Load More MREC RHS':
                    adElement = wn_ads.ad_LoadMoreMrecRhs;
                    break;
                case 'Load More MREC In Bottom Feed': //mobile
                    adElement = wn_ads.ad_LoadMoreMrecInBottomFeed;
                    break;
            }
            var className = browser.getAttribute(adElement, 'class');
            expect(className).toEqual(row['class-name']);
        }
    });

};

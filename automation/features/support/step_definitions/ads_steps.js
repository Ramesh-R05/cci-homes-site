
var wn_ads = require('../page_objects/ads_widget');
module.exports = function() {

    this.Then(/^I should see leaderboard ad slots at top middle and bottom$/, function () {
       var topAdSlot = browser.elements(wn_ads.leaderBoard, 5000);
        expect((topAdSlot.value.length)).toEqual(1);
        var midAdSlot = browser.elements(wn_ads.midLeaderBoard, 5000);
        expect((midAdSlot.value.length)).toEqual(1);
        var bottomAdSlot = browser.elements(wn_ads.bottomLeaderBoard, 5000);
        expect((bottomAdSlot.value.length)).toEqual(1);
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


};

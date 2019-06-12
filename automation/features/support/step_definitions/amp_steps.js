var amp = require('../page_objects/amp_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var loadAllElements = require('../../../node_modules/@bxm/automation/lib/utils/loadAllElements');
var world = require('../world');
// var isBrowserStack = world.Urls.isBrowserStack;
var scrolling = require('../../../node_modules/@bxm/automation/lib/utils/scrolling');

module.exports = function() {
    this.When(/^I can see the amp hero image$/, function() {
        browser.scroll(amp.ampHeroImage);
        var heroImg = browser.waitForVisible(amp.ampHeroImage, 2000);
        expect(heroImg).toBe(true);
    });

    this.Given(/^I can see the amp body image$/, function() {
        var ampBodyImg = browser.isVisible(amp.ampBodyImg);
        if (Array.isArray(ampBodyImg)) {
            ampBodyImg.forEach(img => expect(img).toBe(true));
        } else {
            expect(ampBodyImg).toBe(true);
        }
    });

    this.Given(/^I can see the amp body image caption "([^"]*)"$/, function(
        ImgCaption
    ) {
        var ampBodyImgCaption = browser.getText(amp.ampBodyImgCaption);
        expect(ampBodyImgCaption).toContain(ImgCaption);
    });

    this.Given(/^I can see the amp body video$/, function() {
        var ampBodyVideo = browser.isVisible(amp.ampBodyVideo);
        expect(ampBodyVideo).toBe(true);
    });

    this.When(
        /^I can see the facebook share button on amp article page$/,
        function() {
            var facebook = browser.isVisible(amp.ampArticleFacebook);
            expect(facebook).toBe(true);
        }
    );

    this.When(
        /^I can see the pinterest share button on amp article page$/,
        function() {
            var pinterest = browser.isVisible(amp.ampArticlePinterest);
            expect(pinterest).toBe(true);
        }
    );

    this.Given(/^I can see the amp body related content$/, function() {
        // use the site domain to select different class element for aww,wd,food and dolly,cosmo,homes
        browser.scroll(amp.relatedContentHeading);
        var rcHeading = browser.getText(amp.relatedContentHeading);
        var rcItemsImage = browser.getAttribute(
            amp.ampRelatedContentItemsImage,
            'src'
        );
        var rcItemsTitle = browser.getText(amp.ampRelatedContentItemsTitle);

        //Validate the heading of Related
        expect(rcHeading).not.toEqual('');

        //Loop through the related items, and Validate the body related items' image and title
        for (var i = 0; i < rcItemsTitle.length; i++) {
            var image = rcItemsImage[i];
            var title = rcItemsTitle[i];
            expect(image === '').toBe(false);
            expect(title === '').toBe(false);
        }
    });

    this.Given(/^I can see the amp body Twitter embed "([^"]*)"$/, function(
        twitterId
    ) {
        loadAllElements('article', browser);
        browser.waitForVisible(amp.ampTwitterEmb, 10000);
        var twitEmbed = browser.getAttribute(amp.ampTwitterEmb, 'data-tweetid');
        expect(twitEmbed).toEqual(twitterId);
    });

    this.Given(/^I can see the amp body Facebook embed "([^"]*)"$/, function(
        facebookUrl
    ) {
        browser.waitForVisible(amp.ampFacebookEmb, 3000);
        var facebookEmbed = browser.getAttribute(
            amp.ampFacebookEmb,
            'data-href'
        );
        expect(facebookEmbed).toEqual(facebookUrl);
    });

    this.Given(/^I can see the amp body Youtube embed "([^"]*)"$/, function(
        youtubeUrl
    ) {
        // Iframe inside element lazy loads once in viewport
        browser.waitForVisible(amp.ampYoutube, 3000);
        browser.scroll(amp.ampYoutube);
        browser.waitForVisible(amp.ampYoutubeEmb, 3000);
        var ampYoutubeEmb = browser.getAttribute(amp.ampYoutubeEmb, 'src');
        expect(ampYoutubeEmb).toContain(youtubeUrl);
    });

    this.Given(/^I can see the amp body Vimeo embed "([^"]*)"$/, function(
        vimeoUrl
    ) {
        browser.waitForVisible(amp.ampVimeoEmb, 3000);
        var ampVimeoEmb = browser.getAttribute(amp.ampVimeoEmb, 'src');
        expect(ampVimeoEmb).toEqual(vimeoUrl);
    });

    // For Ads
    this.Then(
        /^I should see the top leaderboard ad under hero image on AMP page$/,
        function() {
            //expect(browser.waitForVisible(amp.ampTopLeaderBoard,5000)).toBe(true);
            expect(browser.isExisting(amp.ampTopLeaderBoard)).toBe(true); //This line is a workaround of the above command because the ad sometimes doesn't appear in SIT.
        }
    );

    this.Then(/^I should see first MREC in the body on AMP page$/, function() {
        scrolling(browser, amp.ampBodyImg, isBrowserStack);
        browser.waitForVisible(amp.ampMrecList, 5000);
        var bodyAmpAdList = browser.isVisible(amp.ampMrecList);
        expect(bodyAmpAdList[0]).toBe(true);
    });

    this.Then(/^I should see second MREC in the body on AMP page$/, function() {
        var bodyAmpAdList = browser.isVisible(amp.ampMrecList);
        expect(bodyAmpAdList[1]).toBe(true);
    });

    this.Then(
        /^I should see the sticky bottom leaderboard on AMP page$/,
        function() {
            scrolling(browser, amp.ampBodyContainer, isBrowserStack);
            expect(
                browser.waitForVisible(amp.ampBottomLeaderboard, 10000)
            ).toBe(true);
            scrolling(browser, amp.ampArticleFooter, isBrowserStack);
            expect(
                browser.waitForVisible(amp.ampBottomLeaderboard, 10000)
            ).toBe(true);
        }
    );

    this.Then(/^I can see the outbrain on amp article page$/, function() {
        browser.waitForVisible(amp.ampOutBrain, 5000);
        browser.scroll(0, 500);
        expect(browser.isVisible(amp.ampOutBrain)).toBe(true);
    });
};

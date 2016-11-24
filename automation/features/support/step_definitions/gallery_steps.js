var gallery = require('../page_objects/gallery_widget');
var world = require('../world');
var wait = require('../utils/wait');
var findValue = require('../utils/findValue');

module.exports = function() {

    this.Given(/^I can see the logo on the gallery header$/, function() {
        expect(browser.isVisible(gallery.headerLogo)).toBe(true);
    });

    this.Given(/^I can click the logo to go to homepage$/, function() {
        var logoLink = browser.getAttribute(gallery.headerLogo, 'href');
        expect(logoLink).toEqual(world.Urls.home_page);
    });

    this.Given(/^I can see an image appearing on the gallery$/, function() {
        var img = browser.getAttribute(gallery.galleryImg, 'src');
        expect(img).not.toBe(null);
        console.log("IMAGE SRC =" + " " + img);
    });

    this.Given(/^I can see the tag name of the gallery "([^"]*)"$/, function(tagName) {
        var galleryTagName = browser.getText(gallery.galleryTagName);
        expect(galleryTagName).toEqual(tagName);
        console.log(galleryTagName);
    });

    this.Given(/^I can see the created date of the gallery "([^"]*)"$/, function(date) {
        var galleryDate = browser.getText(gallery.galleryDate);
        expect(galleryDate).toEqual(date);
        console.log(galleryDate);
    });

    this.Given(/^I can see the long title on the gallery header "([^"]*)"$/, function(longTitle) {
        var galleryTitle = browser.getText(gallery.galleryLongTitle);
        expect(galleryTitle).toMatch(longTitle);
    });

    this.Given(/^I should not see the long title on the gallery header on the next gallery slide$/, function() {
        expect(browser.isVisible(gallery.galleryLongTitle)).toBe(false);
    });

    this.Given(/^I can see the gallery description of the gallery containing "([^"]*)"$/, function(description) {
        var galleryDescription = browser.getText(gallery.galleryDescription);
        expect(galleryDescription).toContain(description);
    });

    this.Given(/^I can see the right arrow on the gallery$/, function() {
        expect(browser.isVisible(gallery.galleryNextButton)).toBe(true);
    });

    this.Given(/^I should not see the left arrow on the gallery$/, function() {
        expect(browser.isVisible(gallery.galleryPrevButton)).toBe(false);
    });

    this.Given(/^I can see the image number "([^"]*)" of total "([^"]*)" on the gallery$/, function(num, total) {
        var imageCount = browser.getText(gallery.imageCountDesktop);
        expect(imageCount).toEqual(num + " / " + total);
        console.log(imageCount);
    });

    this.Given(/^I can see the image number "([^"]*)" of total "([^"]*)" on the mobile gallery$/, function(num, total) {
        var imageCount = browser.getText(gallery.imageCountMobile);
        expect(imageCount).toEqual(num + " / " + total);
        console.log(imageCount);
    });

    this.Given(/^I can see the image caption on the gallery containing "([^"]*)"$/, function(caption) {
        browser.waitForVisible(gallery.imgCaption);
        var imgCaption = browser.getText(gallery.imgCaption);
        expect(imgCaption).toMatch(caption);
        console.log(imgCaption);
    });

    this.Given(/^I can click MORE to see the full image caption on the gallery$/, function() {
        browser.waitForVisible(gallery.toggleMore, 2000);
        browser.click(gallery.toggleMore);
        expect(browser.getAttribute(gallery.toggleLess, 'style')).toEqual("opacity: 1;");

        wait(500); //1/2 second wait to enable transition
    });

    this.Given(/^I can click LESS to see the short image caption on the gallery$/, function() {
        browser.waitForVisible(gallery.toggleLess, 2000);
        browser.click(gallery.toggleLess);
        expect(browser.waitForVisible(gallery.toggleMore, 2000)).toBe(true);

        wait(500); //1/2 second wait to enable transition
    });

    this.Given(/^I can click the right arrow on the gallery to check the next image$/, function() {
        var currentImgNum = browser.getText(gallery.currentImgNum);
        wait(500);
        browser.waitForEnabled(gallery.galleryNextButton, 2000);
        browser.click(gallery.galleryNextButton);
        var nextImgNum = browser.getText(gallery.currentImgNum);
        expect(nextImgNum).toBeGreaterThan(currentImgNum);
    });

    this.Given(/^I should not see the gallery description on mobile for next image$/, function() {
        expect(browser.isVisible(gallery.galleryDescription)).toBe(false);
    });

    this.When(/^I see the image no "([^"]*)" on the gallery$/, function(imgNum) {
        expect(browser.getText(gallery.currentImgNum)).toMatch(imgNum);
    });

    this.When(/^I can see the left arrow on the gallery$/, function() {
        expect(browser.isVisible(gallery.galleryPrevButton)).toBe(true);
    });

    this.When(/^I can click the left arrow to go back to a previous image on the gallery$/, function() {
        var currentImgNum = browser.getText(gallery.currentImgNum);
        browser.click(gallery.galleryPrevButton);
        var prevImgNum = browser.getText(gallery.currentImgNum);

        //Find a valid value in array
        var currentImgNum = findValue(currentImgNum[0], currentImgNum[1]);
        var prevImgNum = findValue(prevImgNum[0], prevImgNum[1]);

        //Compare the value
        expect(prevImgNum).toBeLessThan(currentImgNum);
    });

    this.When(/^I see the video ID "([^"]*)" on the gallery$/, function(videoId) {
        browser.click(gallery.galleryNextButton);
        browser.click(gallery.galleryNextButton);
        wait(500);
        expect(browser.getAttribute(gallery.videoWrapper, gallery.videoId)).toEqual(videoId)
    });

    this.When(/^I can see the play button and click on it$/, function() {
        browser.waitForVisible(gallery.playButton, 2000);
        browser.click(gallery.playButton);
        expect(browser.isVisible(gallery.videoPlayWrap, gallery.videoAdPlay)).toBe(true);
        //verify video is playing the Ad
    });

    this.When(/^I see the last image on the gallery$/, function() {
        //Find the current slide no and the last slide no.
        var current_slide = browser.getText(gallery.currentImgNum);
        var last_slide = browser.getText(gallery.lastImgNum);

        //Find a valid value in array
        var current_slide = findValue(current_slide[0], current_slide[1]);
        var last_slide = findValue(last_slide[0], last_slide[1]);

        //Click next until it is the last slide
        while (current_slide != last_slide) {
            wait(500);
            browser.waitForEnabled(gallery.galleryNextButton, 2000);
            browser.click(gallery.galleryNextButton);
            //To handle ad between slides
            if (browser.isExisting(gallery.currentImgNum) == true) {
                var current_slide = browser.getText(gallery.currentImgNum);
                var current_slide = findValue(current_slide[0], current_slide[1]);
            }
        }
    });

    this.When(/^I can click the right arrow on the gallery on the last slide$/, function() {
        browser.waitForVisible(gallery.galleryNextButton, 2000);
        browser.click(gallery.galleryNextButton);
    });

    this.When(/^I see the next gallery slide on the gallery as "([^"]*)"$/, function(nextGal) {
        browser.waitForVisible(gallery.nextGallery, 2000);
        var nextGallery = browser.getText(gallery.nextGallery);
        expect(nextGallery).toEqual(nextGal);
    });

    this.When(/^I can see the next gallery name "([^"]*)"$/, function(name) {
        expect(browser.getText(gallery.nextGalName)).toMatch(name);
    });

    this.When(/^I can see the right arrow on the next gallery slide$/, function() {
        browser.isVisible(gallery.galleryLastSlide);
    });

    this.When(/^I see the next gallery slide on the gallery on mobile$/, function() {
        browser.scroll(0, 1500);
        expect(browser.isVisible(gallery.moreGalleries)).toBe(true);
    });

    this.When(/^I can see the next gallery name on mobile "([^"]*)"$/, function(teaserName) {
        expect(browser.getText(gallery.nextGalTeaser)).toMatch(teaserName);
    });

    this.When(/^I can slide to the first MREC ad$/, function() {
        //Go to the 4th slide which is the first MREC ad
        for (var i = 0; i < 3; i++) {
            wait(500);
            browser.waitForEnabled(gallery.galleryNextButton, 2000);
            browser.click(gallery.galleryNextButton);}
    });

    this.When(/^I cannot go to the next slide when the ad is not loaded$/, function() {
        //Verify that the arrows have opacity style
        var style_next = browser.getAttribute(gallery.galleryNextButton, 'style');
        var style_prev = browser.getAttribute(gallery.galleryPrevButton, 'style');
        expect(style_next).toContain("opacity");
        expect(style_prev).toContain("opacity");
    });

    this.When(/^I can go to the next slide when the ad is loaded$/, function() {
        //Wait to ensure it passes the timer to show the arrows.
        wait(4500);
        //Verify that the arrows don't have opacity style
        var style_next = browser.getAttribute(gallery.galleryNextButton, 'style');
        var style_prev = browser.getAttribute(gallery.galleryPrevButton, 'style');
        expect(style_next).not.toContain("opacity");
        expect(style_prev).not.toContain("opacity");
    });
};

var gallery = require('../page_objects/gallery_widget');
var world = require('../world');
var wait = require('../utils/wait');
var findValue = require('../utils/findValue');
var window = require('../utils/window_handler');

module.exports = function() {


    this.When(/^I navigate to all of the images$/, function () {
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
            wait(500);
            //To handle ad between slides q
            if (browser.isExisting(gallery.currentImgNum) == true) {
                var current_slide = browser.getText(gallery.currentImgNum);
                var current_slide = findValue(current_slide[0], current_slide[1]);
            }
        }
    });

    this.Then(/^I am able to see next gallery on "([^"]*)"$/, function(device) {
        // It will direct us to the next gallery page
        browser.click(gallery.galleryNextButton);
        //Validate the title
        switch(device){
            case 'mobile':
            case 'mobile portrait':
            case 'tablet portrait':
                browser.waitForVisible(gallery.mobileNextGallery, 3000);
                wait(2000);
                var nextGallery = browser.getText(gallery.mobileNextGallery);
                expect(nextGallery).toEqual("UPNEXT");
                break;
            case 'tablet landscape':
            case 'desktop':
                browser.waitForVisible(gallery.nextGallery, 2000);
                var nextGallery = browser.getText(gallery.nextGallery);
                expect(nextGallery).toEqual("NEXT GALLERY");
                break;
        }
        //Validate the next arrow on the right
        browser.isVisible(gallery.galleryLastSlide);
        //Validate the left arrow not visible
        expect(browser.isVisible(gallery.galleryPrevButton)).toBe(false);
    });

    this.Then(/^I can see the headline "([^"]*)" only on the first image$/, function(headlinetext) {
        expect(browser.getText(gallery.mobileLongTitle)).toEqual(headlinetext);
    });

    this.Then(/^I can see the Image counter and caption truncated to two lines$/, function () {
        // Validating counter and when we see next image counter is updated
        var imageCount = browser.getText(gallery.imageCountDesktop);
        expect(imageCount).toEqual("1 / 8");
        console.log(imageCount);
        browser.click(gallery.galleryNextButton);
        var imageCount = browser.getText(gallery.imageCountDesktop);
        expect(imageCount).toEqual("2 / 8");
        // Going back to Initial Image
        browser.click(gallery.galleryPrevButton);
        // Validating caption
        browser.waitForVisible(gallery.imgCaption);
        var imgCaption = browser.getText(gallery.imgCaption);
        expect(imgCaption).not.toBeUndefined();
        console.log(imgCaption);
        //Validate caption is truncated - Cannot be automated
    });

    this.Then(/^I can see the headline "([^"]*)" across all images$/, function(headlinetext) {
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
            //To handle ad between slides q
            if (browser.isExisting(gallery.currentImgNum) == true) {
                var current_slide = browser.getText(gallery.currentImgNum);
                var current_slide = findValue(current_slide[0], current_slide[1]);
            }
            expect(browser.getText(gallery.galleryLongTitle)).toEqual(headlinetext);
        }
    });

    this.Then(/^I can toggle between Less and More$/, function () {
        // Validating change of style when the user click on More or Less
        var initialStyle = browser.getAttribute(gallery.captionContainer, 'style');
        browser.click(gallery.toggleMore);
        var changedStyle = browser.getAttribute(gallery.captionContainer, 'style');
        expect(initialStyle).not.toEqual(changedStyle);
        // Need hardcoded wait for elements to load properly
        wait(500);
        browser.click(gallery.toggleLess);
        var finalStyle = browser.getAttribute(gallery.captionContainer, 'style');
        expect(changedStyle).not.toEqual(finalStyle);
        expect(initialStyle).toContain('51');
    });

    this.Then(/^I should be able to share through facebook$/, function () {
        var currentWindow = browser.windowHandle().value;
        browser.click(gallery.facebookshareButton);

        //interact with social window
        var wnd = new window();
        wnd.swapWindow(currentWindow);
        console.log(browser.getTitle());
        expect(browser.getTitle()).toMatch("Sharing...");
        browser.close();

        //back to original window
        browser.switchTab(currentWindow);
        console.log(browser.getTitle());

    });

    this.Then(/^I should be able to share through Pinterest$/, function () {
        var currentWindow = browser.windowHandle().value;
        browser.click(gallery.pinterestshareButton);

        //interact with social window
        var wnd = new window();
        wnd.swapWindow(currentWindow);
        console.log(browser.getTitle());
        expect(browser.getTitle()).toMatch("Pinterest");
        browser.close();

        //back to original window
        browser.switchTab(currentWindow);
        console.log(browser.getTitle());
    });

    this.Then(/^I should be able to see the gallery description text$/, function () {
        var galleryParagraph = browser.getText(gallery.galleryParagraph);
        console.log(galleryParagraph);
        expect(galleryParagraph).not.toBeUndefined();

    });

    this.Then(/^I should be able to see the brand logo$/, function () {
        var galleryBrandLogo = browser.getAttribute(gallery.galleryBrandLogo, 'href');
        console.log(galleryBrandLogo);
        expect (galleryBrandLogo).not.toEqual('');

    });


};

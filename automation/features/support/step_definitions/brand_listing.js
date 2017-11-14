var brand_listing = require('../page_objects/brand_listing_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var loadMore = require('../page_objects/loadmore_widget');

module.exports = function() {

    this.When(/^I should see the brand title logo on the brand landing page$/, function () {
        //verify the brand logo image
        var brandLogoSrc = browser.getAttribute(brand_listing.brandLogo, 'src');
        expect(brandLogoSrc).not.toBeUndefined();
        console.log(brandLogoSrc);
    });

    this.When(/^I should see (\d+) teasers on the brand listing page$/, function (number) {
        //verify the number of teasers
        var brandArticle = browser.elements(brand_listing.brandArticle);
        expect((brandArticle.value.length).toString()).toEqual(number);
    });

    this.When(/^I should see each teaser containing its image and clickable to open its page$/, function () {
        //verify images of all teasers
        var brandArticleImgUrl = browser.getAttribute(brand_listing.brandArticleImg,'data-srcset');
        var brandArticleImgLink = browser.getAttribute(brand_listing.brandArticleImgLink,'href');
        console.log(brandArticleImgUrl + " => " + brandArticleImgLink);
        expect(brandArticleImgUrl).not.toEqual('');
        expect(brandArticleImgLink).not.toEqual('');
    });

    this.When(/^I should see each teaser containing its title and clickable to open its page$/, function () {
        //This is to ensure that the teaser elements are loaded before checking text elements (solve for desktop case)
        //We are using scrolling three times for now unless we find a better solution in the future.
        browser.scroll(0,1000);
        wait(1000);
        browser.scroll(0,2000);
        wait(1000);
        browser.scroll(0,3000);
        wait(1000);

        //verify titles of all teasers
        var brandArticleTitle = browser.getText(brand_listing.brandArticleTitle);
        var brandArticleTitleLink = browser.getAttribute(brand_listing.brandArticleTitle,'href');
        console.log(brandArticleTitle + " => " + brandArticleTitleLink);
        expect(brandArticleTitle).not.toEqual('');
        expect(brandArticleTitleLink).not.toEqual('');
    });

    this.When(/^I should see each teaser containing its tag and clickable to open its page$/, function () {
        //verify tags of all teasers
        var brandArticleTag = browser.getText(brand_listing.brandArticleTag);
        var brandArticlePrimaryTagLink = browser.getAttribute(brand_listing.brandArticlePrimaryTagLink,'href');
        var brandArticleSecondaryTagLink = browser.getAttribute(brand_listing.brandArticleSecondaryTagLink,'href');
        console.log(brandArticleTag + " => " + brandArticlePrimaryTagLink + ", " + brandArticleSecondaryTagLink);
        expect(brandArticleTag).not.toEqual('');
        expect(brandArticlePrimaryTagLink).not.toEqual('');
    });

    this.When(/^I should see the brand subscribe teaser "([^"]*)" the main hero and clickable to open its page$/, function (position) {

        //find all elements in the brand subscribe teaser
        switch(position) {
            case 'under':
                var brandSubscribeDisplay = brand_listing.brandSubscribeUnder;
                var brandSubscribeImgUrl = brand_listing.brandSubscribeUnderImg;
                var brandSubscribeTitle = brand_listing.brandSubscribeUnderTitle;
                var brandSubscribeImgLink = brand_listing.brandSubscribeUnderImgLink;
                var brandSubscribeTitleLink = brand_listing.brandSubscribeUnderTitle;
                var brandSubscribeHidden = brand_listing.brandSubscribeFront;
                break;
            case 'in front of':
                var brandSubscribeDisplay = brand_listing.brandSubscribeFront;
                var brandSubscribeImgUrl = brand_listing.brandSubscribeFrontImg;
                var brandSubscribeTitle = brand_listing.brandSubscribeFrontTitle;
                var brandSubscribeImgLink = brand_listing.brandSubscribeFrontImgLink;
                var brandSubscribeTitleLink = brand_listing.brandSubscribeFrontTitle;
                var brandSubscribeHidden = brand_listing.brandSubscribeUnder;
                break;
        }

        //get a specific value for each element before validating
        var brandSubscribeDisplayValue = browser.getCssProperty(brandSubscribeDisplay, 'display').value;
        var brandSubscribeImgUrlValue = browser.getAttribute(brandSubscribeImgUrl,'data-srcset');
        var brandSubscribeTitleValue = browser.getText(brandSubscribeTitle);
        var brandSubscribeImgLinkValue = browser.getAttribute(brandSubscribeImgLink, 'href');
        var brandSubscribeTitleLinkValue = browser.getAttribute(brandSubscribeTitleLink,'href');
        var brandSubscribeHiddenValue = browser.getCssProperty(brandSubscribeHidden, 'display').value;

        //validate all elements are displaying correctly
        expect(brandSubscribeDisplayValue).toContain('block');

        console.log("Image URL: " + brandSubscribeImgUrlValue);
        expect(brandSubscribeImgUrlValue).not.toEqual('');

        console.log("Title: " + brandSubscribeTitleValue);
        expect(brandSubscribeTitleValue).not.toEqual('');

        console.log("Image link: " + brandSubscribeImgLinkValue);
        expect(brandSubscribeImgLinkValue).toEqual("https://www.magshop.com.au/store/homestolove");

        console.log("Title link: " + brandSubscribeTitleLinkValue);
        expect(brandSubscribeTitleLinkValue).toEqual(brandSubscribeImgLinkValue);

        //verify another brand subscribe teaser should be hidden
        expect(brandSubscribeHiddenValue).toContain('none');
    });

    this.When(/^I should see "([^"]*)" brand social$/, function (brand) {
        //verify brand social
        var brandSocial = browser.getText(brand_listing.brandSocial);
        console.log(brandSocial);
        expect(brandSocial).toContain(brand.toUpperCase());
    });

    this.When(/^I should see recommendations on brand listing page$/, function () {
        //verify recommendations
        var recommendationsHeading = browser.getText(brand_listing.recommendationsHeading);
        console.log(recommendationsHeading);
        expect(recommendationsHeading).not.toEqual('');
    });

    this.Then(/^the top teaser is a hero article or gallery curated from the CMS$/, function () {
        expect(browser.waitForVisible(brand_listing.brandHeroTeaser,2000));
    });

    this.Then(/^I should be able to see title logo$/, function () {
        var brandLogoSrc = browser.getAttribute(brand_listing.brandLogo, 'src');
        expect(brandLogoSrc).not.toBeUndefined();
        console.log(brandLogoSrc);
    });

    this.When(/^I should see the sign up button containing "([^"]*)" url and "([^"]*)" gtm in "([^"]*)" view$/, function (url, gtm, device) {
        var signUpBtn, signUpBtnLink, signUpBtnClass;

        switch(device) {
            case 'mobile':
            case 'tablet portrait':
                signUpBtn = brand_listing.newsletterSignUpBtnMobile;
                signUpBtnLink = browser.getAttribute(signUpBtn, 'href');
                signUpBtnClass = browser.getAttribute(signUpBtn, 'class');
                break;
            case 'desktop':
            case 'tablet landscape':
                signUpBtn = brand_listing.newsletterSignUpBtnDesktop;
                signUpBtnLink = browser.getAttribute(signUpBtn, 'href');
                signUpBtnClass = browser.getAttribute(signUpBtn, 'class');
                break;
        }

        browser.scroll(signUpBtn);
        expect(browser.isVisible(signUpBtn)).toEqual(true);
        expect(signUpBtnLink).toContain(url);
        expect(signUpBtnClass).toContain(gtm);
    });

};

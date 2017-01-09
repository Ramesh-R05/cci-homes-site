var brand_listing = require('../page_objects/brand_listing_widget');
var wait = require('../utils/wait');

module.exports = function() {

    this.When(/^I should see the brand title logo on the brand landing page$/, function () {
        //verify the brand logo image
        var brandLogoSrc = browser.getAttribute(brand_listing.brandLogo, 'src');
        expect(brandLogoSrc).not.toBeUndefined();
        console.log(brandLogoSrc);
    });

    this.When(/^I should see (\d+) teasers on the brand listing page$/, function (number) {
        //verify the number of teasers
        var brandArticle = browser.getAttribute(brand_listing.brandArticle, 'src');
        expect(brandArticle.length).toEqual(parseInt(number,10));
    });

    this.When(/^I should see each teaser containing its image and clickable to open its page$/, function () {
        //verify images of all teasers
        var brandArticleImgUrl = browser.getAttribute(brand_listing.brandArticleImg,'data-srcset');
        console.log(brandArticleImgUrl.length);
        var brandArticleImgLink = browser.getAttribute(brand_listing.brandArticleImgLink,'href');
        for (var i=0; i<brandArticleImgUrl.length; i++){
            expect(brandArticleImgUrl[i]).not.toEqual('');
            expect(brandArticleImgLink[i]).not.toEqual('');
            console.log( i + ":" + brandArticleImgUrl[i] + " => " + brandArticleImgLink[i]);
        }
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
        console.log(brandArticleTitle.length);
        var brandArticleTitleLink = browser.getAttribute(brand_listing.brandArticleTitle,'href');
        for (var i=0; i<brandArticleTitle.length; i++){
            console.log( i + ":" + brandArticleTitle[i] + " => " + brandArticleTitleLink[i]);
            expect(brandArticleTitle[i]).not.toEqual('');
            expect(brandArticleTitleLink[i]).not.toEqual('');
        }
    });

    this.When(/^I should see each teaser containing its tag and clickable to open its page$/, function () {
        //verify tags of all teasers
        var brandArticleTag = browser.getText(brand_listing.brandArticleTag);
        console.log(brandArticleTag.length);
        var brandArticlePrimaryTagLink = browser.getAttribute(brand_listing.brandArticlePrimaryTagLink,'href');
        var brandArticleSecondaryTagLink = browser.getAttribute(brand_listing.brandArticleSecondaryTagLink,'href');
        for (var i=0; i<brandArticleTag.length; i++){
            expect(brandArticleTag[i]).not.toEqual('');
            expect(brandArticlePrimaryTagLink[i]).not.toEqual('');
            console.log( i + ":" + brandArticleTag[i] + " => " + brandArticlePrimaryTagLink[i] + ", " + brandArticleSecondaryTagLink[i]);
        }
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

};

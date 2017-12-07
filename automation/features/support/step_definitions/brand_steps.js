var brand_listing = require('../page_objects/brand_listing_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var loadMore = require('../page_objects/loadmore_widget');
var validateImageURL = require('../../../node_modules/@bxm/automation/lib/utils/validateImageURL');

module.exports = function() {

    this.When(/^I should see the brand title logo on the brand landing page$/, function () {
        //verify the brand logo image
        var brandLogoSrc = browser.getAttribute(brand_listing.brandLogo, 'src');
        expect(brandLogoSrc).not.toEqual('');
    });

    this.When(/^I should see (\d+) teasers on the brand listing page$/, function (number) {
        //verify the number of teasers
        var brandArticle = browser.elements(brand_listing.brandArticle);
        expect((brandArticle.value.length).toString()).toEqual(number);
    });

    this.Then(/^I should see the hero teaser$/, function () {
        expect(browser.waitForVisible(brand_listing.brandHeroTeaser,2000));
    });

    this.When(/^I should see the sign up button containing "([^"]*)" url in "([^"]*)" view$/, function (url, device) {
        var signUpBtn, signUpBtnLink;

        switch(device) {
            case 'mobile':
            case 'tablet portrait':
                signUpBtn = brand_listing.newsletterSignUpBtnMobile;
                signUpBtnLink = browser.getAttribute(signUpBtn, 'href');
                break;
            case 'desktop':
            case 'tablet landscape':
                signUpBtn = brand_listing.newsletterSignUpBtnDesktop;
                signUpBtnLink = browser.getAttribute(signUpBtn, 'href');
                break;
        }

        browser.scroll(signUpBtn);
        expect(browser.isVisible(signUpBtn)).toEqual(true);
        expect(signUpBtnLink).toContain(url);
    });

};

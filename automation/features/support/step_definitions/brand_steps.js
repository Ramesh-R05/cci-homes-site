const brand_listing = require('../page_objects/brand_listing_widget');
const wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
const loadMore = require('../page_objects/loadmore_widget');
const validateImageURL = require('../../../node_modules/@bxm/automation/lib/utils/validateImageURL');

When(
    `I should see the sign up button containing {string} url in {string} view`,
    (url, device) => {
        const {
            newsletterSignUpBtnDesktop,
            newsletterSignUpBtnMobile
        } = brand_listing;

        let signUpBtn;

        switch (device) {
            case 'mobile':
            case 'tablet portrait':
                signUpBtn = newsletterSignUpBtnMobile;
                break;
            case 'desktop':
            case 'tablet landscape':
                signUpBtn = newsletterSignUpBtnDesktop;
                break;
        }

        cy.get(signUpBtn)
            .scrollIntoView()
            .then(subscribeLinkContainer => {
                expect(subscribeLinkContainer).to.be.visible;
                expect(
                    subscribeLinkContainer
                        .find('.newsletter-subscribe__button')
                        .find('.button')
                        .prop('href')
                ).to.contain(url);
            });
    }
);

module.exports = function() {
    this.When(
        /^I should see the brand title logo on the brand landing page$/,
        function() {
            //verify the brand logo image
            var brandLogoSrc = browser.getAttribute(
                brand_listing.brandLogo,
                'src'
            );
            expect(brandLogoSrc).not.toEqual('');
        }
    );

    this.When(
        /^I should see (\d+) teasers on the brand listing page$/,
        function(number) {
            //verify the number of teasers
            var brandArticle = browser.elements(brand_listing.brandArticle);
            expect(brandArticle.value.length.toString()).toEqual(number);
        }
    );

    this.Then(/^I should see the hero teaser$/, function() {
        expect(browser.waitForVisible(brand_listing.brandHeroTeaser, 2000));
    });
};

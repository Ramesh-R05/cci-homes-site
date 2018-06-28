var search = require('../page_objects/search_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var config = require('../../../../src/app/config/index').default;

module.exports = function() {
    // Only run search tests if search feature is enabled
    var searchEnabled = config.isFeatureEnabled('search');

    this.Then(/^I should see the search icon in the navigation bar$/, function () {
        if (searchEnabled) {
            browser.scroll(0,0);
            var searchIcon = browser.isVisible(search.searchNavIcon);
            expect(searchIcon).toBe(true);
        }
    });

    this.Then(/^I should see the search box after clicking the icon$/, function () {
        if (searchEnabled) {
            browser.click(search.searchNavIcon);
            var searchBox = browser.waitForVisible(search.searchNavBox,5000);
            expect(searchBox).toBe(true);
        }
    });

    this.Then(/^I should still see the search box after scrolling the page down$/, function () {
        if (searchEnabled) {
            browser.scroll(0,1500);
            wait(2000);
            var searchBox = browser.isVisible(search.searchNavBox);
            expect(searchBox).toBe(true);

            //Check if the box is hidden after clicking the icon again
            browser.click(search.searchNavIcon);
            wait(1000);
            var searchBox = browser.isVisible(search.searchNavBox);
            expect(searchBox).toBe(false);
        }
    });

    this.Then(/^I should be able to search a keyword "([^"]*)" on "([^"]*)" and see the result page$/, function (keyword, position) {
        if (searchEnabled) {
            var searchBox, searchSubmit;
            browser.scroll(0,0);

            switch (position){
                case 'navigation bar' :
                    searchBox = search.searchNavBox;
                    searchSubmit = search.searchNavSubmit;
                    if (browser.isVisible(search.searchNavBox) === false) {
                        browser.click(search.searchNavIcon);
                        browser.waitForVisible(searchBox,5000);
                    }
                    break;
                case 'search result page' :
                    searchBox = search.searchResultPageBox;
                    searchSubmit = search.searchResultPageSubmit;
                    break;
            }

            browser.setValue(searchBox, keyword);
            browser.click(searchSubmit);

            //Check the search result title
            browser.waitForVisible(search.searchResultPageTitle, 5000);
            var searchTitle = browser.getText(search.searchResultPageTitle);
            expect(searchTitle).toContain('RESULT');

            if (!searchTitle.includes('0 RESULTS')) {
                //Check the first teaser containing the keyword in the teaser title
                var searchTeaserTitle = browser.getText(search.searchResultPageTeaserTitle);
                if (Array.isArray(searchTeaserTitle)) {
                    searchTeaserTitle = searchTeaserTitle[0];
                }
                expect(searchTeaserTitle.toLowerCase()).toContain(keyword);
            }
        }
    });

    this.Then(/^I should not see the search bar on the search result page in mobile version$/, function () {
        if (searchEnabled) {
            var searchBox = browser.isVisible(search.searchResultPageBox);
            expect(searchBox).toBe(false);
        }
    });

};

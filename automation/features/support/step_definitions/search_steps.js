var search = require('../page_objects/search_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');

module.exports = function() {

    this.Then(/^I should see the search icon in the navigation bar$/, function () {
            browser.scroll(0,0);
            var searchIcon = browser.isVisible(search.searchNavIcon);
            expect(searchIcon).toBe(true);
    });

    this.Given(/^I click on the search icon in the navigation bar*/, () => {
        const { searchNavIcon } = search;
        
        browser.$(searchNavIcon).click();
    });

    this.Given(/^I scroll down the page$/, () => {
        browser.scroll(0,1500);
        wait(5000);
    });
    
    this.Then(/^I should see the search input$/, function () {
        const { searchNavBox } = search;                
        const searchBox = browser.$(searchNavBox).waitForVisible(5000);

        expect(searchBox).toBe(true);
    });

    this.Then(/^I should be able to search a keyword "([^"]*)" on "([^"]*)" and see the result page$/, function (keyword, position) {
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

            const capitalisedKeyword = keyword[0].toUpperCase() + keyword.slice(1)
            expect(searchTitle).toContain(`${capitalisedKeyword} results`);

            if (!searchTitle.includes('0 RESULTS')) {
                //Check the first teaser containing the keyword in the teaser title
                var searchTeaserTitle = browser.getText(search.searchResultPageTeaserTitle);
                if (Array.isArray(searchTeaserTitle)) {
                    searchTeaserTitle = searchTeaserTitle[0];
                }
                expect(searchTeaserTitle.toLowerCase()).toContain(keyword);
            }
    });

    this.Then(/^I should not see the search bar on the search result page in mobile version$/, function () {
            var searchBox = browser.isVisible(search.searchResultPageBox);
            expect(searchBox).toBe(false);
    });

};

var world = require('../world');
var window_handler = require('../../../node_modules/@bxm/automation/lib/utils/window_handler');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var loadMore = require('../page_objects/loadmore_widget');

module.exports = function() {
    //I switch to mobile|desktop|tablet view
    this.When(/^I switch to "([^"]*)" view$/, function(device) {
        var window = new window_handler(browser);
        window.windowResize(device);
    });

    this.Given(/^I am currently viewing the homepage$/, function() {
        var pageUrl = world.Urls.home_page;

        browser.url(pageUrl);
        browser.waitUntil(
            function() {
                return browser.getUrl() === pageUrl;
            },
            20000,
            'home page never loaded',
            1000
        );
    });

    this.Given(/^I am currently viewing "([^"]*)"$/, function(pagename) {
        var pageUrl = world.Urls.home_page + pagename;

        browser.url(pageUrl);
        browser.waitUntil(
            function() {
                return browser.getUrl() === pageUrl;
            },
            20000,
            `${pagename} never loaded`,
            10000
        );
    });

    this.When(/^I scroll the page down$/, function() {
        browser.scroll(0, 250);
    });

    this.When(/^I scroll the page up$/, function() {
        browser.scroll(250, 0);
    });

    this.When(/^I click on the Load More button$/, function() {
        const { loadMoreButton } = loadMore;

        function scrollAndCentreLoadMore() {
            const x = browser.getLocation(loadMoreButton, 'x');
            const y = browser.getLocation(loadMoreButton, 'y');

            browser.scroll(x, y - 150);
        }

        function forceClick(el) {
            browser.selectorExecute([el], selector => {
                selector[0].click();
            });
        }

        scrollAndCentreLoadMore();
        forceClick(loadMoreButton);

        wait(4000);
    });
};

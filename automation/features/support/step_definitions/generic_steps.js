var world = require('../world');
var window_handler = require('../utils/window_handler');

module.exports = function() {

    //I switch to mobile|desktop|tablet view
    this.When(/^I switch to "([^"]*)" view$/, function (device) {
        var window = new window_handler();
        window.windowResize(device);
    });

    this.Given(/^I am currently viewing the homepage$/, function () {
        browser.url(world.Urls.home_page);
        browser.waitUntil(function () {
            return browser.getUrl() === world.Urls.home_page;
        }, 20000, 1000);
    });

    this.Given(/^I am currently viewing "([^"]*)"$/, function (pagename) {
        browser.url(world.Urls.home_page+pagename)
        browser.waitUntil(function () {
            return browser.getUrl() === world.Urls.home_page+pagename;
        }, 20000, 1000);
    });

    this.When(/^I scroll the page down$/, function () {
        browser.scroll(0,250)
    });

    this.When(/^I scroll the page up$/, function () {
        browser.scroll(250,0)
    });
};

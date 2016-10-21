var hooks = function () {
    var world = require('./world');


    this.Before(function (scenario) {
        browser.url(world.Urls.home_page);
    });

    this.After(function (scenario) {
        browser.deleteCookie();
    });

    this.registerHandler('AfterFeatures', function (event, callback) {
        browser.endAll();
    });
};

module.exports = hooks;

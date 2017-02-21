var hooks = function () {

    this.After(function (scenario) {
        browser.deleteCookie();
    });
};

module.exports = hooks;

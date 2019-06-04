var hooks = function () {

    this.setDefaultTimeout(120 * 2000);
    console.log("Update timeout to `${120 * 2000}`");

    this.After(function (scenario) {
        browser.deleteCookie();
    });
};

module.exports = hooks;

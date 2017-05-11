var hooks = function () {

    this.setDefaultTimeout(120 * 1000);
    console.log("Update timeout to 120000");

    this.After(function (scenario) {
        browser.deleteCookie();
    });
};

module.exports = hooks;

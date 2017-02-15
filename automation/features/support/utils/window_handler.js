function window_handler() {

    var resolutions = {};
    resolutions["mobile"] = [690,900];
    resolutions["mobile portrait"] = [320,568];
    resolutions["desktop"] = [1600, 900];
    resolutions["tablet portrait"] = [768, 1024];
    resolutions["tablet landscape"] = [1024, 768];

    this.windowResize = function (device){
        browser.setViewportSize({ width: resolutions[device][0], height: resolutions[device][1] })
    };

    this.swapWindow = function (currentWindow){
        var socialWindow;
        var windows = browser.windowHandles().value;
        for (var i = 0; i < windows.length; ++i) {
            if (windows[i] !== currentWindow) {
                socialWindow = windows[i];
                break;
            }
        }
        browser.switchTab(socialWindow);
    };

    return this;

}

module.exports = window_handler;

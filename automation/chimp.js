//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var site_domain = nconf.get('APP_KEY');
var tag_id = site_domain.split("-");

module.exports = {
    //Generic config
    tags: '@'+tag_id[0],
    screenshotsOnError: true,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,
    screenshotsPath: 'screenshots',
    saveScreenshotsToDisk: true,
    webdriverio: {
        desiredCapabilities: {}
    }
};

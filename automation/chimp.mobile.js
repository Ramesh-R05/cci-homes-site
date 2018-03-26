//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var run_device = nconf.get('DEVICE');

module.exports = {

    featurePath: './features/compatibility',
    tags: '@mobile',
    offline: false,
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,

    // - - - - SELENIUM  - - - -
    user: 'bxmdeveloper1',
    key: '1kJpPSX3sEHzdWANDNqJ',
    port: 80,
    host: 'hub-cloud.browserstack.com',

    webdriverio: {
        desiredCapabilities: {
            "project": 'Homes Repo',
            "device": run_device,
            "browserstack.debug": true,
            "realMobile" : true
        }
      }
};

//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var run_device = nconf.get('DEVICE');

module.exports = {

    featurePath: './features/mobile',
    tags: '@devices',
    offline: false,
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,

    // - - - - SELENIUM  - - - -
    name: 'Homes Repo',
    user: 'bxmdeveloper1',
    key: 'QmqNpg983H2ucStjNMu9',
    port: 80,
    host: 'hub.browserstack.com',

    webdriverio: {
        desiredCapabilities: {
            device: run_device,
            project: 'Homes To Love',
            "browserstack.debug": true
        }
      }
};

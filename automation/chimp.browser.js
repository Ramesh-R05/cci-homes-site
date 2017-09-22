//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var run_version = nconf.get('BrowserVersion');
var run_os = nconf.get('BrowserOs');
var run_osversion = nconf.get('BrowserOsVersion');

module.exports = {

    featurePath: './features/compatibility',
    tags: '@browser',
    offline: false,
    screenshotsOnError: false,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,

    // - - - - SELENIUM  - - - -
    user: 'bxmdeveloper1',
    key: 'QmqNpg983H2ucStjNMu9',
    port: 80,
    host: 'hub-cloud.browserstack.com',

    webdriverio: {
        desiredCapabilities: {
            "project": 'Homes Repo',
            "browser_version": run_version,
            "os": run_os,
            "os_version": run_osversion,
            'resolution' : '1920x1080',
            "browserstack.debug": true
        }

    }
};

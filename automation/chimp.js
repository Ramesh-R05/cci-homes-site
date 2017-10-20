module.exports = {
    //Generic config
    screenshotsOnError: false,
    //screenshotsPath: './screenshots',
    captureAllStepScreenshots: false,
    //saveScreenshotsToReport: false,
    //saveScreenshotsToDisk: true,
    jsonOutput: 'reports/regression.json',
    webdriverio: {
        desiredCapabilities: {
            // go to https://peter.sh/experiments/chromium-command-line-switches/
            chromeOptions: {
                args: ["--enable-automation", "--allow-insecure-localhost"]
            }
        }
    },

    phantom_ignoreSSLErrors: true,

    // - - - - SELENIUM-STANDALONE
    seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '3.0.1',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '2.29',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            }
        }
    }

};

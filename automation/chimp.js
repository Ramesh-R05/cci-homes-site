module.exports = {
    //Generic config
    screenshotsOnError: true,
    captureAllStepScreenshots: false,
    saveScreenshotsToReport: false,
    screenshotsPath: 'screenshots',
    saveScreenshotsToDisk: true,

    featurePath: './features/mobile',

    webdriverio: {
        desiredCapabilities: {
            chromeOptions: {
                args: ["--enable-automation", "headless", "disable-gpu"]
            }
        }
    },


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



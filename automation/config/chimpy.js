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
                args: [
                    '--enable-automation',
                    '--allow-insecure-localhost',
                    '--headless',
                    `--proxy-server='direct://'`,
                    '--proxy-bypass-list=*',
                    '--disable-gpu',
                    '--enable-logging',
                    '--no-sandbox',
                    '--enable-features=NetworkService,NetworkServiceInProcess',
                    '--disable-setuid-sandbox'
                ]
            }
        }
    },

    phantom_ignoreSSLErrors: true,

    // - - - - SELENIUM-STANDALONE
    seleniumStandaloneOptions: {
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '3.9.0',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        drivers: {
            chrome: {
                // check for more recent versions of chrome driver here:
                // http://chromedriver.storage.googleapis.com/index.html
                version: '74.0.3729.6',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            }
        }
    }
};

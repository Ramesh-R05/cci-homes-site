/*
    these are the arguments passed to the chimpy cli when the bxm-automation command is run
    for a full list of possible arguments, follow this link
    https://github.com/TheBrainFamily/chimpy/blob/master/src/bin/default.js
*/

const path = require('path');
require('dotenv').config({
    path: path.resolve(process.cwd(), '../src/.sit.env')
});

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
                version: '75.0.3770.140',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            }
        }
    }
};

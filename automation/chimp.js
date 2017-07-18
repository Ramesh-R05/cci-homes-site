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
    }
};

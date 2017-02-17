module.exports = {
    offline: false,
    tags: '@high',
    // - - - - SELENIUM  - - - -
    browser: 'Chrome',
    platform: 'WIN8',
    name: 'Homes Repo',
    user: 'yichen2',
    key: 'foeFJmYhApmMpwdyPA1q',
    port: 80,
    host: 'hub.browserstack.com',
    webdriverio: {
        desiredCapabilities: {"browserstack.debug": true}
    }
};

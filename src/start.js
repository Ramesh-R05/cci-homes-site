process.env.APP_KEY = 'homes-site';
process.title = process.env.APP_KEY;
require('babel-polyfill');
require('babel-register');
var logger = require('./logger');
require('./apm');
var fs = require('fs');
var requiredFile = './dist/scripts/main.js';
var retryDelay = 5000;
var attemptCount = 0;
var maxAttempts = 12;

function startWhenReady() {
    attemptCount++;
    clearTimeout(startWhenReady);
    if (fs.existsSync(requiredFile)) {
        logger.info(`${requiredFile} exists, ok to start`);
        require('./app/server/server');
    } else if (attemptCount <= maxAttempts) {
        logger.info(`watchify is building ${requiredFile} - waiting ${retryDelay / 1000} more seconds`);
        setTimeout(startWhenReady, retryDelay);
    } else {
        throw new Error(`requiredFile not found within ${(maxAttempts * retryDelay) / 1000} seconds`);
    }
}

try {
    startWhenReady();
} catch (e) {
    console.log(e);
}

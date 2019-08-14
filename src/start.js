process.env.APP_KEY = 'homes-site';
process.title = process.env.APP_KEY;

process.on('uncaughtException', function(e) {
    throw e;
});

require('@babel/polyfill');
require('@babel/register');

const path = require('path');

require('dotenv').config({
    path: process.env.APP_ENV === 'prod' ? path.resolve(process.cwd(), '.prod.env') : path.resolve(process.cwd(), '.sit.env')
});

const logger = require('./logger').default;
require('./apm');
const fs = require('fs');
const requiredFile = './dist/manifest.json';
const retryDelay = 5000;
let attemptCount = 0;
const maxAttempts = 12;
let timerId = null;

function startWhenReady() {
    attemptCount++;
    if (timerId) {
        clearTimeout(timerId);
        timerId = null;
    }
    if (fs.existsSync(requiredFile)) {
        logger.info(`${requiredFile} exists, ok to start`);
        require('./app/server/server');
    } else if (attemptCount <= maxAttempts) {
        logger.info(`${requiredFile} in progress - waiting ${retryDelay / 1000} more seconds`);
        timerId = setTimeout(startWhenReady, retryDelay);
    } else {
        throw new Error(`requiredFile not found within ${(maxAttempts * retryDelay) / 1000} seconds`);
    }
}

if (process.env.APP_DEBUG === 'true') {
    try {
        startWhenReady();
    } catch (e) {
        logger.error(e);
    }
} else {
    startWhenReady();
}

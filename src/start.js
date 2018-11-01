process.env.APP_KEY = 'homes-site';
process.title = process.env.APP_KEY;
process.on('uncaughtException', function(e) {
    throw e;
});
require('babel-polyfill');
require('babel-register');
var logger = require('./logger');
require('./apm');
// var fs = require('fs');
// var requiredFile = './dist/manifest.json';
// var retryDelay = 5000;
// var attemptCount = 0;
// var maxAttempts = 12;
// var timerId = null;

// function startWhenReady() {
//     attemptCount++;
//     if (timerId) {
//         clearTimeout(timerId);
//         timerId = null;
//     }
//     if (fs.existsSync(requiredFile)) {
//         logger.info(`${requiredFile} exists, ok to start`);

//     } else if (attemptCount <= maxAttempts) {
//         logger.info(`${requiredFile} in progress - waiting ${retryDelay / 1000} more seconds`);
//         timerId = setTimeout(startWhenReady, retryDelay);
//     } else {
//         throw new Error(`requiredFile not found within ${(maxAttempts * retryDelay) / 1000} seconds`);
//     }
// }

// if (process.env.APP_DEBUG === 'true') {
//     try {
//         startWhenReady();
//     } catch (e) {
//         logger.error(e);
//     }
// } else {
//     startWhenReady();
// }

if (process.env.APP_DEBUG === 'true') {
    try {
        require('./app/server/server');
    } catch (e) {
        logger.error(e);
    }
} else {
    require('./app/server/server');
}

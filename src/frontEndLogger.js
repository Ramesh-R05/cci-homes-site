import { LogglyTracker } from 'loggly-jslogger';

function timeStamp() {
    const d = new Date();
    const h = `0${d.getHours()}`.slice(-2);
    const m = `0${d.getMinutes()}`.slice(-2);
    const s = `0${d.getSeconds()}`.slice(-2);
    const ms = `00${d.getMilliseconds()}`.slice(-3);

    return `${h}:${m}:${s}.${ms}`;
}

const frontendLogger = new LogglyTracker();

if (process.env.APP_ENV === 'prod' || process.env.APP_ENV === 'sit') {
    frontendLogger.push({
        logglyKey: '9b4a2693-dc77-4e7e-a5ee-498845c59793',
        subDomain: 'bauerdigital',
        tags: [process.env.APP_KEY, process.env.APP_ENV, 'front-end-logs'],
        sendConsoleErrors: true,
        useUtfEncoding: true
    });
    frontendLogger.push({
        product: process.env.APP_KEY,
        env: process.env.APP_ENV || process.env.NODE_ENV || 'local',
        region: process.env.APP_REGION || process.env.NODE_REGION || 'au'
    });
} else {
    frontendLogger.push(timeStamp());
}

frontendLogger.push({ HTTP_PROXY: [`HTTP_PROXY=${process.env.HTTP_PROXY ? 'set' : 'not set'}`].join(' ') });

frontendLogger.push({ NODE_ENV: [`NODE_ENV=${process.env.NODE_ENV}`, `NODE_REGION=${process.env.NODE_REGION}`].join(' ') });

frontendLogger.push({
    APP_CONFIG: [
        `APP_KEY=${process.env.APP_KEY}`,
        `APP_REGION=${process.env.APP_REGION}`,
        `APP_DEBUG=${process.env.APP_DEBUG}`,
        `APP_STUBBED=${process.env.APP_STUBBED}`,
        `APP_ENV=${process.env.APP_ENV}`,
        `ADS_DEBUG=${process.env.ADS_DEBUG}`
    ].join(' ')
});

export default frontendLogger;

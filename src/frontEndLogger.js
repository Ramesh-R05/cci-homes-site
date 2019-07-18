import { LogglyTracker } from 'loggly-jslogger';

const frontendLogger = new LogglyTracker();

frontendLogger.push({
    logglyKey: '9b4a2693-dc77-4e7e-a5ee-498845c59793',
    subDomain: 'bauerdigital',
    tag: 'front-end-logs',
    sendConsoleErrors: true,
    useUtfEncoding: true
});

export default frontendLogger;

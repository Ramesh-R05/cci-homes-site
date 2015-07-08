/**
 full config available @ /node_modules/newrelic/lib/config.default.js
 **/

console.log('[newrelic] loading config');

exports.config = {
    app_name: '', // @env NEW_RELIC_APP_NAME
    license_key: '', // @env NEW_RELIC_LICENSE_KEY
    capture_params: true // @env NEW_RELIC_CAPTURE_PARAMS
};

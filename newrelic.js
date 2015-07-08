/**
 full config available @ /node_modules/newrelic/lib/config.default.js
 **/

console.log('[newrelic] loading config');

exports.config = {
    app_name: 'homes', // @env NEW_RELIC_APP_NAME
    license_key: '40e158e837451fabe2c4f40b01133c139b227359', // @env NEW_RELIC_LICENSE_KEY
    capture_params: true // @env NEW_RELIC_CAPTURE_PARAMS
};

if (!process.env.APP_KEY) throw new Error('APP_KEY environment variable not set');

require('@bxm/node-apm')(process.env.APP_KEY);
require('babel-polyfill');
require('babel-register');

module.exports =  require('./app/server/server');

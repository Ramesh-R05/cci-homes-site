'use strict';

require("babel/register")({
    ignore: /\/node_modules\/(?!@bxm)/
});

module.exports = require('./app/server/server');

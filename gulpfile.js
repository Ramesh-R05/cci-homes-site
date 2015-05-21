'use strict';

require('babel/register')({
    ignore: /\/node_modules\/(?!@bxm)/
});

var config = require('@bxm/node-tasks/lib/config');
config.style.glob = 'styles/**/*.scss';
config.style.path = './styles/';
config.style.main = 'main.scss';

require('@bxm/node-tasks');

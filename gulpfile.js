'use strict';

require('babel/register')({
    ignore: /\/node_modules\/(?!@bxm)/
});

var config = require('@bxm/node-tasks/lib/config');
config.breakpoints.input = './styles/helpers/_breakpoints.scss';
config.style.glob = 'styles/**/*.scss';
config.style.path = './styles/';
config.style.main = 'main.scss';
config.lint.js = true;
config.lint.scss = true;
config.lint.jsGradualLint = true;
config.browserify.libModules = [
    'picturefill',
    'moment',
    'lodash',
    'request',
    'classnames',
    'serialize-javascript',
    'superagent'
];

require('@bxm/node-tasks');
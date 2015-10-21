'use strict';

require('babel/register')({
    ignore: /\/node_modules\/(?!@bxm)/
});

var config = require('@bxm/node-tasks/lib/config');
config.style.glob = 'styles/**/*.scss';
config.style.path = './styles/';
config.style.paths.push('./node_modules/@bxm/gallery/styles', './node_modules/@bxm/ad/styles');
config.style.main = 'main.scss';
config.lint.js = true;
config.lint.scss = true;

require('@bxm/node-tasks');

'use strict';

var cloneDeep = require('lodash/lang/cloneDeep');

var start = function(port) {
    var express = require('express');
    var server = express();

    server.get('/', function(req, res) {
        var home = require(process.cwd() + '/automation/test_data/home');
        res.json(home);
    });

    server.get('/section/article-hero-image', function(req, res) {
        var article_hero_image = require(process.cwd() + '/automation/test_data/article_hero_image');
        res.json(article_hero_image);
    });

    server.get('/section/article-hero-video', function(req, res) {
        var article_hero_video = require(process.cwd() + '/automation/test_data/article_hero_video');
        res.json(article_hero_video);
    });

    server.listen(port);
    console.info('listening on port ' + port);
};

module.exports = {
    start: start
};


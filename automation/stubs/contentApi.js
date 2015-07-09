'use strict';

var start = function(port) {
    var express = require('express');
    var server = express();
    var cwd = process.cwd();

    server.get('/', function(req, res) {
        var home = require(process.cwd() + '/automation/test_data/home');
        res.json(home);
    });

    // Section
    server.get('/section', function(req, res) {
        var home = require(cwd + '/automation/test_data/section');
        res.json(home);
    });

    server.get('/faceted/:moduleId', function(req, res) {
        var home = require(cwd + '/automation/test_data/faceted/' + req.params.moduleId);
        res.json(home);
    });

    server.get('/section/article-hero-image', function(req, res) {
        var article_hero_image = require(cwd + '/automation/test_data/article_hero_image');
        res.json(article_hero_image);
    });

    server.get('/section/article-hero-video', function(req, res) {
        var article_hero_video = require(cwd + '/automation/test_data/article_hero_video');
        res.json(article_hero_video);
    });

    server.listen(port);
    console.info('listening on port ' + port);
};

module.exports = {
    start: start
};


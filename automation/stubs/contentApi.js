'use strict';
var isUndefined = require('lodash/lang/isUndefined');

var start = function(port) {
    var express = require('express');
    var server = express();
    var cwd = process.cwd();

    server.all('*', function(req, res, next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTION, POST, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
        next();
    });

    //Homepage
    server.get('/', function(req, res) {
        var home = require(process.cwd() + '/automation/test_data/home');
        res.json(home);
    });

    server.get('/inline-gallery', function(req, res) {
        var inlineGallery = require(cwd + '/automation/test_data/faceted/inline-gallery');
        res.json(inlineGallery);
    });

    //Brand - Australian House and Garden
    server.get('/brand', function(req, res) {
        var brand = require(cwd + '/automation/test_data/brand');
        res.json(brand);
    });

    server.get('/brand-australian-house-garden', function(req, res) {
        var facetData = require(cwd + '/automation/test_data/faceted/brand-australian-house-garden');
        res.json(facetData);
    });

    //Section
    server.get('/section', function(req, res) {
        var home = require(cwd + '/automation/test_data/section');
        res.json(home);
    });

    server.get('/section-articles', function(req, res, next) {
        var home;

        if (!isUndefined(req.query.page)) {
            var page = parseInt(req.query.page, 10);
            if (page > 2) {
                throw ('Only Page 0,1 & 2 implemented in test. Page= ' + page + ' passed.');
            }
            home = require(cwd + '/automation/test_data/faceted/section-articles-page' + req.query.page);
        }
        else if (!isUndefined(req.query.pagestart) && !isUndefined(req.query.pageend)) {
            var pageStart = parseInt(req.query.pagestart, 10);
            var pageEnd = parseInt(req.query.pageend, 10);
            if (pageStart > pageEnd) {
                throw ('pageStart >' + ' pageEnd');
            }
            if (pageEnd > 2) {
                throw ('Only Page 0,1 & 2 implemented in test. PageEnd= ' + pageEnd + ' passed.');
            }
            if (pageStart === pageEnd) {
                home = require(cwd + '/automation/test_data/faceted/section-articles-page' + pageStart);
            }
            else{
                home = require(cwd + '/automation/test_data/faceted/section-articles-pages-' + pageStart + '-' + pageEnd);
            }
        } else{
            throw ('Page is not specified');
        }
        res.json(home);
    });

    //Article Pages
    server.get('/section/article-hero-image', function(req, res) {
        var article_hero_image = require(cwd + '/automation/test_data/article_hero_image');
        res.json(article_hero_image);
    });

    server.get('/section/article-hero-video', function(req, res) {
        var article_hero_video = require(cwd + '/automation/test_data/article_hero_video');
        res.json(article_hero_video);
    });

    server.get('/feed-articles', function(req, res) {
        var article_lhr = require(cwd + '/automation/test_data/faceted/feed-articles');
        res.json(article_lhr);
    });

    //Gallery
    server.get('/section/gallery', function(req, res) {
        var gallery = require(cwd + '/automation/test_data/gallery');
        res.json(gallery);
    });

    //Tag Landing Page - Feature Home
    server.get('/tags/feature-home', function(req, res) {
        var tag_landing = require(cwd + '/automation/test_data/tag');
        res.json(tag_landing);
    });

    server.get('/tag-feature-home', function(req, res) {
        var tag_landing = require(cwd + '/automation/test_data/faceted/tag-feature-home');
        res.json(tag_landing);
    });

    server.listen(port);
    console.info('listening on port ' + port);
};

module.exports = {
    start: start
};


import { load } from '@bxm/config';
import express from 'express';
import isUndefined from 'lodash/lang/isUndefined';
const config = load();

export default function start(port, site) {
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
        var home = require(process.cwd() + '/automation/test_data/pages/home');
        res.json(home);
    });

    server.get('/inline-gallery', function(req, res) {
        var inlineGallery = require(cwd + '/automation/test_data/faceted/inline-gallery');
        res.json(inlineGallery);
    });

    //Brand - Australian House and Garden
    server.get('/australian-house-and-garden', function(req, res) {
        var brand = require(cwd + '/automation/test_data/pages/australian-house-and-garden');
        res.json(brand);
    });

    server.get('/brand-australian-house-and-garden', function(req, res) {
        var facetData = require(cwd + '/automation/test_data/faceted/brand-australian-house-and-garden');
        res.json(facetData);
    });

    //Section Landing Page - Home Tours
    server.get('/home-tours', function(req, res) {
        var section_home_tours = require(cwd + '/automation/test_data/pages/section_landing');
        res.json(section_home_tours);
    });

    server.get('/section-home-tours', function(req, res) {
        var article_lhr = require(cwd + '/automation/test_data/faceted/section-home-tours');
        res.json(article_lhr);
    });

    //Section Landing Page - Load More
    server.get('/section', function(req, res) {
        var home = require(cwd + '/automation/test_data/pages/section_load_more');
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

    //Article Page - Hero Image
    server.get('/section/article-hero-image', function(req, res) {
        var article_hero_image = require(cwd + '/automation/test_data/pages/article');
        res.json(article_hero_image);
    });

    //Article Page - Hero Video
    server.get('/section/article-hero-video', function(req, res) {
        var article_hero_video = require(cwd + '/automation/test_data/pages/videoArticle');
        res.json(article_hero_video);
    });

    //Article Page - Competition
    server.get('/competition', function(req, res) {
        var competition = require(cwd + '/automation/test_data/pages/competition');
        res.json(competition);
    });

    //Article Page - LHR
    server.get('/feed-articles', function(req, res) {
        var article_lhr = require(cwd + '/automation/test_data/faceted/feed-articles');
        res.json(article_lhr);
    });

    //Gallery
    server.get('/section/gallery', function(req, res) {
        var gallery = require(cwd + '/automation/test_data/pages/gallery');
        res.json(gallery);
    });

    //Tag Landing Page - Feature Home
    server.get('/tags/feature-home', function(req, res) {
        var tag_landing = require(cwd + '/automation/test_data/pages/tag');
        res.json(tag_landing);
    });

    server.get('/tag-feature-home', function(req, res) {
        var tag_landing = require(cwd + '/automation/test_data/faceted/tag-feature-home');
        res.json(tag_landing);
    });

    //Share Repo Gallery
    server.get('/fashion/automation-test-gallery-13302', function(req, res) {
        var gallery = require(cwd + '/automation/test_data/pages/gallery');
        res.json(gallery);
    });

    server.listen(port);
    console.info('listening on port ' + port);

    server.get('/fashion/automation-test-article-with-hero-image-3663', function(req, res) {
        var subSectionPage = require('../../automation/test_data/pages/article');
        res.json(subSectionPage);
    });

    server.get('/fashion/automation-test-article-with-hero-video-3664', function(req, res) {
        var subSectionPage = require('../../automation/test_data/pages/videoArticle');
        res.json(subSectionPage);
    });

};
import express from 'express';
import isUndefined from 'lodash/lang/isUndefined';
import get from 'lodash/object/get';

const servicesStubs = express.Router();
const cwd = process.cwd();

servicesStubs.get('/', function(req, res) {
    var home = require(cwd + '/automation/test_data/pages/home');
    res.json(home);
});

servicesStubs.get('/inline-gallery', function(req, res) {
    var inlineGallery = require(cwd + '/automation/test_data/faceted/inline-gallery');
    res.json(inlineGallery);
});

//Brand - Australian House and Garden
servicesStubs.get('/australian-house-and-garden', function(req, res) {
    var brand = require(cwd + '/automation/test_data/pages/australian-house-and-garden');
    res.json(brand);
});

servicesStubs.get('/brand-australian-house-and-garden', function(req, res) {
    var facetData = require(cwd + '/automation/test_data/faceted/brand-australian-house-and-garden');
    res.json(facetData);
});

//Section Landing Page - Home Tours
servicesStubs.get('/home-tours', function(req, res) {
    var section_home_tours = require(cwd + '/automation/test_data/pages/section_landing');
    res.json(section_home_tours);
});

servicesStubs.get('/section-home-tours', function(req, res) {
    var article_lhr = require(cwd + '/automation/test_data/faceted/section-home-tours');
    res.json(article_lhr);
});

//Section Landing Page - Load More
servicesStubs.get('/section', function(req, res) {
    var home = require(cwd + '/automation/test_data/pages/section_load_more');
    res.json(home);
});

// used for retrieving stubbed articles via facetedModule for `/section`
servicesStubs.get('/section-articles', function(req, res, next) {
    console.log(req.originalUrl);
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
servicesStubs.get('/section/article-hero-image', function(req, res) {
    var article_hero_image = require(cwd + '/automation/test_data/pages/article');
    res.json(article_hero_image);
});

//Article Page - Hero Video
servicesStubs.get('/section/article-hero-video', function(req, res) {
    var article_hero_video = require(cwd + '/automation/test_data/pages/videoArticle');
    res.json(article_hero_video);
});

//Article Page - Competition
servicesStubs.get('/competition', function(req, res) {
    var competition = require(cwd + '/automation/test_data/pages/competition');
    res.json(competition);
});

//Article Page - LHR
servicesStubs.get('/feed-articles', function(req, res) {
    var article_lhr = require(cwd + '/automation/test_data/faceted/feed-articles');
    res.json(article_lhr);
});

//Gallery
servicesStubs.get('/section/gallery', function(req, res) {
    var gallery = require(cwd + '/automation/test_data/pages/gallery');
    res.json(gallery);
});

//Tag Landing Page - Feature Home
servicesStubs.get('/tags/feature-home', function(req, res) {
    var tag_landing = require(cwd + '/automation/test_data/pages/tag');
    res.json(tag_landing);
});

servicesStubs.get('/tag-feature-home', function(req, res) {
    var tag_landing = require(cwd + '/automation/test_data/faceted/tag-feature-home');
    res.json(tag_landing);
});

//Share Repo Gallery
servicesStubs.get('/fashion/automation-test-gallery-13302', function(req, res) {
    var gallery = require(cwd + '/automation/test_data/pages/gallery');
    res.json(gallery);
});

servicesStubs.get('/fashion/automation-test-article-with-hero-image-3663', function(req, res) {
    var subSectionPage = require(cwd + '/automation/test_data/pages/article');
    res.json(subSectionPage);
});

servicesStubs.get('/fashion/automation-test-article-with-hero-video-3664', function(req, res) {
    var subSectionPage = require(cwd + '/automation/test_data/pages/videoArticle');
    res.json(subSectionPage);
});

// content service stub routes
servicesStubs.get('/entity-service/homepage', function(req, res) {
    var home = require(cwd + '/stubs/entity-homepage');
    res.json(home);
});

servicesStubs.get('/entity-service/section/:section', function(req, res) {
    var section = require(cwd + `/stubs/entity-${req.params.section.toLowerCase()}`);
    res.json(section);
});

servicesStubs.get('/entity-service/:page', function(req, res) {

    let pageId = req.url.match(/\d{3,100}/)[0];
    const pageResponse =  require(cwd + `/stubs/entity-${pageId}`);
    res.json(pageResponse);

});

servicesStubs.get('/listings-service/teasers/', function(req, res) {
    const {$filter} = req.query;
    const sourceMatch = $filter.match(/source eq '([^']+)'/i);
    const tagMatch = $filter.includes('tags');
    const galleryMatch = $filter.includes('Gallery');
    
    let teaserResponse = {
        totalCount: 0,
        data: []
    };

    if (sourceMatch) {
        const source = sourceMatch[1].replace(/ /g, '-').replace(/\W$/, '-plus');
        teaserResponse.data = require(cwd + `/stubs/listings-${source.toLowerCase()}`);
        teaserResponse.totalCount = teaserResponse.data.length;
    }

    if (tagMatch) {
        const tagSource = $filter.replace(/[']/ig, '').replace(/[^a-z]/ig, '-').replace('tags-eq-', '');
        teaserResponse = require(cwd + `/stubs/listings-${tagSource}`);
    }

    if (galleryMatch) {
        const galleryResponse = require(cwd + '/stubs/listings-gallery');
        res.json(galleryResponse)
    }

    res.json(teaserResponse);

});

servicesStubs.get('/listings-service/teasers', function(req,res) {

    const {$filter} = req.query;
    

    

});

servicesStubs.get('/module-service/:modules?', function(req, res) {
    const moduleParam = get(req, 'params.modules');
    let moduleNames = [];
    if (moduleParam) {
        moduleNames = moduleParam.split(',');
    }

    const moduleData = moduleNames.reduce((prev, curr) => {
        const module = require(`${cwd}/stubs/module-${curr.toLowerCase()}`);
        prev.push(module);

        return prev;
    }, []);

    res.json({
        totalCount: moduleNames.length,
        data: moduleData
    });
});

// catch any unhandled stub routes
servicesStubs.use(function(req, res) {
    console.log('[app/server/servicesStubs] Unhandled route for url - ', req.originalUrl);
    res.status(404).json({});
});

export default servicesStubs;

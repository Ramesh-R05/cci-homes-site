import Module from 'module';
import express from 'express';
import get from 'lodash/object/get';

const servicesStubs = express.Router();
const cwd = process.cwd();

function requireWithNoCache(path) {
    delete require.cache[Module._resolveFilename(path, module)];
    return module.require(path);
}

servicesStubs.get('/entity-service/', function(req, res) {
    const {query} = req;

    let queryPath = '';
    for (const [key, value] of Object.entries(query)) {
        queryPath += `${key.toLowerCase()}-${value.toLowerCase()}-`;
    }
    queryPath = queryPath.replace(/-$/, '');

    const entityPath = require(cwd + `/stubs/entity-${queryPath}`);
    res.json(entityPath);
});

servicesStubs.get('/entity-service/homepage', function(req, res) {
    const home = require(cwd + '/stubs/entity-homepage');
    res.json(home);
});

servicesStubs.get('/entity-service/section/:section', function(req, res) {
    const section = require(cwd + `/stubs/entity-${req.params.section.toLowerCase()}`);
    res.json(section);
});

servicesStubs.get('/entity-service/:page', function(req, res) {

    let pageId = req.url.match(/\d{3,}/)[0];
    const pageResponse =  require(cwd + `/stubs/entity-${pageId}`);
    res.json(pageResponse);

});

servicesStubs.get('/listings-service/teasers', function(req, res) {
    const {$filter, $top} = req.query;
    const homepageMatch = ($filter ==  `nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery'`);
    const sourceMatch = $filter.match(/^source eq '([^']+)'$/i);
    const tagMatch = $filter.match(/^(tags|tagsDetails\/(urlName|fullName)) eq '([^']+)'$/i);
    const galleryMatch = $filter.match(/^nodeTypeAlias eq 'Gallery'/i);
    const campaignMatch = $filter.match(/^\(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery'\) and sponsorName eq '([^']+)'$/i)

    let teaserResponse = {
        totalCount: 0,
        data: []
    };

    if (homepageMatch) {
        const teaserData = requireWithNoCache(cwd + `/stubs/listings-homepage`);
        if ($top) teaserData.data.splice($top);
        teaserResponse = teaserData;
    }

    if (sourceMatch) {
        const source = sourceMatch[1].replace(/ /g, '-').replace(/\W$/, '-plus');
        const teaserData = requireWithNoCache(cwd + `/stubs/listings-${source.toLowerCase()}`);
        if ($top) teaserData.data.splice($top);
        teaserResponse = teaserData;
    }

    if (tagMatch) {
        const tag = tagMatch[3].replace(/ |:|_/g, '-');
        const teaserData = requireWithNoCache(cwd + `/stubs/listings-${tag}`);
        if ($top) teaserData.data.splice($top);
        teaserResponse = teaserData;
    }

    if (galleryMatch) {
        const galleryResponse = requireWithNoCache(cwd + '/stubs/listings-gallery');
        res.json(galleryResponse);
        return;
    }

    if (campaignMatch) {
        const sponsor = campaignMatch[1].toLowerCase().replace(/\W/g, '-');
        const sponsorResponse = requireWithNoCache(cwd + `/stubs/listings-campaign-${sponsor}`);
        res.json(sponsorResponse);
        return;
    }

    res.json(teaserResponse);

});

servicesStubs.get('/tag-service/tags', function(req, res) {
    const {urlName} = req.query;

    let teaserResponse = {};

    if (urlName) {
        teaserResponse = require(cwd + `/stubs/tag-${urlName}`);
    }

    res.json(teaserResponse);

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

/* eslint-disable global-require, import/no-dynamic-require, max-len */

import express from 'express';
import get from 'lodash/object/get';
import logger from '../../logger';

const servicesStubs = express.Router();
const cwd = process.cwd();

function requireWithNoCache(path) {
    delete require.cache[require.resolve(path)];
    return require(path);
}

servicesStubs.use((req, res, next) => {
    logger.debug(`stub route match for ${req.originalUrl}`);
    next();
});

servicesStubs.get('/entity-service/', (req, res) => {
    const { query } = req;
    const queryPath = Object.entries(query)
        .reduce((string, [key, value]) => {
            let newString = string;
            newString += `${key.toLowerCase()}-${value.toLowerCase()}-`;
            return newString;
        }, '')
        .replace(/-$/, '');

    const entityPath = require(`${cwd}/stubs/entity-${queryPath}`);
    res.json(entityPath);
});

servicesStubs.get('/entity-service/homepage', (req, res) => {
    const home = require(`${cwd}/stubs/entity-homepage`);
    res.json(home);
});

servicesStubs.get('/entity-service/alltagsections', (req, res) => {
    const alltagsections = require(`${cwd}/stubs/entity-alltagsections`);
    res.json(alltagsections);
});

servicesStubs.get('/entity-service/section/:section', (req, res) => {
    const section = require(`${cwd}/stubs/entity-${req.params.section.toLowerCase()}`);
    res.json(section);
});

servicesStubs.get('/entity-service/:page', (req, res) => {
    const pageId = req.url.match(/\d{3,}/)[0];
    const pageResponse = require(`${cwd}/stubs/entity-${pageId}`);
    res.json(pageResponse);
});

servicesStubs.get('/listings-service/teasers', (req, res) => {
    const { $filter, $top } = req.query;

    const homepageMatch = $filter === `(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and path ne 'HOMES-10958'`;
    const sourceMatch = $filter.match(/^source eq '([^']+)'$/i);
    const tagMatch = $filter.match(/^(tags|tagsDetails\/(urlName|fullName)) eq '([^']+)'$/i);
    const galleryMatch = $filter.match(/^nodeTypeAlias eq 'Gallery'/i);
    const campaignMatch = $filter.match(/^\(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery'\) and sponsorName eq '([^']+)'$/i);
    const latestRealHomesMatch =
        $filter === "(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and tagsDetails/fullName eq 'food_Homes_navigation_Real_Homes'";
    const baseDirectoriesMatch = $filter === `tagsDetails/fullName eq 'food_Homes_navigation_directories'`;
    const latestVideos = $filter === `(nodeTypeAlias eq 'HomesArticle' and contentHasVideo eq 'true')`;

    let teaserResponse = {
        totalCount: 0,
        data: []
    };

    if (latestVideos) {
        const teaserData = requireWithNoCache(`${cwd}/stubs/listings-latest-videos`);
        if ($top) teaserData.data.splice($top);
        teaserResponse = teaserData;
    }

    if (baseDirectoriesMatch) {
        const teaserData = requireWithNoCache(`${cwd}/stubs/listings-directories`);
        teaserResponse = teaserData;
    }

    if (homepageMatch) {
        const teaserData = requireWithNoCache(`${cwd}/stubs/listings-homepage`);
        if ($top) teaserData.data.splice($top);
        teaserResponse = teaserData;
    }

    if (sourceMatch) {
        const source = sourceMatch[1].replace(/ /g, '-').replace(/\W$/, '-plus');
        const teaserData = requireWithNoCache(`${cwd}/stubs/listings-${source.toLowerCase()}`);
        if ($top) teaserData.data.splice($top);
        teaserResponse = teaserData;
    }

    if (tagMatch) {
        const tag = tagMatch[3].replace(/ |:|_/g, '-');
        const teaserData = requireWithNoCache(`${cwd}/stubs/listings-${tag}`);
        if ($top) teaserData.data.splice($top);
        teaserResponse = teaserData;
    }

    if (galleryMatch) {
        const galleryResponse = requireWithNoCache(`${cwd}/stubs/listings-gallery`);
        res.json(galleryResponse);
        return;
    }

    if (campaignMatch) {
        const sponsor = campaignMatch[1].toLowerCase().replace(/\W/g, '-');
        const sponsorResponse = requireWithNoCache(`${cwd}/stubs/listings-campaign-${sponsor}`);
        res.json(sponsorResponse);
        return;
    }

    if (latestRealHomesMatch) {
        const latestRealHomes = requireWithNoCache(`${cwd}/stubs/listings-food-Homes-navigation-Real-Homes`);
        latestRealHomes.data.splice(4);
        res.json(latestRealHomes);
        return;
    }

    res.json(teaserResponse);
});

servicesStubs.get('/tag-service/tags', (req, res) => {
    const { urlName } = req.query;

    let teaserResponse = {};

    if (urlName) {
        teaserResponse = require(`${cwd}/stubs/tag-${urlName}`);
    }

    res.json(teaserResponse);
});

servicesStubs.get('/module-service/:modules?', (req, res) => {
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

servicesStubs.use((req, res) => {
    logger.error(`no stub route match for ${req.originalUrl}`);
    res.status(404).json({});
});

export default servicesStubs;

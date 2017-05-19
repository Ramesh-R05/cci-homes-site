import makeRequest from '../../makeRequest';
import { parseEntity, parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';

export default async function homeMiddleware(req, res, next) {
    try {
        const itemsCount = 6;
        const { brand, navSection, tag, page, campaign } = req.query;
        if (brand || navSection || tag || page || campaign) {
            next();
            return;
        }

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip = (pageNo - 1) * pageSize;

        const filter = 'nodeTypeAlias eq \'HomesArticle\' or nodeTypeAlias eq \'Gallery\'';
        // eslint-disable-next-line max-len
        const realHomesFilter = '(nodeTypeAlias eq \'HomesArticle\' or nodeTypeAlias eq \'Gallery\') and tagsDetails/fullName eq \'food_Homes_navigation_Real_Homes\'';
        const [pageData, latestTeasersResp, latestRealHomesResp, heroModuleResp] = await Promise.all([
            makeRequest(`${req.app.locals.config.services.remote.entity}/homepage`),
            getLatestTeasers(itemsCount, skip, filter),
            getLatestTeasers(4, 0, realHomesFilter),
            makeRequest(`${req.app.locals.config.services.remote.module}/homepagehero`)
        ]);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];
        const latestRealHomes = (latestRealHomesResp && latestRealHomesResp.data) || [];

        const heroModule = (heroModuleResp.data && heroModuleResp.data[0]) || {};
        const hero = (heroModule.moduleManualContent && heroModule.moduleManualContent.data[0]) || {};

        const list = {
            params: {
                listName: 'home',
                basePath: '/',
                offset: itemsCount,
                pageNo,
                pageSize,
                filter
            }
        };

        res.body = {
            ...res.body,
            entity: parseEntity(pageData),
            hero: parseEntity(hero),
            items: parseEntities(latestTeasers),
            latestRealHomes: parseEntities(latestRealHomes),
            list
        };

        next();
    } catch (error) {
        next(error);
    }
}

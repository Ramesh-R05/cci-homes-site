import makeRequest from '../../makeRequest';
import {parseEntity, parseEntities} from '../helper/parseEntity';
import {getLatestTeasers} from '../api/listing';

export default async function home(req, res, next) {
    try {
        const itemsCount = 6;
        const {brand, navSection, tag, page, campaign} = req.query;
        if (brand || navSection || tag || page || campaign) {
            next();
            return;
        }

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip =  (pageNo-1) * pageSize;

        const filter = `nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery'`;
        const [pageData, latestTeasersResp, heroModuleResp] = await Promise.all([
            makeRequest(`${req.app.config.services.remote.entity}/homepage`),
            getLatestTeasers(itemsCount,skip, filter),
            makeRequest(`${req.app.config.services.remote.module}/homepagehero`)
        ]);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        const heroModule = (heroModuleResp.data && heroModuleResp.data[0]) || {};
        const hero = heroModule.moduleManualContent && heroModule.moduleManualContent.data[0] || {};

        const list = {
            params: {
                listName: 'home',
                basePath: `/`,
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
            list
        };

        next();
    } catch(error) {
        next(error);
    }
}

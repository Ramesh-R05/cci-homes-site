import get from 'lodash.get';
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
        const excludedNodeIds = get(req.app.locals, 'config.homepageFilter.excludedNodeIds', [])
            .map(nodeId => ` and path ne '${nodeId}'`)
            .join('');

        /* eslint-disable prettier/prettier */
        const filter = `(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery')${excludedNodeIds}`;
        const latestVideoFilter = "(nodeTypeAlias eq 'HomesArticle' and contentHasVideo eq 'true')";
        /* eslint-enable max-len, prettier/prettier */
        const [pageData, latestTeasersResp, heroModuleResp, latestVideosResp] = await Promise.all([
            makeRequest(`${req.app.locals.config.services.remote.entity}/homepage`),
            getLatestTeasers(itemsCount, skip, filter),
            makeRequest(`${req.app.locals.config.services.remote.module}/homepagehero`),
            getLatestTeasers(3, 0, latestVideoFilter)
        ]);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];
        const latestVideos = (latestVideosResp && latestVideosResp.data) || [];

        const heroModule = (heroModuleResp.data && heroModuleResp.data[0]) || {};
        const hero = (heroModule.moduleManualContent && heroModule.moduleManualContent.data[0]) || {};
        const section = {
            name: pageData.nodeName,
            id: pageData.id,
            urlName: pageData.urlName
        };

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
            latestVideos: parseEntities(latestVideos),
            list,
            section
        };

        next();
    } catch (error) {
        next(error);
    }
}

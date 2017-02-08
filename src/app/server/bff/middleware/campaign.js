import makeRequest from '../../makeRequest';
import {parseEntity, parseEntities} from '../helper/parseEntity';

export default async function campaign(req, res, next) {
    try {
        const itemsCount = 6;
        const listCount = 6;
        let {campaign} = req.query;

        if (!campaign) {
            next();
            return;
        }

        let pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip =  (pageNo-1) * (itemsCount + listCount);

        const entityResponse = await makeRequest(`${req.app.config.services.remote.entity}/?nodeTypeAlias=Campaign&urlName=${campaign}`);

        entityResponse.kingtag = entityResponse.urlName;

        const filter = `(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and sponsorName eq '${entityResponse.sponsorName}'`;
        const latestTeasersResp = await makeRequest(`${req.app.config.services.remote.listings}/teasers?$select=*&$filter=${filter}&$orderby=pageDateCreated desc&$top=${itemsCount + listCount}&$skip=${skip}`)
        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        let previousPage = null;
        if (pageNo > 1) {
            let path = `/campaign/${campaign}?pageNo=${pageNo - 1}`;
            if (pageNo === 2) {
                path = `/campaign/${campaign}`;
            }
            previousPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            }
        }

        let nextPage = null;
        if (skip + latestTeasers.length < latestTeasersResp.totalCount) {
            const path = `/campaign/${campaign}?pageNo=${pageNo + 1}`;
            nextPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `/campaign/${campaign}?pageNo=${pageNo}` : `/campaign/${campaign}`;
        const currentPage = {
            path,
            url: `${req.app.config.site.host}${path}`
        };

        const list = {
            listName: campaign,
            params: {
                pageNo,
                filter: filter
            },
            items: [
                parseEntities(latestTeasers.slice(itemsCount))
            ],
            previous: previousPage,
            current: currentPage,
            next: nextPage
        };

        res.body = {
            ...res.body,
            entity: parseEntity(entityResponse),
            items: parseEntities(latestTeasers.slice(0, itemsCount)),
            list
        };

        next();
    } catch(error) {
        next(error);
    }
}

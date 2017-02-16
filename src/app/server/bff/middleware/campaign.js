import makeRequest from '../../makeRequest';
import {parseEntity, parseEntities} from '../helper/parseEntity';
import {getLatestTeasers} from '../api/listing';

export default async function campaign(req, res, next) {
    try {
        const itemsCount = 6;
        let {campaign} = req.query;

        if (!campaign) {
            next();
            return;
        }

        const entityResponse = await makeRequest(`${req.app.config.services.remote.entity}/?nodeTypeAlias=Campaign&urlName=${campaign}`);

        entityResponse.kingtag = entityResponse.urlName;

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip =  (pageNo-1) * pageSize;

        const filter = `(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and sponsorName eq '${entityResponse.sponsorName}'`;
        const latestTeasersResp = await getLatestTeasers(itemsCount, skip, filter);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        const list = {
            params: {
                listName: campaign,
                basePath: `/campaign/${campaign}`,
                offset: itemsCount,
                pageNo,
                pageSize,
                filter
            }
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

import { parseEntity, parseEntities } from '../helper/parseEntity';
import API from '../api';

export default async function campaignMiddleware(req, res, next) {
    try {
        const itemsCount = 6;
        const { campaign } = req.query;

        if (!campaign) {
            next();

            return;
        }

        const entityResponse = await API.getEntity(`?nodeTypeAlias=Campaign&urlName=${campaign}`);

        entityResponse.kingtag = entityResponse.urlName;

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip = (pageNo - 1) * pageSize;

        const filter = `(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and sponsorName eq '${entityResponse.sponsorName}'`;
        const latestTeasersResp = await API.getLatestTeasers(itemsCount, skip, filter);

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
    } catch (error) {
        next(error);
    }
}

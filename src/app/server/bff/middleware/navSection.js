import makeRequest from '../../makeRequest';
import {parseEntity, parseEntities} from '../helper/parseEntity';
import {getLatestTeasers} from '../api/listing';

export default async function navSection(req, res, next) {
    try {
        const itemsCount = 6;
        const {navSection} = req.query;

        if (!navSection) {
            next();
            return;
        }

        const entityResponse = await makeRequest(`${req.app.config.services.remote.entity}/section/${navSection}`);

        const sectionTag = entityResponse.tagsDetails[0];

        entityResponse.kingtag = (sectionTag && sectionTag.urlName) || '';

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip =  (pageNo-1) * pageSize;

        const filter = `tagsDetails/fullName eq '${sectionTag.fullName}'`;
        const [latestTeasersResp, galleryListingResponse] = await Promise.all([
            getLatestTeasers(itemsCount, skip, filter),
            makeRequest(`${req.app.config.services.remote.listings}/teasers?$select=*&$filter=nodeTypeAlias eq 'Gallery' and ${filter}&$orderby=pageDateCreated desc&$top=5`)
        ]);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        const list = {
            params: {
                listName: navSection,
                basePath: `/${navSection}`,
                offset: itemsCount,
                pageNo,
                pageSize,
                filter
            }
        };

        res.body = {
            ...res.body,
            entity: parseEntity(entityResponse),
            items: parseEntities(latestTeasers),
            list,
            galleries: parseEntities(galleryListingResponse.data)
        };

        next();
    } catch(error) {
        next(error);
    }
}

import makeRequest from '../../makeRequest';
import { parseEntity, parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';

export default async function navSectionMiddleware(req, res, next) {
    try {
        const itemsCount = 6;
        const { navSection } = req.query;

        if (!navSection) {
            next();
            return;
        }

        const entityResponse = await makeRequest(`${req.app.locals.config.services.remote.entity}/section/${navSection}`);

        const sectionTag = entityResponse.tagsDetails[0];

        entityResponse.kingtag = (sectionTag && sectionTag.urlName) || '';

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip = (pageNo - 1) * pageSize;

        const filter = `tagsDetails/fullName eq '${sectionTag.fullName}'`;
        const heroModuleName = `${navSection.replace(/-/g, '')}hero`;

        const [latestTeasersResp, galleryListingResponse, heroResp] = await Promise.all([
            getLatestTeasers(itemsCount, skip, filter),
            // eslint-disable-next-line max-len
            makeRequest(
                `${
                    req.app.locals.config.services.remote.listings
                }/teasers?$select=*&$filter=nodeTypeAlias eq 'Gallery' and ${filter}&$orderby=pageDateCreated desc&$top=5`
            ),
            makeRequest(`${req.app.locals.config.services.remote.module}/${heroModuleName}`)
        ]);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];
        const heroModule = (heroResp && heroResp.data && heroResp.data[0]) || {};
        const section = {
            name: entityResponse.nodeName,
            id: entityResponse.id,
            urlName: entityResponse.urlName
        };
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
            section,
            galleries: parseEntities(galleryListingResponse.data),
            hero: parseEntity((heroModule && heroModule.moduleManualContent && heroModule.moduleManualContent.data[0]) || {})
        };

        next();
    } catch (error) {
        next(error);
    }
}

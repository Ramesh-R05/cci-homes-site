import makeRequest from '../../makeRequest';
import {parseEntity, parseEntities} from '../helper/parseEntity';
import {getLatestTeasers} from '../api/listing';

export default async function navSection(req, res, next) {
    try {
        const itemsCount = 6;
        const listCount = 6;
        const {navSection} = req.query;

        if (!navSection) {
            next();
            return;
        }

        let pageNo = parseInt(req.query.pageNo || 1, 10);

        const skip =  (pageNo-1) * (itemsCount + listCount);
        const entityResponse = await makeRequest(`${req.app.config.services.remote.entity}/section/${navSection}`);

        const navigationTag = (entityResponse.tagsDetails || []).find((tag) => {
            return tag.name.includes('Homes navigation')
        });

        entityResponse.kingtag = (navigationTag && navigationTag.urlName) || '';

        const filter = `tagsDetails/fullName eq '${navigationTag.fullName}'`;
        const [latestTeasersResp, galleryListingResponse] = await Promise.all([
            getLatestTeasers(itemsCount + listCount, skip, filter),
            makeRequest(`${req.app.config.services.remote.listings}/teasers?$select=*&$filter=nodeTypeAlias eq 'Gallery' and ${filter}&$orderby=pageDateCreated desc&$top=5`)
        ]);

        const latestTeasers = (latestTeasersResp && latestTeasersResp.data) || [];

        let previousPage = null;
        if (pageNo > 1) {
            let path = `/${navSection}?pageNo=${pageNo - 1}`;
            if (pageNo === 2) {
                path = `/${navSection}`;
            }
            previousPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            }
        }

        let nextPage = null;
        if (skip + latestTeasers.length < latestTeasersResp.totalCount) {
            const path = `/${navSection}?pageNo=${pageNo + 1}`;
            nextPage = {
                path,
                url: `${req.app.config.site.host}${path}`
            };
        }

        const path = pageNo > 1 ? `/${navSection}?pageNo=${pageNo}` : `/${navSection}`;
        const currentPage = {
            path,
            url: `${req.app.config.site.host}${path}`
        };

        const list = {
            listName: navSection,
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
            list,
            galleries: parseEntities(galleryListingResponse.data)
        };

        next();
    } catch(error) {
        next(error);
    }
}

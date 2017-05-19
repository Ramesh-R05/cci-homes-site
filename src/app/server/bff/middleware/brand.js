import makeRequest from '../../makeRequest';
import { parseEntity, parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';

export default async function brandMiddleware(req, res, next) {
    try {
        const itemsCount = 6;
        const { brand } = req.query;

        if (!brand) {
            next();
            return;
        }

        const pageSize = 12;
        const pageNo = parseInt(req.query.pageNo || 1, 10);
        const skip = (pageNo - 1) * pageSize;

        const entityResponse = await makeRequest(`${req.app.locals.config.services.remote.entity}/section/${brand}`);

        const filter = `source eq '${entityResponse.articleSource}'`;
        const listingResponse = await getLatestTeasers(itemsCount, skip, filter);

        const brandConfig = req.app.locals.config.brands.uniheader.find(b => b.title === entityResponse.articleSource);

        entityResponse.brand = (brandConfig && brandConfig.id) || '';

        const heroModuleName = `${entityResponse.brand}hero`;
        const heroResp = await makeRequest(`${req.app.locals.config.services.remote.module}/${heroModuleName}`);
        const heroModule = (heroResp && heroResp.data && heroResp.data[0]) || {};

        const list = {
            params: {
                listName: brand,
                basePath: `/${brand}`,
                offset: itemsCount,
                pageNo,
                pageSize,
                filter
            }
        };

        res.body = {
            ...res.body,
            entity: parseEntity(entityResponse),
            hero: parseEntity((
                heroModule &&
                heroModule.moduleManualContent &&
                heroModule.moduleManualContent.data[0]) || {}),
            items: parseEntities(listingResponse.data),
            list
        };

        next();
    } catch (error) {
        next(error);
    }
}

import API from '../api';
import { parseEntity, parseEntities } from '../helper/parseEntity';

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

        const entityResponse = await API.getEntity(`section/${brand}`);

        const filter = `source eq %27${entityResponse.articleSource}%27 and nodeTypeAlias ne %27ListingGallery%27`;
        const listingResponse = await API.getLatestTeasers(itemsCount, skip, filter);

        const brandConfig = req.app.locals.config.brands.site.find(b => b.title === entityResponse.articleSource);

        entityResponse.brand = (brandConfig && brandConfig.id) || '';

        const heroModuleName = `${entityResponse.brand}hero`;
        const heroResp = await API.getModules([`${heroModuleName}`]);
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
            hero: parseEntity((heroModule && heroModule.moduleManualContent && heroModule.moduleManualContent.data[0]) || {}),
            items: parseEntities(listingResponse.data),
            list
        };

        next();
    } catch (error) {
        next(error);
    }
}

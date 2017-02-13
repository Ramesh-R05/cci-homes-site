import makeRequest from '../../makeRequest';
import {parseEntity, parseEntities} from '../helper/parseEntity';
import {getLatestTeasers} from '../api/listing';

export default async function brand(req, res, next) {
    try {
        const {brand} = req.query;

        if (!brand) {
            next();
            return;
        }

        const entityResponse = await makeRequest(`${req.app.config.services.remote.entity}/section/${brand}`);
        const listingResponse = await getLatestTeasers(12, 0, `source eq '${entityResponse.articleSource}'`);

        const brandConfig = req.app.config.brands.uniheader.find((brand) => {
            return brand.title === entityResponse.articleSource;
        });

        entityResponse.brand = (brandConfig && brandConfig.id) || '';

        const heroModuleName = `${entityResponse.brand}hero`;
        const heroResp = await makeRequest(`${req.app.config.services.remote.module}/${heroModuleName}`);
        const heroModule = (heroResp && heroResp.data && heroResp.data[0]) || {};

        res.body = {
            ...res.body,
            entity: parseEntity(entityResponse),
            hero: parseEntity(heroModule && heroModule.moduleManualContent && heroModule.moduleManualContent.data[0] || {}),
            items: parseEntities(listingResponse.data)
        };

        next();
    } catch(error) {
        next(error);
    }
}

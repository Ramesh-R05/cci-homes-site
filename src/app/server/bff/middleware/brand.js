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
        const listingResponse = await getLatestTeasers(13, 0, `source eq '${entityResponse.articleSource}'`);

        const brandConfig = req.app.config.brands.uniheader.find((brand) => {
            return brand.title === entityResponse.articleSource;
        });

        entityResponse.brand = (brandConfig && brandConfig.id) || '';

        res.body = {
            ...res.body,
            entity: parseEntity(entityResponse),
            items: parseEntities(listingResponse.data)
        };

        next();
    } catch(error) {
        next(error);
    }
}

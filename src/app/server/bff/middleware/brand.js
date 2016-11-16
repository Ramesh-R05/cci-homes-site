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
        const listingResponse = await getLatestTeasers(12, 0, entityResponse.articleSource, 'source');

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

import { parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';

export default async function latestBrandItems(req, res, next) {
    try {
        const brandConfig = req.app.locals.config.brands.uniheader;
        const brandContentPromises = brandConfig.map(brand =>
            getLatestTeasers(3, 0, `source eq '${brand.title}'`).then(itemRes => ({ [brand.id]: parseEntities(itemRes.data) }))
        );
        const brandContentRes = await Promise.all(brandContentPromises);

        if (Array.isArray(brandContentRes) && brandContentRes.length) {
            res.body.latestBrandItems = brandContentRes;
        }
        next();
    } catch (e) {
        next(e);
    }
}

import makeRequest from '../../makeRequest';
import { parseEntities } from '../helper/parseEntity';
import getLatestTeasers from '../api/listing';

export default async function getLatestBrandVideos(req, res, next) {
    try {
        const itemsCount = 4;
        const { brand } = req.query;

        if (!brand) {
            next();

            return;
        }

        const entityResponse = await makeRequest(`${req.app.locals.config.services.remote.entity}/section/${brand}`);
        const filter = `source eq '${entityResponse.articleSource}' and nodeTypeAlias eq 'HomesArticle' and contentHasVideo eq 'true'`;
        const latestBrandVideosResponse = await getLatestTeasers(itemsCount, 0, filter);
        let latestBrandVideos = [];

        if (Array.isArray(latestBrandVideosResponse.data) && latestBrandVideosResponse.data.length) {
            latestBrandVideos = parseEntities(latestBrandVideosResponse.data);
        }

        res.body = {
            ...res.body,
            latestBrandVideos
        };

        next();
    } catch (error) {
        next(error);
    }
}

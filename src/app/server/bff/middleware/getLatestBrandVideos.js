import API from '../api';
import { parseEntities } from '../helper/parseEntity';

export default async function getLatestBrandVideos(req, res, next) {
    try {
        const itemsCount = 4;
        const { brand } = req.query;

        if (!brand) {
            next();

            return;
        }

        const entityResponse = await API.getEntity(`section/${brand}`);
        const filter = `source eq %27${entityResponse.articleSource}%27 and nodeTypeAlias eq 'HomesArticle' and contentHasVideo eq 'true'`;
        const latestBrandVideosResponse = await API.getLatestTeasers(itemsCount, 0, filter);

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

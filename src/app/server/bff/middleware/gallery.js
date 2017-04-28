import { getLatestTeasers } from '../api/listing'
import { parseEntities } from '../helper/parseEntity';

export default async function gallery(req, res, next) {

    try {

        const {entity} = res.body;

        if (!entity || entity.nodeType !== 'Gallery') {
            next();
            return;
        }   

        const galleryItems = await getLatestTeasers(10, 0, `nodeTypeAlias eq 'Gallery'`);
        res.body.moreGalleries = parseEntities(galleryItems.data);

        if (entity.tags) {
            const navTags = entity.tags.find((tag) => tag.includes('navigation'));
            if (navTags) {
                const relatedArticles = await getLatestTeasers(20, 0, `tags eq '${navTags}'`);
                res.body.leftHandSide = { items: parseEntities(relatedArticles.data) }
            }
        }

        next();

    } catch(error) {
        next(error);
    }
}
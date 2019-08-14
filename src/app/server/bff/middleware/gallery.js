import API from '../api';
import { parseEntities } from '../helper/parseEntity';

export default async function galleryMiddleware(req, res, next) {
    try {
        const { entity } = res.body;

        if (!entity || entity.nodeType !== 'Gallery') {
            next();

            return;
        }

        const galleryItems = await API.getLatestTeasers(10, 0, 'nodeTypeAlias eq %27Gallery%27');
        res.body.moreGalleries = parseEntities(galleryItems.data);

        if (entity.tags) {
            const navTags = entity.tags.find(tag => tag.includes('navigation'));

            if (navTags) {
                const relatedArticles = await API.getLatestTeasers(20, 0, `tags eq %27${navTags}%27`);
                res.body.leftHandSide = { items: parseEntities(relatedArticles.data) };
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}

import getLatestTeasers from '../api/listing';
import { parseEntities } from '../helper/parseEntity';

export default async function articleMiddleware(req, res, next) {
    try {
        const { entity } = res.body;

        if (!entity || entity.nodeType !== 'HomesArticle') {
            next();
            return;
        }

        if (entity.tags) {
            const navTags = entity.tags.find(tag => tag.includes('navigation'));
            if (navTags) {
                const relatedArticles = await getLatestTeasers(20, 0, `tags eq '${navTags}'`);
                res.body.leftHandSide = { items: parseEntities(relatedArticles.data) };

                if (['/laundry-solutions-6711', '/how-often-to-wash-clothes-6748'].includes(entity.url)) {
                    res.body.leftHandSide.items = res.body.leftHandSide.items.filter(item => item.url !== '/win-a-miele-laundry-package-6649');
                }
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}

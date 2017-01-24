import {getLatestTeasers} from '../api/listing'
import {parseEntities} from '../helper/parseEntity';


export default async function article(req, res, next) {

    try {

        const {entity} = res.body;

        if (!entity || entity.nodeType !== 'HomesArticle') {
            next();
            return;
        }

        if (entity.tags) {
            const navTags = entity.tags.find((tag) => tag.includes('navigation'));
            if (navTags) {
                const relatedArticles = await getLatestTeasers(14, 0, `tags eq '${navTags}'`);
                res.body.leftHandSide = { items: parseEntities(relatedArticles.data) }
            }
        }

        next();

    } catch(error) {
        next(error);
    }
}




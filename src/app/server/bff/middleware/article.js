import {getLatestTeasers} from '../api/listing'
import {parseEntities} from '../helper/parseEntity';


export default async function article(req, res, next) {

    try {

        const {nodeType} = res.body.entity;

        if (nodeType !== 'HomesArticle') {
            next();
            return;
        }

        if (res.body.entity.tags) {
            const navTags = res.body.entity.tags.find((tag) => tag.includes('navigation'));
            if (navTags) {
                const relatedArticles = await getLatestTeasers(20, 0, navTags, 'tags');
                res.body.leftHandSide = { items: parseEntities(relatedArticles.data) }
            }
        }

        next();

    } catch(error) {
        next(error);
    }
}




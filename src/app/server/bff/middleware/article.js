import get from 'lodash.get';
import getLatestTeasers from '../api/listing';
import { parseEntities } from '../helper/parseEntity';

export default async function articleMiddleware(req, res, next) {
    try {
        const { entity } = res.body;

        if (!entity || entity.nodeType !== 'HomesArticle') {
            next();

            return;
        }

        const entityTags = entity.tags;
        let teaserQuery = `nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery'`;

        if (entityTags && Array.isArray(entityTags) && entityTags.length) {
            const navTags = entityTags.find(tag => tag.includes('navigation'));

            if (navTags) {
                teaserQuery = `tags eq '${navTags}'`;
            }
        }

        const relatedArticles = await getLatestTeasers(20, 0, teaserQuery);
        res.body.leftHandSide = { items: parseEntities(relatedArticles.data) };

        /**
         * Following code is for find out the site logo img url and external links for directory page
         * 1. From the returned content body, logoImg url always be the first element of contentbody array
         *    and the external links be the second
         * 2. The logoImg should have property title which is 'logo'
         *
         * Code bellow
         *  - check the first and second elements from content body and get the data of sitelogoImg url and external links if there are.
         *  - Put the sitelogoImg and external links as two properies of entity object
         *  - Remove the first two elemets from content body
         */
        if (Array.isArray(entity.body) && entity.body.length > 1) {
            if (entity.body[0].type === 'image' && entity.body[0].content && entity.body[0].content.title === 'logo') {
                entity.directoryLogoUrl = get(entity.body.shift(), 'content', null);
            }

            if (entity.body[0].type === 'external-links' && entity.body[0].content) {
                entity.externalLinks = get(entity.body.shift(), 'content', null);
            }
        }

        next();
    } catch (error) {
        next(error);
    }
}

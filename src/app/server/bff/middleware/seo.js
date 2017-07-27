import getKeywords from '../api/seo';
import { init as seoInsertKeywordLink } from '../helper/seoInsertKeywordLink';
import logger from '../../../../logger';

export default async function seoMiddleware(req, res, next) {
    try {
        const { entity } = res.body;
        if (!entity || (entity.nodeType !== 'HomesArticle')) {
            next();
            return;
        }

        if (entity.siteUrl && entity.url) {
            const seoData = await getKeywords(entity.siteUrl + entity.url);
            seoInsertKeywordLink(res.body.entity.body, seoData);
        }

        next();
    } catch (error) {
        logger.error(error);
        next(error);
    }
}

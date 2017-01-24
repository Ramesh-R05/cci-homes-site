import { getKeywords } from '../api/seo';
import { init as seoInsertKeywordLink } from '../helper/seoInsertKeywordLink';
import { backendLogger as logger } from '@bxm/winston-logger';

export default async function seo(req, res, next) {
    try {
        const {entity} = res.body;
        if (!entity || (entity.nodeType !== 'HomesArticle')) {
            next();
            return;
        }

        if (entity.siteUrl && entity.url) {
            const seoData = await getKeywords(entity.siteUrl + entity.url);
            seoInsertKeywordLink(res.body.entity.body, seoData);
        }

        next();
    } catch(error) {
        logger.log('error', error);
        next(error);
    }
}

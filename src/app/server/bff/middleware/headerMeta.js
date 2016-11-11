import has from 'lodash/object/has';
import get from 'lodash/object/get';

export default function headerMeta(req, res, next) {
    try {
        const config = req.app.config;
        const {hostname} = req.query || {};
        const NODE_ENV = process.env.NODE_ENV || 'development'; // If not defaulting to dev, then local will be using live
        const isProdDomain = hostname === config.site.prodDomain;
        let robotsIndex = 'INDEX';
        let robotsFollow = 'FOLLOW';

        if (!isProdDomain || has(req, 'query.preview')) {
            robotsIndex = 'NOINDEX';
            robotsFollow = 'NOFOLLOW';
        }

        const entity = get(res, 'body.entity', {});
        // Alter meta title and description on entity object
        if (has(res, 'body.entity')) {
            const currentPageNo = get(res, 'body.list.params.pageNo');
            entity.pageTitle = (entity.pageTitle || entity.contentTitle) + (currentPageNo > 1 ? ` - Page ${currentPageNo}` : '');

            if (entity.pageMetaDescription) {
                entity.pageMetaDescription = entity.pageMetaDescription + (currentPageNo > 1 ? ` - Page ${currentPageNo}` : '')
            } else {
                entity.pageMetaDescription = entity.pageTitle + (entity.contentSummary ? `, ${entity.contentSummary}` : '');
            }
            // For future reference
            // https://bitbucket.org/bauermediaau/bauerdigital/src/5e59351b2544c5ce91bb20e0e4d99593076d074a/Lynx.Services.Common/Implementations/HeaderMetaService.cs?at=develop-v3.1&fileviewer=file-view-default#HeaderMetaService.cs-36
        }

        const headerMetaData = {
            googleTagManagerEnvironment: NODE_ENV,
            googleTagManagerMasthead: config.gtm.masthead,
            robots: `${robotsIndex},${robotsFollow}`,
            pageName: entity.nodeName,
            title: entity.pageTitle,
            canonicalUrl: entity.pageCanonicalUrl || '',
            pageDescription: entity.pageMetaDescription || '',
            GroupingCategory: entity.gtmGroupingCategory || '',
            hrefLang: entity.pageHrefLang || ''
        };

        res.body = {
            ...res.body,
            headerMetaData
        };

        next();
    } catch(error) {
        next(error);
    }
}

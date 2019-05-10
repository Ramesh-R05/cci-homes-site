import has from 'lodash/object/has';
import get from 'lodash/object/get';

export default function headerMetaMiddleware(req, res, next) {
    try {
        const { config } = req.app.locals;
        const { hostname } = req.query || {};
        const env = process.env.APP_ENV || process.env.NODE_ENV || 'development'; // If not defaulting to dev, then local will be using live
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
            entity.pageTitle = (entity.pageTitle || entity.title) + (currentPageNo > 1 ? ` - Page ${currentPageNo}` : '');

            if (entity.pageMetaDescription) {
                entity.pageMetaDescription += currentPageNo > 1 ? ` - Page ${currentPageNo}` : '';
            } else {
                entity.pageMetaDescription = entity.pageTitle + (entity.summary ? `, ${entity.summary}` : '');
            }
            // For future reference
            // https://bitbucket.org/bauermediaau/bauerdigital/src/5e59351b2544c5ce91bb20e0e4d99593076d074a/Lynx.Services.Common/Implementations/HeaderMetaService.cs?at=develop-v3.1&fileviewer=file-view-default#HeaderMetaService.cs-36
        }

        const headerMetaData = {
            googleTagManagerEnvironment: env,
            googleTagManagerMasthead: config.gtm.masthead,
            robots: `${robotsIndex},${robotsFollow}`,
            pageName: entity.nodeName || entity.pageTitle,
            title: entity.pageTitle || entity.title,
            canonicalUrl: entity.pageCanonicalUrl || '',
            pageDescription: entity.pageMetaDescription || '',
            GroupingCategory: entity.gtmGroupingCategory || '',
            hrefLang: entity.pageHrefLang || ''
        };

        const currentPageUrl = get(res.body, 'list.current.url');

        if (currentPageUrl) {
            headerMetaData.canonicalUrl = currentPageUrl;
        }

        res.body = {
            ...res.body,
            headerMetaData
        };

        next();
    } catch (error) {
        next(error);
    }
}

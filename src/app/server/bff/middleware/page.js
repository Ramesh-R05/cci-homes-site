import API from '../api';
import { parseEntity } from '../helper/parseEntity';

export default async function pageMiddleware(req, res, next) {
    try {
        const { query, params } = req;
        const preview = query.preview || params.preview;
        const page = query.page || params.page;
        const id = query.id || params.id;

        if (!page) {
            next();

            return;
        }

        const saved = `?saved=${!!preview}`;
        const pageEntity = await API.getEntity(`HOMES-${id}${saved}`);

        const brandSource = pageEntity.articleSource || pageEntity.source;
        const brandConfig = req.app.locals.config.brands.site.find(brand => brand.title === brandSource);

        const navigationTag = (pageEntity.tagsDetails || []).find(tag => tag.name.includes('Homes navigation'));

        pageEntity.kingtag = (navigationTag && navigationTag.urlName) || '';
        pageEntity.brand = (brandConfig && brandConfig.id) || '';

        res.body = res.body || {};
        res.body.entity = parseEntity(pageEntity);

        const tagEntityName = (navigationTag && navigationTag.urlName) || '';

        if (tagEntityName) {
            const sectionEntityResponse = await API.getEntity(`section/${tagEntityName}`);
            res.body.section = {
                name: sectionEntityResponse.nodeName,
                id: sectionEntityResponse.id,
                urlName: sectionEntityResponse.urlName
            };
        }

        next();
    } catch (error) {
        next(error);
    }
}

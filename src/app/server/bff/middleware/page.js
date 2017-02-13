import makeRequest from '../../makeRequest';
import {parseEntity} from '../helper/parseEntity';


export default async function page(req, res, next) {

    try {
        const {page, preview} = req.query;

        if (!page) {
            next();
            return;
        }

        const saved = `?saved=${!!preview}`;
        const pageEntity = await makeRequest(`${req.app.config.services.remote.entity}/HOMES-${req.query.id}${saved}`);

        const brandSource = pageEntity.articleSource || pageEntity.source;
        const brandConfig = req.app.config.brands.uniheader.find((brand) => {
            return brand.title === brandSource;
        });

        const navigationTag = (pageEntity.tagsDetails || []).find((tag)=>tag.name.includes('Homes navigation'));

        pageEntity.kingtag = (navigationTag && navigationTag.urlName) || '';
        pageEntity.brand = (brandConfig && brandConfig.id) || '';

        res.body = res.body || {};
        res.body.entity = parseEntity(pageEntity);

        next();

    } catch(error) {
        next(error);
    }
}
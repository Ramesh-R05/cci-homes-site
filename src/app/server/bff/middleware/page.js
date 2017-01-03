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

        res.body = res.body || {};
        res.body.entity = parseEntity(pageEntity);

        next();

    } catch(error) {
        next(error);
    }
}

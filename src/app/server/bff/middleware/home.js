import makeRequest from '../../makeRequest';
import {parseEntity} from '../helper/parseEntity';
import {parseModules} from '../helper/parseModule';

export default async function home(req, res, next) {
    try {
        const {brand} = req.query;

        if (brand) {
            next();
            return;
        }

        const [pageData, modulesResp] = await Promise.all([
            makeRequest(`${req.app.config.services.remote.entity}/homepage`),
            makeRequest(`${req.app.config.services.remote.module}/featuredarticles,infocusarticles`)
        ]);

        const modules = parseModules(modulesResp);

        res.body = {
            ...res.body,
            entity: parseEntity(pageData),
            stores: {
                featuredArticles: modules.featuredarticles,
                inFocusArticles: modules.infocusarticles
            }
        };

        next();
    } catch(error) {
        next(error);
    }
}

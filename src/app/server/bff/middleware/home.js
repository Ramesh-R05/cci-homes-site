import makeRequest from '../../makeRequest';
import {parseEntity} from '../helper/parseEntity';
import {parseModules} from '../helper/parseModule';

export default async function home(req, res, next) {
    try {
        const {brand, navSection, tag, page, campaign} = req.query;
        if (brand || navSection || tag || page || campaign) {
            next();
            return;
        }

        const [pageData, heroModuleResp, modulesResp] = await Promise.all([
            makeRequest(`${req.app.config.services.remote.entity}/homepage`),
            makeRequest(`${req.app.config.services.remote.module}/homepagehero`),
            makeRequest(`${req.app.config.services.remote.module}/featuredarticles`)
        ]);

        const modules = parseModules(modulesResp);
        const heroModule = (heroModuleResp.data && heroModuleResp.data[0]) || {};
        const hero = heroModule.moduleManualContent && heroModule.moduleManualContent.data[0] || {};

        res.body = {
            ...res.body,
            entity: parseEntity(pageData),
            hero: parseEntity(hero),
            items: modules.featuredarticles.items
        };



        next();
    } catch(error) {
        next(error);
    }
}

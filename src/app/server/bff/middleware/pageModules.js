import logger from '../../../../logger';
import getModules from '../api/module';
import getThemeModuleForQuery from '../helper/getThemeModuleForQuery';
import processModules from '../helper/processModules';

export default async function pageModulesMiddleware(req, res, next) {
    try {
        const { query } = req;
        const themeModule = getThemeModuleForQuery(query);
        let moduleResponse = {};
        moduleResponse = await getModules('hamburgernavigation', 'headernavigation', 'featuredbrand', 'listingcategories', themeModule);
        res.body = {
            ...res.body,
            ...processModules(moduleResponse, themeModule)
        };
    } catch (error) {
        logger.error(error);
    }

    next();
}

import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import API from '../api';
import getThemeModuleForQuery from '../helper/getThemeModuleForQuery';
import processModules from '../helper/processModules';

function moduleDataCallback(moduleArgs, modules) {
    const moduleList = {};

    if (!modules) {
        return moduleList;
    }

    moduleArgs.forEach(arg => {
        const moduleConfig = find(modules.data, { moduleName: arg });

        if (arg === 'footer') {
            moduleList[arg] = moduleConfig || {};
        } else if (arg.endsWith('theme')) {
            moduleList[arg] = moduleConfig || {};
        } else if (arg.endsWith('hero')) {
            moduleList[arg] = moduleConfig || {};
        } else {
            moduleList[arg] = get(moduleConfig, 'moduleManualContent.data', []);
        }
    });

    return moduleList;
}

export default async function pageModulesMiddleware(req, res, next) {
    try {
        const { query } = req;

        const themeModule = getThemeModuleForQuery(query);

        const moduleResponse = await API.getModules(
            ['hamburgernavigation', 'headernavigation', 'featuredbrand', 'listingcategories', themeModule],
            moduleDataCallback
        );

        res.body = {
            ...res.body,
            ...processModules(moduleResponse, themeModule)
        };

        next();
    } catch (error) {
        next(error);
    }
}

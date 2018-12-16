import headerNavigation from '../moduleHandlers/headerNavigation';
import hamburgerNavigation from '../moduleHandlers/hamburgerNavigation';
import featuredBrand from '../moduleHandlers/featuredBrand';
import theme from '../moduleHandlers/theme';
import logger from '../../../../logger';

export default function processModules(moduleResponse, themeModule = '') {
    try {
        if (!module && !themeModule) {
            return {};
        }

        return Object.keys(moduleResponse).reduce((allModules, moduleName) => {
            let accumulatedModules = { ...allModules };

            switch (moduleName) {
                case 'headernavigation':
                    accumulatedModules = {
                        ...allModules,
                        headerNavigation: headerNavigation(moduleResponse[moduleName])
                    };
                    break;

                case 'hamburgernavigation':
                    accumulatedModules = {
                        ...allModules,
                        hamburgerNavigation: hamburgerNavigation(moduleResponse[moduleName])
                    };
                    break;

                case 'featuredbrand':
                    accumulatedModules = {
                        ...allModules,
                        featuredBrand: featuredBrand(moduleResponse[moduleName])
                    };
                    break;

                case themeModule:
                    accumulatedModules = {
                        ...allModules,
                        theme: theme(moduleResponse[moduleName])
                    };
                    break;

                default:
                    return accumulatedModules;
            }

            return accumulatedModules;
        }, {});
    } catch (error) {
        logger.error(error);

        return {};
    }
}

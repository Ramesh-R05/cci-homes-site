import logger from '../../../../logger';
import getModules from '../api/module';
import { parseEntities } from '../helper/parseEntity';
import getThemeModuleForQuery from '../helper/getThemeModuleForQuery';

export default async function pageModulesMiddleware(req, res, next) {
    try {
        const { query } = req;
        const themeModule = getThemeModuleForQuery(query);

        req.data = {};
        req.data = await getModules('hamburgernavigation', 'headernavigation', themeModule);

        const processedModules = Object.keys(req.data).reduce((allModules, moduleName) => {
            let accumulatedModules;

            switch (moduleName) {
                case 'headernavigation':
                    accumulatedModules = {
                        ...allModules,
                        headerNavigation: {
                            items: parseEntities(req.data[moduleName], { contentTitle: 'name' }).map(
                                item =>
                                    item.tagsDetails && item.tagsDetails.length > 1
                                        ? {
                                              ...item,
                                              subsections: item.tagsDetails.map(tag => ({
                                                  contentTitle: tag.displayName,
                                                  url: tag.urlName
                                              }))
                                          }
                                        : item
                            )
                        }
                    };
                    break;
                case 'hamburgernavigation':
                    accumulatedModules = {
                        ...allModules,
                        hamburgerNavigation: {
                            items: [{ name: 'Home', url: '/' }, ...parseEntities(req.data[moduleName], { contentTitle: 'name' })]
                        }
                    };
                    break;
                case themeModule:
                    accumulatedModules = {
                        ...allModules,
                        theme: req.data[moduleName]
                    };
                    break;
                default:
                    return accumulatedModules;
            }
            return accumulatedModules;
        }, {});

        res.body = {
            ...res.body,
            ...processedModules
        };
    } catch (error) {
        logger.error(error);
    }

    next();
}

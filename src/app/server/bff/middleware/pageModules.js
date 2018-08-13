import logger from '../../../../logger';
import getModules from '../api/module';
import { parseEntities } from '../helper/parseEntity';

export default async function pageModulesMiddleware(req, res, next) {
    try {
        req.data = {};
        req.data = await getModules('hamburgernavigation', 'headernavigation');

        const processedModules = Object.keys(req.data).reduce((allModules, moduleName) => {
            let accumulatedModules;

            switch (moduleName) {
                case 'headernavigation':
                    accumulatedModules = {
                        ...allModules,
                        headerNavigation: {
                            items: parseEntities(req.data[moduleName], { contentTitle: 'name' })
                        }
                    };
                    break;
                case 'hamburgernavigation':
                    accumulatedModules = {
                        ...allModules,
                        hamburgerNavigation: {
                            items: parseEntities(req.data[moduleName], { contentTitle: 'name' })
                        }
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

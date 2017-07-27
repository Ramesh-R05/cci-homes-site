import has from 'lodash/object/has';
import logger from '../../../../logger';
import getModules from '../api/module';
import { parseEntities } from '../helper/parseEntity';

export default async function pageModulesMiddleware(req, res, next) {
    try {
        req.data = {};
        req.data = await getModules('headernavigation');
        let headerNavigation = {};

        if (has(req, 'data.headernavigation')) {
            headerNavigation = {
                items: parseEntities(req.data.headernavigation, { contentTitle: 'name' })
            };
        }

        res.body = {
            ...res.body,
            headerNavigation
        };
    } catch (error) {
        logger.error(error);
    }

    next();
}

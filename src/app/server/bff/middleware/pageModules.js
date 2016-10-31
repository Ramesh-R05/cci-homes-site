import get from 'lodash/object/get';
import has from 'lodash/object/has';
import { backendLogger as logger } from '@bxm/winston-logger';
import { getModules } from '../api/module';
import { parseEntity, parseEntities } from '../helper/parseEntity';

export default async function pageModules(req, res, next) {
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

    } catch(error) {
        logger.log('error', error);
    }

    next();
}

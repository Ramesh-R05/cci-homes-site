import get from 'lodash/object/get';
import { backendLogger as logger } from '@bxm/winston-logger';
import { getModules } from '../api/module';
import {parseEntity, parseEntities} from '../helper/parseEntity';


export default async function pageModules(req, res, next) {
    try {
        req.data = {};
        req.data = await getModules('headernavigation', 'hamburgernavigation', 'footer');

        if (get(req, 'data.headernavigation')) {
            res.body.headerNavigation = {
                items: parseEntities(req.data.headernavigation, { contentTitle: 'name' })
            };
        }

    } catch(error) {
        logger.log('error', error);
    }

    next();
}

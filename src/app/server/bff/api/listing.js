import makeRequest from '../../makeRequest';
import { backendLogger as logger } from '@bxm/winston-logger';
import config from '../../../config';

export default function getLatestTeasers(top = 20, skip = 0, filter = '') {
    if (!filter) return Promise.resolve([]);

    let query = '?$select=*';

    query += `&$filter=${filter}`;

    query += `&$orderby=pageDateCreated desc&$top=${top}&$skip=${skip}`;
    return makeRequest(`${config.services.remote.listings}/teasers/${query}`).then(res => res).catch((err) => {
        logger.error(err);
        return [];
    });
}

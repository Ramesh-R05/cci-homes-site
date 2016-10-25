import makeRequest from '../../makeRequest';
import {backendLogger as logger} from '@bxm/winston-logger';
import {load} from '@bxm/config';
const config = load();

export function getLatestTeasers(top = 20, skip = 0, section = 'all', filter = 'path') {
    if (!section) return Promise.resolve([]);

    let query = '?$select=*';

    if (section !== 'all') {
        query += `&$filter=${filter} eq %27${section}%27`;
    }

    query += `&$orderby=pageDateCreated desc&$top=${top}&$skip=${skip}`;
    return makeRequest(`${config.services.remote.listings}/teasers/${query}`).then((res) => {
        return res;
    }).catch((err) => {
        logger.log('error', err);
        return [];
    });
}

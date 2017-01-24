import makeRequest from '../../makeRequest';
import {load} from '@bxm/config';
import {backendLogger as logger} from '@bxm/winston-logger';
const config = load();

export function getKeywords(url) {
    if (!url) return Promise.resolve({});

    const query = `?urlName=` + url;

    return makeRequest(`${config.services.remote.keywords}${query}`)
        .then((res) => {
            return res;
        }).catch((err) => {
            logger.log('error', err);
            return {};
        });
}

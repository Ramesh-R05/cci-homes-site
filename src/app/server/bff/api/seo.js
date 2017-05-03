import makeRequest from '../../makeRequest';
import config from '../../../config';
import { backendLogger as logger } from '@bxm/winston-logger';

export default function getKeywords(url) {
    if (!url) return Promise.resolve({});

    const query = `?urlName=${url}`;

    return makeRequest(`${config.services.remote.keywords}${query}`)
        .then(res => res).catch((err) => {
            logger.error(err);
            return {};
        });
}

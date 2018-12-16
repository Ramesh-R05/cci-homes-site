import makeRequest from '../../makeRequest';
import config from '../../../config';
import logger from '../../../../logger';

export default function getSearchResults(size = 10, from = 0, query = '') {
    const searchQuery = `?q=${query}&size=${size}&from=${from}`;

    return makeRequest(`${config.services.remote.search}/${searchQuery}`)
        .then(res => res)
        .catch(err => {
            logger.error(err);

            return {
                total: 0,
                results: []
            };
        });
}

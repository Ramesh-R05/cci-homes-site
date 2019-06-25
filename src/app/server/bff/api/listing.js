import makeRequest from '../../makeRequest';
import logger from '../../../../logger';
import config from '../../../config';

export default function getLatestTeasers(top = 20, skip = 0, filter = '') {
    const emptyResponse = {
        totalCount: 0,
        data: []
    };

    if (!filter) {
        return Promise.resolve(emptyResponse);
    }

    let query = '?$select=*';
    query += `&$filter=${filter}`;
    query += `&$orderby=pageDateCreated desc&$top=${top}&$skip=${skip}`;

    return makeRequest(`${config.services.remote.listings}/teasers/${query}`)
        .then(res => res)
        .catch(err => {
            logger.error({ msg: 'getLatestTeasers makeRequest catch', err });

            return emptyResponse;
        });
}

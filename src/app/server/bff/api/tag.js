import request from 'request';
import config from '../../../config';
import logger from '../../../../logger';

export default function getTagListFromNames(tagsList) {
    return new Promise((resolve, reject) => {
        const url = `${config.services.remote.tag}/tags/list`;

        if (!Array.isArray(tagsList) || !tagsList.length) {
            resolve({ data: [] });

            return;
        }

        request.post(
            {
                url,
                json: true,
                body: {
                    names: tagsList
                }
            },
            (err, res, body) => {
                const status = parseInt(res ? res.statusCode || 404 : 503, 10);

                if (err || status < 200 || status > 300) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject({ message: body, err, status });
                } else {
                    resolve(body);
                }
            }
        );
    }).catch(err => {
        logger.error(err);

        return [];
    });
}

import { backendLogger as logger } from '@bxm/winston-logger';
import request from 'request';
import LRU from 'lru-cache';

const cache = LRU({ max: 500, maxAge: 1 });

export default function makeRequest(url, isJsonRequest = true) {
    return new Promise((resolve, reject) => {
        logger.debug(`makeRequest for ${url}`);
        const cachedResponse = cache.get(url);
        if (cachedResponse) {
            logger.debug(`makeRequest returned from cache for ${url}`);
            resolve(cachedResponse);
            return;
        }

        request.get({
            url,
            json: isJsonRequest
        }, (err, res, body) => {
            const status = parseInt(res ? res.statusCode || 404 : 503, 10);
            if (err || status < 200 || status > 300) {
                logger.error(`makeRequest errored requesting ${url}`);
                reject({ message: body, err, status });
            } else {
                if (res.headers['cache-control']) {
                    const regexSearch = res.headers['cache-control'].match(/max-age=(\d+)/i);
                    if (regexSearch && !!regexSearch.length) {
                        cache.set(url, body, 1000 * parseInt(regexSearch[1], 10));
                    }
                    logger.debug(`makeRequest cached ${url}`);
                }
                resolve(body);
                logger.debug(`makeRequest resolved ${url} `);
            }
        });
    });
}

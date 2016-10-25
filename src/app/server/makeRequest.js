import request from 'request';
import Promise from 'promise';
import LRU from 'lru-cache';

const cacheOptions = {
    max: 500,
    maxAge: 1 // 0 seems to cache until the size of cache has hit maximum
};

const cache = LRU(cacheOptions);

export default function makeRequest(url, isJsonRequest = true) {
    return new Promise((resolve, reject) => {
        const cachedResponse = cache.get(url);
        if (cachedResponse) {
            resolve(cachedResponse);
            return;
        }

        request.get({
            url: url,
            json: isJsonRequest
        }, (err, res, body) => {
            const status = parseInt(res ? res.statusCode || 404 : 503, 10);
            if (err || status < 200 || status > 300) {
                reject({message: body, err, status});
            } else {
                if (res.headers["cache-control"]) {
                    const regexSearch = res.headers["cache-control"].match(/max-age=(\d+)/i);
                    if (regexSearch) {
                        !!regexSearch.length && cache.set(url, body, 1000 * parseInt(regexSearch[1], 10));
                    }
                }
                resolve(body);
            }
        });
    });
}

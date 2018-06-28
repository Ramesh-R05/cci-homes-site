/* eslint-disable consistent-return, no-console */
import request from 'request';
import get from 'lodash.get';

const debug = process.env.APP_DEBUG || false;
const map = new Map();

export default function comScore(req, res, next) {
    const url = get(req, 'query.url', null);
    const start = Date.now();
    let segmentIds = map.get(url) || [];

    res.body = res.body || {};

    if (segmentIds.length > 0) {
        if (debug) {
            console.log(`comscore: using segments from cache for ${url} in ${Date.now() - start}ms`);
        }
        res.body.comScoreSegmentIds = segmentIds.join(',');
        return next();
    }

    if (debug) {
        console.log(`comscore: requesting segments from remote ${url}`);
    }

    const pageUrl = encodeURIComponent(`https://${req.app.locals.config.site.prodDomain}${url}`);
    const options = {
        // eslint-disable-next-line max-len
        url: `http://api-ap-southeast.proximic.com:9100/sources.json?dkey=oh07IxT_3bk0gtkudfAWP8ikhrshRI6A9mtpGTplKWY9l_VxhfUVmf9J_5Uqkasy&url=${pageUrl}`,
        timeout: 1000
    };

    /*
     * Local Bauer network blocks the port used for the ComScore API.
     * For dev environments running locally, just let the request fail (ESOCKETTIMEDOUT)
     * Don't pass the error along to next middleware
     */

    request.get(options, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            /*
            * Example responses:
            * var pxSegmentIDs = "300003,210000,110000,110006";
            *
            * or
            *
            * {“scope”: ”page”, “segments”: [“300003", “110000", “110005", "tzvs7j"]}
            */

            const isJson = body.startsWith('{');

            if (isJson) {
                try {
                    const json = JSON.parse(body);
                    segmentIds = json.segments || [];
                } catch (e) {
                    // do nothing
                }
            } else {
                const match = body.match(/"(.*?)"/);
                if (match) {
                    segmentIds = match[1].split(',');
                }
            }

            if (segmentIds.length > 0) {
                map.set(req.query.url, segmentIds);
                res.body.comScoreSegmentIds = segmentIds.join(',');
            }
            if (debug) {
                console.log(`comscore: received segments from remote for ${req.query.url} in ${Date.now() - start}ms`, req.data.comScoreSegmentIds);
            }
        } else if (debug) {
            let message = 'Unknown error';
            if (err) {
                message = err.message;
            } else if (response && response.statusCode) {
                message = `Response code: ${response.statusCode}`;
            }
            console.log(`comscore error: ${message}`);
        }
        next();
    });
}

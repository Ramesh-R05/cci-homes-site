import request from 'request';

export default function comScore(req, res, next) {
    const pageUrl = encodeURIComponent(`https://${req.app.locals.config.site.prodDomain}${req.query.url}`);
    const options = {
        url: `http://api-us-east.zqtk.net/bauermedia-1h5kv7?url=${pageUrl}`,
        timeout: 1000
    };

    request.get(options, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            /*
            * Example responses:
            * var pxSegmentIDs = "300003,210000,110000,110006";
            *
            * or
            *
            * {“scope”: ”page”, “segments”: [“300003", “110000", “110005", "tzvs7j"]}
            *
            * */

            const isJson = body.startsWith('{');
            let segmentIds = [];

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
                res.body = {
                    ...res.body,
                    comScoreSegmentIds: segmentIds.join(',')
                };
            }
        }

        next();
    });
}

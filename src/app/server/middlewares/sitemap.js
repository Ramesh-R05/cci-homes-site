import request from 'request';

export default function(req, res) {
    console.info(`[server][sitemap] middleware handling ${req.originalUrl}`);
    console.info(`${req.app.config.services.content.remote + req.originalUrl}`);
    request.get({
        host: req.get('host'),
        url: req.app.config.services.content.remote + req.originalUrl
    }, (error, response, body) => {
        if (error) {
            console.error(`[server][sitemap] ${response.statusCode} ${response.statusText}`);
            res.status(500).send(response);
        } else {
            res.status(response.statusCode).set(response.headers).send(body);
        }
    });
}

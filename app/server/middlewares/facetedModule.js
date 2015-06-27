import request from 'request';

export default function(req, res) {
    console.info(`[server][facetedModuleAPI] facetedModule middleware handling ${req.url}`);
    request.get({
        host: req.get('host'),
        url: req.app.config.service.facetedModule.remote + req.originalUrl,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.error(`[server][facetedModuleAPI] ${response.statusCode} ${response.statusText}`);
            res.status(500).send(response);
        } else {
            res.status(response.statusCode).send(body);
        }
    });
}

import makeRequest from '../../makeRequest';

export default async function sitemapMiddleware(req, res, next) {
    const { section } = req.params;
    const serviceUrl = req.app.locals.config.services.remote.sitemap;
    const requestUrl = section ? `${serviceUrl}/${section}` : serviceUrl;

    try {
        const sitemaps = await makeRequest(requestUrl, false);
        res.header('Cache-Control', 'public, max-age=0');
        res.header('Content-Type', 'text/xml');
        res.send(sitemaps);
    } catch (err) {
        next(err);
    }
}

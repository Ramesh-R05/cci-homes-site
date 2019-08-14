import API from '../api';

export default async function sitemapMiddleware(req, res, next) {
    const { section } = req.params;

    try {
        const sitemaps = await API.getSitemap(section);
        res.header('Cache-Control', 'public, max-age=0');
        res.header('Content-Type', 'text/xml');
        res.send(sitemaps);
    } catch (err) {
        next(err);
    }
}

export default function renderMiddleware(req, res, next) {
    try {
        res.header('Cache-Control', 'public, max-age=0');
        res.json(res.body);
    } catch (error) {
        next(error);
    }
}

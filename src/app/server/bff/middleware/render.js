export default function render(req, res, next) {
    try {
        res.body = {
            ...res.body,
            stores: {
                ...res.body.stores
            }
        };

        res.header('Cache-Control', `public, max-age=0`);
        res.json(res.body);
    } catch(error) {
        console.error('[bff/middleware/render]', error);
        next(error);
    }
}

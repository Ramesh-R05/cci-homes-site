import home from './bff/middleware/home';
import render from './bff/middleware/render';
import error from './bff/middleware/error';
import headerMeta from './bff/middleware/headerMeta';

export default function bff(server) {
    server.use('/api/facetedModule', (req, res, next) => {
        // ignore the request from the homepage
        // this is handled in the bff middlewares
        if (req.query.node === 'HOMES-1158') {
            res.json({items: []});
        } else {
            next();
        }
    });

    server.get(
        server.config.services.endpoints.page,// Config set inside @bxm/server
        home,
        headerMeta,
        render,
        error
    );
}

import pageModules from './bff/middleware/pageModules';
import home from './bff/middleware/home';
import brand from './bff/middleware/brand';
import render from './bff/middleware/render';
import error from './bff/middleware/error';
import headerMeta from './bff/middleware/headerMeta';
import page from './bff/middleware/page';
import article from './bff/middleware/article';
import gallery from './bff/middleware/gallery'

export default function bff(server) {
    server.get(
        server.config.services.endpoints.page,// Config set inside @bxm/server
        pageModules,
        home,
        brand,
        page,
        article,
        gallery,
        headerMeta,
        render,
        error
    );
}

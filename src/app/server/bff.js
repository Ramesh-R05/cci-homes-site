import pageModules from './bff/middleware/pageModules';
import home from './bff/middleware/home';
import brand from './bff/middleware/brand';
import render from './bff/middleware/render';
import error from './bff/middleware/error';
import headerMeta from './bff/middleware/headerMeta';
import page from './bff/middleware/page';
import article from './bff/middleware/article';
import gallery from './bff/middleware/gallery';
import navSection from './bff/middleware/navSection';
import tag from './bff/middleware/tag';
import campaign from './bff/middleware/campaign';
import list from './bff/middleware/list';
import sitemap from './bff/middleware/sitemap';
import seo from './bff/middleware/seo';
import listing from './bff/middleware/listing';

export default function bff(server) {
    server.get('/sitemap/:section?', sitemap, error);

    server.get(
        server.config.services.endpoints.list,
        list,
        listing,
        render,
        error
    );

    server.get(
        server.config.services.endpoints.page,// Config set inside @bxm/server
        pageModules,
        home,
        brand,
        page,
        navSection,
        tag,
        article,
        gallery,
        campaign,
        listing,
        seo,
        headerMeta,
        render,
        error
    );
}

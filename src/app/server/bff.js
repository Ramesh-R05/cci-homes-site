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
import listing from './bff/middleware/listing';
import servicesStubs from './servicesStubs';
import https from './bff/middleware/https';
import assetProxy from './bff/middleware/assetProxy';
import comScore from './bff/middleware/comScore';

export default function bff(server) {
    if (process.env.APP_STUBBED === 'true' ||
        process.env.APP_ENV === 'test' ||
        process.env.NODE_ENV === 'stubbed' ||
        process.env.NODE_ENV === 'automation'
    ) {
        server.use('/stub', servicesStubs);
    }
    server.get('/api/asset', assetProxy);
    server.get('/sitemap/:section?', sitemap, error);
    server.get(
        server.locals.config.services.endpoints.list,
        list,
        listing,
        https,
        render,
        error
    );
    server.get(
        server.locals.config.services.endpoints.page, // Config set inside @bxm/server
        pageModules,
        comScore,
        home,
        brand,
        page,
        navSection,
        tag,
        article,
        gallery,
        campaign,
        listing,
        headerMeta,
        https,
        render,
        error
    );
}

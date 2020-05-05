import amp from '@bxm/server/lib/middleware/amp';
import assetProxy from '@bxm/server/lib/middleware/assetProxy';
import emailLinkTracking from '@bxm/server/lib/middleware/emailLinkTracking';
import article from './bff/middleware/article';
import brand from './bff/middleware/brand';
import campaign from './bff/middleware/campaign';
import comScore from './bff/middleware/comScore';
import directoryBreadcrumbs from './bff/directoryBreadcrumbs';
import directoryHome from './bff/middleware/directoryHome';
import error from './bff/middleware/error';
import gallery from './bff/middleware/gallery';
import headerMeta from './bff/middleware/headerMeta';
import home from './bff/middleware/home';
import https from './bff/middleware/https';
import latestBrandItems from './bff/middleware/latestBrandItems';
import latestBrandVideos from './bff/middleware/getLatestBrandVideos';
import list from './bff/middleware/list';
import listing from './bff/middleware/listing';
import listingSingle from './bff/middleware/listingSingle';
import listingsForCategory from './bff/middleware/listingsForCategory';
import navSection from './bff/middleware/navSection';
import page from './bff/middleware/page';
import pageModules from './bff/middleware/pageModules';
import render from './bff/middleware/render';
import search from './bff/middleware/search';
import sendEmail from './bff/middleware/sendEmail';
import servicesStubs from './servicesStubs';
import siteAlert from './bff/middleware/siteAlert';
import sitemap from './bff/middleware/sitemap';
import tag from './bff/middleware/tag';

export default function bff(server) {
    if (
        process.env.APP_STUBBED === 'true' ||
        process.env.APP_ENV === 'test' ||
        process.env.NODE_ENV === 'stubbed' ||
        process.env.NODE_ENV === 'automation'
    ) {
        server.use('/stub', servicesStubs);
    }

    server.use((req, res, next) => {
        switch (req.hostname) {
            case 'insideout.com.au':
            case 'www.insideout.com.au':
            // eslint-disable-next-link no-fallthrough
            case 'www2.insideout.com.au': {
                if (req.path === '' || req.path === '/') {
                    res.redirect(301, `https://www.homestolove.com.au/inside-out`);
                } else {
                    res.redirect(301, `https://www.homestolove.com.au${req.originalUrl}`);
                }

                break;
            }
            default: {
                next();
            }
        }
    });
    server.get('/api/asset', assetProxy);
    server.get('/sitemap/:section?', sitemap, error);
    server.get(server.locals.config.services.endpoints.list, list, listing, https, render, error);

    server.get(
        server.locals.config.services.endpoints.page,
        emailLinkTracking,
        pageModules,
        comScore,
        siteAlert,
        home,
        latestBrandItems,
        brand,
        latestBrandVideos,
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
    server.get(server.locals.config.services.endpoints.search, pageModules, comScore, headerMeta, search, https, render, error);
    server.get(
        server.locals.config.services.endpoints.directory,
        pageModules,
        comScore,
        listingSingle,
        listingsForCategory,
        directoryHome,
        directoryBreadcrumbs,
        headerMeta,
        https,
        render,
        error
    );
    server.get(server.locals.config.services.endpoints.email, sendEmail);
    server.get('(/:preview(preview))?/amp/:page-:id(\\d+)', pageModules, comScore, page, article, gallery, campaign, headerMeta, https, amp, error);
}

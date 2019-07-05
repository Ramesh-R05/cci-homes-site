import amp from '@bxm/server/lib/middleware/amp';
import emailLinkTracking from '@bxm/server/lib/middleware/emailLinkTracking';
import assetProxy from '@bxm/server/lib/middleware/assetProxy';
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
import comScore from './bff/middleware/comScore';
import search from './bff/middleware/search';
import listingSingle from './bff/middleware/listingSingle';
import listingsForCategory from './bff/middleware/listingsForCategory';
import directoryHome from './bff/middleware/directoryHome';
import latestBrandItems from './bff/middleware/latestBrandItems';
import latestBrandVideos from './bff/middleware/getLatestBrandVideos';
import sendEmail from './bff/middleware/sendEmail';

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
        headerMeta,
        https,
        render,
        error
    );
    server.get(server.locals.config.services.endpoints.email, sendEmail);
    server.get('(/:preview(preview))?/amp/:page-:id(\\d+)', pageModules, comScore, page, article, gallery, campaign, headerMeta, https, amp, error);
}

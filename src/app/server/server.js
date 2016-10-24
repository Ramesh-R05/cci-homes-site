import * as React from 'react';
import {navigateAction} from 'fluxible-router';
import facetedModule from './middlewares/facetedModule';
import sitemap from './middlewares/sitemap';
import contentApiStub from '../../automation/test_data/contentApi';
import servicesStubs from './servicesStubs';
import Server from '@bxm/server';
import env from '@bxm/server/lib/env';
import app from '../app';
import GoogleFont from '../components/html/googleFont';
import AdScript from '@bxm/ad/lib/google/components/script';
import networkHeaderMock from '@bxm/services-stubs/lib/templates/header/header';
import {load} from '@bxm/config';
const config = load();

const server = new Server({
    React: React,
    config: config,
    app: app,
    navigateAction: navigateAction,
    additionalHeadComponents: [GoogleFont, AdScript],
    siteMiddlewares: (siteServer) => {
        siteServer.use('/api/facetedModule', facetedModule);
        siteServer.use(/\/sitemap(\?|$|\/).*/, sitemap);

        if (env.stubbed || env.automation) {
            siteServer.use('/stub', servicesStubs);

            //Network Header Stub
            siteServer.get('/stub/wn-header', (req, res) => res.json(networkHeaderMock));
        }
    }
});

server.start();
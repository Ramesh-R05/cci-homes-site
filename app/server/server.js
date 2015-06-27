import * as React from 'react';
import {navigateAction} from 'fluxible-router';
import patternLab from '../../patternlab/app/server/middleware';
import facetedModule from './middlewares/facetedModule';
import contentApiStub from '../../automation/stubs/contentApi';
import Server from '@bxm/server';
import env from '@bxm/server/lib/env';
import config from '../config/config';
import app from '../app';
import GoogleFont from '../components/html/googleFont';
import AdScript from '@bxm/ad/src/google/components/script';

function siteMiddlewares(siteServer) {
    siteServer.get(/\/patternlab(\?|$|\/).*/, patternLab);
    siteServer.use('/api/facetedModule', facetedModule);
}

const server = new Server({
    React: React,
    config: config,
    app: app,
    navigateAction: navigateAction,
    additionalHeadComponents: [GoogleFont, AdScript],
    siteMiddlewares: siteMiddlewares
});

if (env.stubbed || env.automation) contentApiStub.start(3000);

server.start();

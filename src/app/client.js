import 'babel-polyfill';
import 'picturefill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createElementWithContext } from 'fluxible-addons-react';
import fluxibleConfigPlugin from 'fluxible-plugin-context-config';
import batchedUpdatePlugin from 'fluxible-addons-react/batchedUpdatePlugin';
import app from './app';
import adConfig from './config/ads';

window.React = React; // For chrome dev tool support

function renderClientSideApp(AppComponent) {
    require('../styles/main.scss');
    AppComponent.plug(fluxibleConfigPlugin());
    AppComponent.plug(batchedUpdatePlugin());

    AppComponent.rehydrate(window.App, (err, context) => {
        if (err) {
            throw err;
        }

        const mountNode = document.getElementById('app');
        const { userAgent } = window.navigator;
        adConfig.init(context.getComponentContext().config.site.adTaggingId);
        ReactDOM.hydrate(createElementWithContext(context, { userAgent }), mountNode, () => {});
    });
}

renderClientSideApp(app);

if (module && module.hot) {
    module.hot.accept('./app', '../styles/main.scss', () => {
        const newApp = require('./app');

        renderClientSideApp(newApp);
    });
}

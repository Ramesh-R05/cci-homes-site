import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createElementWithContext} from 'fluxible-addons-react';
import app from './app';

const dehydratedState = window.App;

window.React = React; // For chrome dev tool support

app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }
    window.context = context;
    const mountNode = document.getElementById('app');

    ReactDOM.render(createElementWithContext(context), mountNode, () => {
        console.log('[CLIENT] - react rendered');
    });
});

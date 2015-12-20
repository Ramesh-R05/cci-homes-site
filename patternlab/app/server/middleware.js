import React from 'react';
import ReactDOM from 'react-dom/server';
import {navigateAction} from 'fluxible-router';
import serialize from 'serialize-javascript';
import app from '../app';
import HtmlComponent from '../components/core/html/html';


export default function(req, res) {
    console.info(`[server][patternlab] patternLab middleware handling ${req.url}`);
    const context = app.createContext();
    const htmlComponent = React.createFactory(HtmlComponent);
    context.executeAction(navigateAction, { url: req.url }, (err) => {
        if (err) res.status(500).send('[patternlab] route not found');
        const exposed = `window.App=${serialize(app.dehydrate(context))};`;
        const html = ReactDOM.renderToStaticMarkup(htmlComponent({
            state: exposed,
            markup: ReactDOM.renderToString(context.createElement()),
            context: context.getComponentContext()
        }));
        res.send(html);
    });
}


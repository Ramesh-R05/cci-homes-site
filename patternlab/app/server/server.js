import React from 'react';
import {navigateAction} from 'fluxible-router';
import serialize from 'serialize-javascript';
import app from '../app';

export default {
    startOn(server) {
        server.get('/patternlab/*', (req, res) => {
            const context = app.createContext();
            const htmlComponent = React.createFactory(require('../components/core/html/html'));

            context.executeAction(navigateAction, { url: req.url }, (err, result) => {
                if (err) console.info(`error in patternlab route: ${err}`);

                const exposed = `window.App=${serialize(app.dehydrate(context))};`;
                const html = React.renderToStaticMarkup(htmlComponent({
                    state: exposed,
                    markup: React.renderToString(context.createElement()),
                    context: context.getComponentContext()
                }));
                res.send(html);
            });
        });
    }
};

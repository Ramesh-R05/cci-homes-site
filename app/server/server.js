let PRODUCTION_MODE = false;
let AUTOMATION_MODE = false;

if (process.env.NODE_ENVIRONMENT === 'live') {
    PRODUCTION_MODE = true;
}

if (process.env.NODE_ENVIRONMENT === 'automation' || process.env.NODE_ENVIRONMENT === 'stubbed') {
    AUTOMATION_MODE = true;
}

let startStubs = () => {
    let loginRadiusStub = require('@bxm/login-radius-stub');
    loginRadiusStub.start(4001);
    let globalHeaderStub = require('@bxm/global-header-stub');
    globalHeaderStub.start(4011);
    let servicesStubs = require('@bxm/services-stubs');
    servicesStubs.start(4000);
    //let contentApiStub = require('../../automation/stubs/contentApi');
    //contentApiStub.start(3000);
};

let main = () => {
    if (!PRODUCTION_MODE) startStubs();

    let express = require('express');
    let connectionTimeout = require('connect-timeout');
    let bodyParser = require('body-parser');
    let compress = require('compression');
    let request = require('request');
    let react = require('react');
    let serialize = require('serialize-javascript');

    let version = require('../version.js');
    let config = require('../config/config');
    let app = require('../app');
    let navigateAction = require('fluxible-router').navigateAction;
    // let loadContent = require('../actions/loadContent');
    let htmlComponent = react.createFactory(require('../components/html/html'));

    let server = express();

    server.set('state namespace', 'App');
    server.use(bodyParser.json({ parameterLimit: 50000, limit: '25mb' }));
    server.use(bodyParser.urlencoded({ parameterLimit: 50000, limit: '25mb', extended: true }));
    server.use(compress());

    // TODO (db): add pass through routes for sitemap and robots
    server.use('/dist', express.static('dist'));
    server.use('/assets', express.static('assets'));
    server.use('/fonts', express.static('assets/fonts'));
    server.use('/styleguide', express.static('app/styleguide'));
    server.use('/favicon.ico', express.static('images/favicon.ico'));

    server.use('/version', (req, res) => { res.json(version); });
    server.use('/api/verifysite', (req, res) => {
        res.json({isVerified: true, verifiedMessage: 'Verified'});
    });

    const patternlab = require('../../patternlab/app/server/server');
    patternlab.startOn(server);

    server.use('/api/content', (req, res) => {
        request.get({
            host: req.get('host'),
            url: config.service.content.remote + req.originalUrl.replace('/api/content', ''),
            json: true
        }, (error, response, body) => {
            if (error) {
                console.info('[SERVER][CONTENT API]', error);
                res.status(response.statusCode).send(response);
            } else {
                res.status(response.statusCode).send(body);
            }
        });
    });

    server.use('/', (req, res, next) => {
        let context = app.createContext();
        context.executeAction(navigateAction, { url: req.originalUrl }, (err) => {
            if (err) return next(err);
            let exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
            let html = react.renderToStaticMarkup(htmlComponent({
                state: exposed,
                markup: react.renderToString(context.createElement()),
                context: context.getComponentContext()
            }));
            res.send(html);
        });
    });

    server.use(connectionTimeout(5000));
    server.use((err, req, res, next) => {
        if (req.timedout) {
            res.status(408).send(err.stack);
        } else {
            return next(err);
        }
    });

    server.use((err, req, res) => {
        res.status(404).send(err);
    });

    //if (PRODUCTION_MODE) {
    //    let newrelic = require('newrelic');
    //    server.locals.newrelic = newrelic;
    //}

    let nodeServerPort = config.server.port;
    server.listen(nodeServerPort);
    console.info('listening on port ' + nodeServerPort);
};

if (PRODUCTION_MODE || AUTOMATION_MODE) {
    let cluster = require('cluster');
    let os = require('os');
    let i;
    let n;

    if (cluster.isMaster) {
        for (i = 0, n = os.cpus().length; i < n; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker) => {
            console.info('worker ' + worker.process.pid + ' died');
        });

        cluster.on('online', (worker) => {
            console.info('worker with pid ' + worker.process.pid + ' successfully online');
        });
    } else {
        main();
    }
} else {
    main();
}

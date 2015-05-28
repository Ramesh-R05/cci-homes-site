import config from './config/config';
import {Flux, servicesPlugin} from '@bxm/flux';

import AppComponent from './components/app';

import contentService from './services/content';

import PageStore from './stores/page';
import RouteStore from './stores/route';
import EntityStore from './stores/entity';
import ArticleStore from './stores/article';

let app = new Flux({
    component: AppComponent,
    stores: [
        RouteStore,
        PageStore,
        EntityStore,
        ArticleStore
    ]
});

let servicePlugin = servicesPlugin(config);
servicePlugin.registerService(contentService);

app.plug(servicePlugin);

export default app;

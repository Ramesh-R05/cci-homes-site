import config from './config/config';
import {Flux, servicesPlugin} from '@bxm/flux';

import AppComponent from './components/app';
import contentService from './services/content';
import adConfig from './config/ads';
import facetedModuleService from './services/facetedModule.js';

import AdStore from '@bxm/ad/src/google/stores/ad';
import PageStore from './stores/page';
import RouteStore from './stores/route';
import EntityStore from './stores/entity';
import ArticleStore from './stores/article';
import TaggedArticlesStore from './stores/facetedStores/taggedArticles.js';

adConfig.init();

let app = new Flux({
    component: AppComponent,
    stores: [
        RouteStore,
        PageStore,
        EntityStore,
        ArticleStore,
        AdStore,
        TaggedArticlesStore
    ]
});

let servicePlugin = servicesPlugin(config);
servicePlugin.registerService(contentService);
servicePlugin.registerService(facetedModuleService);

app.plug(servicePlugin);

export default app;

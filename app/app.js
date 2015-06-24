import config from './config/config';
import {Flux, servicesPlugin} from '@bxm/flux';

import AppComponent from './components/app';
import contentService from './services/content';
import adConfig from './config/ads';

import AdStore from '@bxm/ad/src/google/stores/ad';
import PageStore from './stores/page';
import RouteStore from './stores/route';
import EntityStore from './stores/entity';
import ArticleStore from './stores/article';

//Global header
import NetworkHeaderStore from '@bxm/header/lib/header/headerStore';
import networkHeaderService from '@bxm/header/lib/header/headerService';

adConfig.init();

let app = new Flux({
    component: AppComponent,
    stores: [
        RouteStore,
        PageStore,
        EntityStore,
        ArticleStore,
        AdStore,
        NetworkHeaderStore
    ]
});

let servicePlugin = servicesPlugin(config);
servicePlugin.registerService(contentService);
servicePlugin.registerService(networkHeaderService);

app.plug(servicePlugin);

export default app;

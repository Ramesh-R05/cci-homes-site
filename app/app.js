import config from './config/config';
import {Flux, servicesPlugin} from '@bxm/flux';

import AppComponent from './components/app';
import contentService from './services/content';
import adConfig from './config/ads';
import facetedModuleService from './services/facetedModule';

import HtmlStore from '@bxm/server/lib/stores/html';
import AdStore from '@bxm/ad/src/google/stores/ad';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import RouteStore from './stores/route';
import EntityStore from './stores/entity';
import SocialStore from './../node_modules/@bxm/ui/lib/social/stores/SocialStore';
import TaggedArticlesStore from './stores/facetedStores/taggedArticles';
import FeedStore from './stores/facetedStores/feed';

//Global header
import NetworkHeaderStore from '@bxm/header/lib/header/headerStore';
import networkHeaderService from '@bxm/header/lib/header/headerService';

adConfig.init();

let app = new Flux({
    component: AppComponent,
    stores: [
        // Keep in alphabetical order to make diffs easier
        AdStore,
        EntityStore,
        FeedStore,
        GalleryStore,
        HtmlStore,
        NetworkHeaderStore,
        RouteStore,
        SocialStore,
        TaggedArticlesStore
    ]
});

let servicePlugin = servicesPlugin(config);
servicePlugin.registerService(contentService);
servicePlugin.registerService(facetedModuleService);
servicePlugin.registerService(networkHeaderService);

app.plug(servicePlugin);

export default app;

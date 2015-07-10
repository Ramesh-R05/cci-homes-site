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
import HomeArticles from './stores/articles/home';
import InFocusArticles from './stores/articles/inFocus';

//Global header
import NetworkHeaderStore from '@bxm/header/lib/header/headerStore';
import networkHeaderService from '@bxm/header/lib/header/headerService';

import {load, configPlugin} from '@bxm/config';
const config = load();

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
        HomeArticles,
        InFocusArticles,
        NetworkHeaderStore,
        RouteStore,
        SocialStore,
        TaggedArticlesStore
    ]
});

let configsPlugin = configPlugin(config);
let servicePlugin = servicesPlugin(config);
servicePlugin.registerService(contentService);
servicePlugin.registerService(facetedModuleService);
servicePlugin.registerService(networkHeaderService);

app.plug(servicePlugin);
app.plug(configsPlugin);

export default app;

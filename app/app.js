import {canUseDOM} from 'react/lib/ExecutionEnvironment';
if (canUseDOM) require('console-shim');

import {Flux, servicesPlugin} from '@bxm/flux';

import AppComponent from './components/app';
import contentService from './services/content';
import adConfig from './config/ads';
import facetedModuleService from './services/facetedModule';
import networkHeaderService from '@bxm/header/lib/header/headerService';

// Keep store imports in alphabetical order to make diffs easier
import AdStore from '@bxm/ad/lib/google/stores/ad';
import BrandSectionStore from './stores/facetedStores/brand';
import EntityStore from './stores/entity';
import FeedStore from './stores/facetedStores/feed';
import GalleryPageStore from './stores/gallery';
import GalleryOfGalleriesStore from './stores/facetedStores/galleryOfGalleries';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import HomeArticles from './stores/articles/home';
import HtmlStore from '@bxm/server/lib/stores/html';
import InFocusArticles from './stores/articles/inFocus';
import NetworkHeaderStore from '@bxm/header/lib/header/headerStore';
import PolarAdStore from '@bxm/ad/lib/polar/stores/PolarAdStore';
import RouteStore from './stores/route';
import MenuStore from './stores/menu';
import SocialStore from '@bxm/ui/lib/social/stores/SocialStore';
import TaggedArticlesStore from './stores/facetedStores/taggedArticles';
import TrackingStore from './stores/tracking';

import {load, configPlugin} from '@bxm/config';
const config = load();

adConfig.init();

let app = new Flux({
    component: AppComponent,
    stores: [
        // Keep in alphabetical order to make diffs easier
        AdStore,
        BrandSectionStore,
        EntityStore,
        FeedStore,
        GalleryPageStore,
        GalleryStore,
        GalleryOfGalleriesStore,
        HomeArticles,
        HtmlStore,
        InFocusArticles,
        NetworkHeaderStore,
        PolarAdStore,
        RouteStore,
        MenuStore,
        SocialStore,
        TaggedArticlesStore,
        TrackingStore
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

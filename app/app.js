import {canUseDOM} from 'exenv';
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
import GalleryPageStore from '@bxm/gallery/lib/stores/galleryPage';
import GalleryOfGalleriesStore from './stores/facetedStores/galleryOfGalleries';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import HomeArticles from './stores/articles/home';
import HtmlStore from '@bxm/server/lib/stores/html';
import InFocusArticles from './stores/articles/inFocus';
import NetworkHeaderStore from '@bxm/header/lib/header/headerStore';
import PolarAdStore from '@bxm/ad/lib/polar/stores/PolarAdStore';
import RouteStore from './stores/route';
import MenuStore from './stores/menu';
import RequestStore from './stores/request';
import SocialStore from '@bxm/ui/lib/social/stores/SocialStore';
import TaggedArticlesStore from './stores/facetedStores/taggedArticles';
import TagSectionStore from './stores/facetedStores/tagSection';
import TrackingStore from './stores/tracking';
import articleStore from '@bxm/article/lib/stores/articleStore';
import articleFeedService from '@bxm/article/lib/services/articleFeedService';

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
        RequestStore,
        SocialStore,
        TaggedArticlesStore,
        TagSectionStore,
        TrackingStore,
        articleStore
    ]
});

let configsPlugin = configPlugin(config);
let servicePlugin = servicesPlugin(config);
servicePlugin.registerService(contentService);
servicePlugin.registerService(facetedModuleService);
servicePlugin.registerService(networkHeaderService);
servicePlugin.registerService(articleFeedService);

app.plug(servicePlugin);
app.plug(configsPlugin);

export default app;

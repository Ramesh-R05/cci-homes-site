import {canUseDOM} from 'exenv';
if (canUseDOM) require('console-shim');

import {Flux, servicesPlugin} from '@bxm/flux';
import batchedUpdatePlugin from 'fluxible-addons-react/batchedUpdatePlugin';
import AppComponent from './components/app';
import pageService from './services/page';
import listService from './services/list';
import adConfig from './config/ads';
import networkHeaderService from '@bxm/header/lib/header/headerService';

// Keep store imports in alphabetical order to make diffs easier
import AdStore from '@bxm/ad/lib/google/stores/ad';
import PageStore from './stores/page';
import GalleryPageStore from '@bxm/gallery/lib/stores/galleryPage';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import HtmlStore from '@bxm/server/lib/stores/html';
import NetworkHeaderStore from '@bxm/header/lib/header/headerStore';
import PolarAdStore from '@bxm/ad/lib/polar/stores/PolarAdStore';
import RouteStore from './stores/route';
import MenuStore from './stores/menu';
import SocialStore from '@bxm/social/lib/stores/social';
import TrackingStore from './stores/tracking';
import articleStore from '@bxm/article/lib/stores/articleStore';
import {load, configPlugin} from '@bxm/config';
import VerticalGalleryStore from '@bxm/article/lib/stores/verticalGalleryStore';

const config = load();

adConfig.init();

let app = new Flux({
    component: AppComponent,
    stores: [
        // Keep in alphabetical order to make diffs easier
        AdStore,
        GalleryPageStore,
        GalleryStore,
        HtmlStore,
        VerticalGalleryStore,
        NetworkHeaderStore,
        PolarAdStore,
        RouteStore,
        MenuStore,
        PageStore,
        SocialStore,
        TrackingStore,
        articleStore
    ]
});

let configsPlugin = configPlugin(config);
let servicePlugin = servicesPlugin(config);
servicePlugin.registerService(pageService);
servicePlugin.registerService(listService);
servicePlugin.registerService(networkHeaderService);

app.plug(servicePlugin);
app.plug(configsPlugin);
app.plug(batchedUpdatePlugin());

export default app;

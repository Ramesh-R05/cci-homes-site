import { Flux, servicesPlugin } from '@bxm/flux';
import AppComponent from './components/app';
import pageService from './services/page';
import listService from './services/list';
import AdStore from '@bxm/ad/lib/google/stores/ad';
import ArticleStore from '@bxm/article/lib/stores/articleStore';
import GalleryPageStore from '@bxm/gallery/lib/stores/galleryPage';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import HtmlStore from '@bxm/server/lib/stores/html';
import MenuStore from './stores/menu';
import PageStore from './stores/page';
import PolarAdStore from '@bxm/ad/lib/polar/stores/PolarAdStore';
import RouteStore from './stores/route';
import TrackingStore from './stores/tracking';
import VerticalGalleryStore from '@bxm/article/lib/stores/verticalGalleryStore';


const app = new Flux({
    component: AppComponent,
    stores: [
        AdStore,
        ArticleStore,
        GalleryPageStore,
        GalleryStore,
        HtmlStore,
        VerticalGalleryStore,
        PolarAdStore,
        RouteStore,
        MenuStore,
        PageStore,
        PolarAdStore,
        RouteStore,
        TrackingStore
    ]
});

const servicePlugin = servicesPlugin();
servicePlugin.registerService(pageService);
servicePlugin.registerService(listService);
app.plug(servicePlugin);

export default app;

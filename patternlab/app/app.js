import {Flux} from '@bxm/flux';
import AppComponent from './components/core/app';
import RouteStore from './stores/route';
import SocialStore from '@bxm/ui/lib/social/stores/SocialStore';

let app = new Flux({
    component: AppComponent,
    stores: [
        RouteStore,
        SocialStore
    ]
});

export default app;

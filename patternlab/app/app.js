import {Flux} from '@bxm/flux';
import AppComponent from './components/core/app';
import RouteStore from './stores/route';


let app = new Flux({
    component: AppComponent,
    stores: [
        RouteStore
    ]
});

export default app;

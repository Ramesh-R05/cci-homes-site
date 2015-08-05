import FacetedModuleStore, {handlers} from '../facetedStores/facetedModule';

export default class FeedStore extends FacetedModuleStore {

    static storeName = 'FeedStore';

    static handlers = handlers;

    constructor(dispatcher) {
        super(dispatcher, 'leftHandRail');
    }

}

import FacetedModuleStore from '../facetedStores/facetedModule';

export default class FeedStore extends FacetedModuleStore {
    constructor(dispatcher) {
        super(dispatcher, 'leftHandRail');
    }
}

FeedStore.storeName = 'FeedStore';

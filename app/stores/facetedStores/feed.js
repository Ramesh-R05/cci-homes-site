import FacetedModuleStore from '../facetedStores/facetedModule';

export default class FeedStore extends FacetedModuleStore {

    static storeName = 'FeedStore'

    constructor(dispatcher) {
        super(dispatcher, 'leftHandRail');
    }

}

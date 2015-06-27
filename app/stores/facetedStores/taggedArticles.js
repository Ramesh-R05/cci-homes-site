import FacetedModuleStore from '../facetedStores/facetedModule';

export default class TaggedArticlesStore extends FacetedModuleStore {
    constructor(dispatcher) {
        super(dispatcher, 'taggedArticles');
    }
}

TaggedArticlesStore.storeName = 'TaggedArticlesStore';

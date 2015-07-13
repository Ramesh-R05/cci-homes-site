import FacetedModuleStore from '../facetedStores/facetedModule';

export default class TaggedArticlesStore extends FacetedModuleStore {

    static storeName = 'TaggedArticlesStore'

    constructor(dispatcher) {
        super(dispatcher, 'taggedArticles');
    }

}

import FacetedModuleStore, {handlers} from '../facetedStores/facetedModule';

export default class TaggedArticlesStore extends FacetedModuleStore {

    static storeName = 'TaggedArticlesStore';

    static handlers = handlers;

    constructor(dispatcher) {
        super(dispatcher, 'taggedArticles');
    }

}

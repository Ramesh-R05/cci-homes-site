import FacetedModuleStore, {handlers} from '../facetedStores/facetedModule';

export default class TagSectionStore extends FacetedModuleStore {

    static storeName = 'TagSectionStore';

    static handlers = handlers;

    constructor(dispatcher) {
        super(dispatcher, 'tagSection');
    }

}

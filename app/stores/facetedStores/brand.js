import FacetedModuleStore, {handlers} from '../facetedStores/facetedModule';

export default class BrandSectionStore extends FacetedModuleStore {

    static storeName = 'BrandSectionStore';

    static handlers = handlers;

    constructor(dispatcher) {
        super(dispatcher, 'brandSection');
    }

}

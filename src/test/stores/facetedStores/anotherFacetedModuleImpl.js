import FacetedModuleStore, {handlers} from '../../../app/stores/facetedStores/facetedModule';

export default class AnotherFacetedModuleStoreImpl extends FacetedModuleStore {
    constructor(dispatcher) {
        super(dispatcher, 'anotherStoreName');
    }
}

AnotherFacetedModuleStoreImpl.storeName = 'AnotherFacetedModuleStoreImpl';
AnotherFacetedModuleStoreImpl.handlers = handlers;

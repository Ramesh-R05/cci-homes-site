import FacetedModuleStore, {handlers} from '../../../app/stores/facetedStores/facetedModule';

export default class FacetedModuleStoreImpl extends FacetedModuleStore {
    constructor(dispatcher) {
        super(dispatcher, 'storeName');
    }
}

FacetedModuleStoreImpl.storeName = 'FacetedModuleStoreImpl';
FacetedModuleStoreImpl.handlers = handlers;

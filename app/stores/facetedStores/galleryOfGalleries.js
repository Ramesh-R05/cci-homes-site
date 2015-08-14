import FacetedModuleStore, {handlers} from './facetedModule';

export default class GalleryOfGalleriesStore extends FacetedModuleStore {

    static storeName = 'GalleryOfGalleriesStore';

    static handlers = handlers;

    constructor(dispatcher) {
        super(dispatcher, 'galleryOfGalleries');
    }

}

import { validateRouteParams } from '@bxm/flux';

function trackListingGalleryModalOpened(context, payload) {
    context.dispatch('LISTING_GALLERY_MODAL_OPENED', payload);
}

export default validateRouteParams(trackListingGalleryModalOpened);

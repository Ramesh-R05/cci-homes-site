import { validateRouteParams } from '@bxm/flux';

function trackListingCardContactOpen(context, payload) {
    context.dispatch('LISTING_CARD_CONTACT_OPENED', payload);
}

export default validateRouteParams(trackListingCardContactOpen);

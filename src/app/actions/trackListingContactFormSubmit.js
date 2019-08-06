import { validateRouteParams } from '@bxm/flux';

function trackListingContactFormSubmit(context, payload) {
    context.dispatch('LISTING_CONTACT_FORM_SUBMIT', payload);
}

export default validateRouteParams(trackListingContactFormSubmit);

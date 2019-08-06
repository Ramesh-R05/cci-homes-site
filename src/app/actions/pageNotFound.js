import { validateRouteParams } from '@bxm/flux';

function pageNotFound(context, payload) {
    context.dispatch('PAGE_NOT_FOUND', { payload });
}

export default validateRouteParams(pageNotFound);

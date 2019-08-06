import { validateRouteParams } from '@bxm/flux';

function defaultRenderFailed(context, payload) {
    return context.dispatch('DEFAULT_RENDER_FAILED', new Error(payload));
}

export default validateRouteParams(defaultRenderFailed);

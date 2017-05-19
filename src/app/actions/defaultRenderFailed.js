export default function defaultRenderFailed(context, payload) {
    return context.dispatch('DEFAULT_RENDER_FAILED', new Error(payload));
}

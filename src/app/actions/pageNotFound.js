export default function pageNotFound(context) {
    context.dispatch('LOAD_CONTENT_FAILED', { response: { status: 404 } });
}

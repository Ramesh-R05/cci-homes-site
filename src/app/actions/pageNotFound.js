export default function(context, payload) {
    context.dispatch('LOAD_CONTENT_FAILED', {
        response: {
            error: {status: 404}
        }
    });
}

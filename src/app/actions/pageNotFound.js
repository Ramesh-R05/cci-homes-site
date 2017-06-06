export default function pageNotFound(context, payload) {
    context.dispatch('PAGE_NOT_FOUND', { payload });
}

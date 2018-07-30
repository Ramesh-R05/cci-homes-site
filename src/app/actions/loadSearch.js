export default function searchList(context, payload) {
    return context
        .getService('search')
        .read(payload)
        .then(
            content => {
                if (content instanceof Error) context.dispatch('LOAD_SEARCH_FAILED', content);
                else context.dispatch('LOAD_SEARCH', content);
            },
            error => context.dispatch('LOAD_SEARCH_FAILED', error)
        );
}

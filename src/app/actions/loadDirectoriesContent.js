export default function loadDirectoriesContent(context, payload) {
    const params = {
        ...payload.query,
        navSection: 'directories'
    };

    return context
        .getService('directories')
        .read(params)
        .then(
            content => context.dispatch('LOAD_DIRECTORIES_CONTENT', { ...content }),
            error => context.dispatch('LOAD_DIRECTORIES_CONTENT_FAILED', error)
        );
}

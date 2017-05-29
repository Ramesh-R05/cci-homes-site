export default function loadPageContent(context, payload) {
    const params = { ...payload.params, hostname: payload.navigate.hostname };
    params.pageNo = payload.query.pageNo;
    return context.getService('page').read(params).then(
        content => context.dispatch('LOAD_CONTENT', { ...content }),
        error => context.dispatch('LOAD_CONTENT_FAILED', error)
    );
}

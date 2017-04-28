export default function(context, payload) {
    const params = { ... payload.params, hostname: payload.navigate.hostname };
    params.pageNo = payload.query.pageNo;
    return context.getService('page').read(params).then(
        (content) => {
            context.dispatch('LOAD_CONTENT', { ...content, request: { payload } });
        },
        (error) => {
            console.error(`[action][load page content][failed] ${error.response.error.status}`);
            context.dispatch('LOAD_CONTENT_FAILED', error);
        }
    );
}

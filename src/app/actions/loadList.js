export default function loadList(context, payload) {
    return context.getService('list').read(payload).then(
        (content) => {
            context.dispatch('LOAD_LIST', content);
        },
        (error) => {
            console.error(`[action][load list][failed] ${error.response.error.status}`);
            context.dispatch('LOAD_LIST_FAILED', error);
        }
    );
}

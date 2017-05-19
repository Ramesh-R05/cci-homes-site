export default function loadList(context, payload) {
    return context.getService('list').read(payload).then(
        content => context.dispatch('LOAD_LIST', content),
        error => context.dispatch('LOAD_LIST_FAILED', error)
    );
}

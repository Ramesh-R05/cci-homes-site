import directoryService from '../services/directory';

export default function loadDirectoryContent(context, payload) {
    const routeStore = context.getStore('RouteStore');
    const navigate = routeStore.getCurrentNavigate();

    const params = {
        ...payload.query,
        ...payload.params,
        url: payload.url,
        hostname: navigate.hostname
    };

    return directoryService.read(params).then(
        content => {
            if (content instanceof Error) {
                context.dispatch('LOAD_DIRECTORY_CONTENT_FAILED', content);
            } else {
                context.dispatch('LOAD_DIRECTORY_CONTENT', { ...content, request: { payload } });
            }
        },
        error => context.dispatch('LOAD_DIRECTORY_CONTENT_FAILED', error)
    );
}

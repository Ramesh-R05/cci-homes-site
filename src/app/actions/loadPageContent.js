import { validateRouteParams } from '@bxm/flux';
import pageService from '../services/page';

function loadPageContent(context, payload) {
    const routeStore = context.getStore('RouteStore');
    const navigate = routeStore.getCurrentNavigate();

    const params = {
        ...payload.params,
        ...payload.query,
        hostname: navigate.hostname,
        url: payload.url
    };

    params.pageNo = payload.query.pageNo;

    return pageService
        .read(params)
        .then(
            content => {
                if (content instanceof Error) {
                    context.dispatch('LOAD_CONTENT_FAILED', content);
                } else {
                    context.dispatch('LOAD_CONTENT', { ...content, request: { payload } });
                }
            },
            error => context.dispatch('LOAD_CONTENT_FAILED', error)
        )
        .catch(error => context.dispatch('LOAD_CONTENT_FAILED', error));
}

export default validateRouteParams(loadPageContent);

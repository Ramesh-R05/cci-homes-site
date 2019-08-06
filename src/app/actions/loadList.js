import { validateRouteParams } from '@bxm/flux';
import listService from '../services/list';

function loadList(context, payload) {
    return listService.read(payload).then(content => context.dispatch('LOAD_LIST', content), error => context.dispatch('LOAD_LIST_FAILED', error));
}

export default validateRouteParams(loadList);

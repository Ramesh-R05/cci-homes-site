import searchService from '../services/search';

function searchList(context, payload) {
    return searchService.read(payload).then(
        content => {
            if (content instanceof Error) {
                context.dispatch('LOAD_SEARCH_FAILED', content);
            } else {
                context.dispatch('LOAD_SEARCH', content);
            }
        },
        error => context.dispatch('LOAD_SEARCH_FAILED', error)
    );
}

export default searchList;

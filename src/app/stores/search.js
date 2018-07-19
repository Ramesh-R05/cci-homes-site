import { createReducerStore } from 'fluxible-reducer-store';
import get from 'lodash/object/get';

export const initialState = {
    nodeType: null,
    error: null,
    footer: {},
    title: '',
    magazineImageUrl: '',
    magCover: {
        moduleImageUrl: ''
    },
    headerNavigation: [],
    headerMetaData: {
        title: ''
    },
    comScoreSegmentIds: '',
    search: {
        total: 0,
        initialResults: [],
        resultsList: []
    },
    list: {
        items: []
    },
    latestTeasers: [],
    theme: {}
};

const LOAD_SEARCH = (state, payload) => {
    const {
        search,
        footer = {},
        headerNavigation,
        comScoreSegmentIds = initialState.comScoreSegmentIds
    } = payload.body;
    const magCover = get(payload, 'body.magCover', {});

    if (!search) return state;

    return {
        error: null,
        title: payload.body.headerMetaData.title,
        footer,
        magazineImageUrl: magCover.moduleImageUrl || '',
        theme: payload.body.theme,
        magCover,
        latestTeasers: payload.body.list.params.pageNo === 1 ? payload.body.latestTeasers : state.latestTeasers,
        list: {
            ...payload.body.list,
            items: [
                ...state.list.items,
                ...payload.body.list.items
            ]
        },
        search: {
            total: search.total,
            initialResults: payload.body.latestTeasers,
            resultsList: payload.body.list
        },
        comScoreSegmentIds,
        headerNavigation
    };
};
const LOAD_SEARCH_FAILED = (state, payload) => {
    const { response = {} } = payload;
    const { body = {} } = response;
    const footer = body.footer || {};
    const magCover = body.magCover || {};
    const comScoreSegmentIds = get(payload, 'body.comScoreSegmentIds', initialState.comScoreSegmentIds);
    const headerNavigation = get(payload, 'body.headerNavigation', initialState.headerNavigation);

    response.status = response.status || 400;

    return {
        error: response,
        title: '',
        footer,
        magazineImageUrl: '',
        theme: {},
        magCover,
        list: {
            items: []
        },
        latestTeasers: [],
        search: {
            total: 0,
            initialResults: [],
            resultsList: []
        },
        comScoreSegmentIds,
        headerNavigation
    };
};
// This is mainly used for tests
export const reducer = (state, payload, eventName) => {
    switch (eventName) {
    case 'LOAD_SEARCH':
        return LOAD_SEARCH(state, payload);
    case 'LOAD_SEARCH_FAILED':
        return LOAD_SEARCH_FAILED(state, payload);
    default:
        return initialState;
    }
};

const SearchStore = createReducerStore({
    storeName: 'SearchStore',
    initialState,
    reducers: {
        LOAD_SEARCH,
        LOAD_SEARCH_FAILED
    },
    getters: {
        getTitle(state) {
            return state.title;
        },

        getMagazineImageUrl(state) {
            return get(state, 'magCover.moduleImageUrl', '');
        },

        getSearchTotal(state) {
            return get(state, 'search.total', 0);
        },

        getInitialSearchResults(state) {
            return state.latestTeasers;
        },

        getSearchResultsList(state) {
            return state.list;
        },

        getSearchListNextParams(state) {
            const pageNo = parseInt(get(state, 'list.params.pageNo', 1), 10);
            const listParams = get(state, 'list.params', {});

            return {
                ...listParams,
                pageNo: pageNo + 1
            };
        },

        getHeaderItems(state) {
            if (!state.headerNavigation) return [];
            return state.headerNavigation.items ? state.headerNavigation.items : state.headerNavigation;
        },

        getErrorStatus(state) {
            return state.error;
        },

        getModule: (state, module) => {
            if (!module) return [];
            return state[module] || [];
        }
    }
});

export default SearchStore;

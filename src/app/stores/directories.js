import { createReducerStore } from 'fluxible-reducer-store';

export const initialState = {
    nodeType: null,
    error: null,
    content: null,
    topDirectories: [],
    remainingDirectories: [],
    title: '',
    comScoreSegmentIds: '',
    headerNavigation: {
        items: []
    },
    hamburgerNavigation: {
        items: []
    },
    directoryFilters: []
};

const LOAD_DIRECTORIES_CONTENT = (state, payload) => {
    const {
        entity,
        topDirectories,
        remainingDirectories,
        directoryFilters,
        comScoreSegmentIds,
        headerNavigation,
        hamburgerNavigation
    } = payload.body;

    if (entity) {
        return {
            title: entity.title,
            content: entity,
            topDirectories,
            remainingDirectories,
            navigationTags: entity.navigationTags,
            comScoreSegmentIds,
            directoryFilters,
            headerNavigation: headerNavigation.items,
            hamburgerNavigation: hamburgerNavigation.items
        };
    }

    return {};
};

const LOAD_DIRECTORIES_CONTENT_FAILED = (state, payload) => ({
    error: payload.response.error,
    content: null,
    comScoreSegmentIds: payload && payload.body ? payload.body.comScoreSegmentIds : initialState.comScoreSegmentIds
});

export const reducer = (state, payload, action) => {
    switch (action) {
        case 'LOAD_DIRECTORIES_CONTENT':
            return LOAD_DIRECTORIES_CONTENT(state, payload);
        case 'LOAD_DIRECTORIES_CONTENT_FAILED':
            return LOAD_DIRECTORIES_CONTENT_FAILED(state, payload);
        default:
            return initialState;
    }
};

const DirectoriesStore = createReducerStore({
    storeName: 'DirectoriesStore',
    initialState,
    reducers: {
        LOAD_DIRECTORIES_CONTENT,
        LOAD_DIRECTORIES_CONTENT_FAILED
    },
    getters: {
        getContent: state => state.content,
        getTopDirectories: state => state.topDirectories,
        getRemainingDirectories: state => state.remainingDirectories || [],
        getDirectoryFilters: state => state.directoryFilters,
        getTitle: state => state.title,
        getErrorStatus: state => state.error,
        getHeaderItems: state => state.headerNavigation,
        getHamburgerItems: state => state.hamburgerNavigation
    }
});

export default DirectoriesStore;

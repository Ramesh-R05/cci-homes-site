import { createReducerStore } from 'fluxible-reducer-store';

export const initialState = {
    nodeType: null,
    error: null,
    content: null,
    headerNavigation: {
        items: []
    },
    hamburgerNavigation: {
        items: []
    },
    listingCategories: {
        items: []
    }
};

const LOAD_DIRECTORY_CONTENT = (state, payload) => {
    const { entity, headerNavigation, hamburgerNavigation, listingCategories } = payload.body;

    if (entity) {
        return {
            content: entity,
            navigationTags: entity.navigationTags,
            headerNavigation: headerNavigation.items,
            hamburgerNavigation: hamburgerNavigation.items,
            listingCategories: listingCategories.items
        };
    }

    return {};
};

const LOAD_DIRECTORY_CONTENT_FAILED = (state, payload) => ({
    error: payload.response.error,
    content: null
});

export const reducer = (state = initialState, payload, action) => {
    switch (action) {
        case 'LOAD_DIRECTORY_CONTENT':
            return LOAD_DIRECTORY_CONTENT(state, payload);
        case 'LOAD_DIRECTORY_CONTENT_FAILED':
            return LOAD_DIRECTORY_CONTENT_FAILED(state, payload);
        default:
            return state;
    }
};

const DirectoryStore = createReducerStore({
    storeName: 'DirectoryStore',
    initialState,
    reducers: {
        LOAD_DIRECTORY_CONTENT,
        LOAD_DIRECTORY_CONTENT_FAILED
    },
    getters: {
        getContent: state => state.content,
        getErrorStatus: state => state.error,
        getHeaderItems: state => state.headerNavigation,
        getHamburgerItems: state => state.hamburgerNavigation,
        getCategoriesItems: state => state.listingCategories
    }
});

export default DirectoryStore;

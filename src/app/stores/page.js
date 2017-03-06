import {createReducerStore} from 'fluxible-reducer-store';

const PageStore = createReducerStore({
    storeName: 'PageStore',
    initialState: {
        error: null,
        content: null
    },
    reducers: {
        LOAD_CONTENT: (state, payload) => {
            let {
                entity,
                hero,
                items,
                headerNavigation,
                galleries,
                latestRealHomes,
                list = []
            } = payload.body;

            if (!entity) return;

            return {
                title: entity.title,
                content: entity,
                hero: hero,
                items,
                headerNavigation,
                navigationTags: entity.navigationTags,
                galleries,
                latestRealHomes,
                list
            };
        },
        LOAD_CONTENT_FAILED: (state, payload) => {
            return {
                error: payload.response.error,
                hero: {},
                items: [],
                galleries: [],
                latestRealHomes: [],
                list: [],
                content: null
            };
        },
        LOAD_LIST:  (state, payload) => {
            return {
                ...state,
                list: {
                    ...payload.body.list,
                    items: [
                        ...state.list.items,
                        ...payload.body.list.items
                    ]
                }
            };
        }
    },
    getters: {
        getContent: (state) => {
            return state.content;
        },

        getNodeType(state) {
            return state.content ? state.content.nodeType : '';
        },

        getHeroItem: (state) => {
            return state.hero;
        },

        getItems: (state) => {
            return state.items;
        },

        getNavigationTags: (state) => {
            return state.navigationTags;
        },

        getList: (state) => {
            return state.list;
        },

        getListNextParams: (state) => {
            return {
                ...state.list.params,
                pageNo: (state.list.params.pageNo + 1)
            };
        },

        getModuleItems: (state, module) => {
            if (!module) return [];
            return state[module] || [];
        },

        getLatestRealHomes(state) {
            return state.latestRealHomes || [];
        },

        getHeaderItems(state) {
            if (!state.headerNavigation) return [];
            return state.headerNavigation.items || [];
        },

        getErrorStatus(state) {
            return state.error;
        }
    }
});

export default PageStore;

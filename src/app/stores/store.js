import {createReducerStore} from 'fluxible-reducer-store';

const AppStore = createReducerStore({
    storeName: 'AppStore',
    initialState: {
        error: null,
        content: null
    },
    reducers: {
        LOAD_CONTENT: (state, payload) => {
            let {
                entity,
                items,
                headerNavigation,
                inFocusArticles,
                galleries,
                list = []
            } = payload.body;

            if (!entity) return;

            return {
                title: entity.title,
                content: entity,
                items,
                headerNavigation,
                navigationTags: entity.navigationTags,
                inFocusArticles,
                galleries,
                list
            };
        },
        LOAD_CONTENT_FAILED: (state, payload) => {
            return {
                error: payload.response.error,
                items: [],
                inFocusArticles: [],
                galleries: [],
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
                listName: state.list.listName,
                pageNo: (state.list.params.pageNo + 1)
            };
        },

        getModuleItems: (state, module) => {
            if (!module) return [];
            return state[module] || [];
        },

        getHeaderItems(state) {
            if (!state.headerNavigation) return [];
            return state.headerNavigation.items || [];
        }
    }
});

export default AppStore;

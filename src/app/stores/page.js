import { createReducerStore } from 'fluxible-reducer-store';

const PageStore = createReducerStore({
    storeName: 'PageStore',
    initialState: {
        error: null,
        content: null
    },
    reducers: {
        LOAD_CONTENT: (state, payload) => {
            const {
                entity,
                hero,
                items,
                headerNavigation,
                galleries,
                latestRealHomes,
                list = []
            } = payload.body;

            if (entity) {
                return {
                    title: entity.title,
                    content: entity,
                    hero,
                    items,
                    headerNavigation,
                    navigationTags: entity.navigationTags,
                    galleries,
                    latestRealHomes,
                    list,
                    query: payload.request.payload.query };
            } return {};
        },
        LOAD_CONTENT_FAILED: (state, payload) => ({

            error: payload.response.error,
            hero: {},
            items: [],
            galleries: [],
            latestRealHomes: [],
            list: [],
            content: null,
            query: {} }),

        LOAD_LIST: (state, payload) => ({

            ...state,
            list: {
                ...payload.body.list,
                items: [
                    ...state.list.items,
                    ...payload.body.list.items
                ]
            }
        })
    },
    getters: {
        getContent: state => state.content,

        getNodeType(state) {
            return state.content ? state.content.nodeType : '';
        },

        getHeroItem: state => state.hero,

        getItems: state => state.items,

        getNavigationTags: state => state.navigationTags,

        getList: state => state.list,

        getListNextParams: state => ({
            ...state.list.params,
            pageNo: (state.list.params.pageNo + 1)
        }),

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
        },

        getQuery(state) {
            return state.query;
        }
    }
});

export default PageStore;

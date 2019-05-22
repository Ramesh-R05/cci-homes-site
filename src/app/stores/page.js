import { createReducerStore } from 'fluxible-reducer-store';

const initialState = {
    error: null,
    content: null,
    comScoreSegmentIds: '',
    list: {
        params: {
            pageNo: 0
        }
    },
    emailLinkTrackingData: null
};
const PageStore = createReducerStore({
    storeName: 'PageStore',
    initialState,
    reducers: {
        LOAD_CONTENT: (state, payload) => {
            const {
                entity,
                hero,
                items,
                theme,
                galleries,
                latestVideos,
                latestBrandVideos,
                featuredBrand,
                latestBrandItems,
                list = [],
                comScoreSegmentIds = initialState.comScoreSegmentIds,
                emailLinkTrackingData
            } = payload.body;

            if (entity) {
                return {
                    title: entity.title,
                    content: entity,
                    hero,
                    items,
                    theme,
                    navigationTags: entity.navigationTags,
                    galleries,
                    featuredBrand,
                    latestVideos,
                    latestBrandVideos,
                    latestBrandItems,
                    list,
                    comScoreSegmentIds,
                    emailLinkTrackingData
                };
            }

            return {};
        },
        LOAD_CONTENT_FAILED: (state, payload) => ({
            error: payload.response.error,
            hero: {},
            items: [],
            galleries: [],
            latestBrandVideos: [],
            latestBrandItems: [],
            list: [],
            content: null,
            comScoreSegmentIds: payload && payload.body ? payload.body.comScoreSegmentIds : initialState.comScoreSegmentIds
        }),

        LOAD_LIST: (state, payload) => ({
            ...state,
            list: {
                ...payload.body.list,
                items: [...state.list.items, ...payload.body.list.items]
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
            pageNo: state && state.list && state.list.params && state.list.params.pageNo && state.list.params.pageNo + 1
        }),

        getModuleItems: (state, module) => {
            if (!module) {
                return [];
            }

            return state[module] || [];
        },

        getErrorStatus(state) {
            return state.error;
        },

        getComScoreSegmentIds(state) {
            return state.comScoreSegmentIds;
        },

        getTheme(state) {
            return state.theme || null;
        },

        getLatestVideos(state) {
            return state.latestVideos || [];
        },

        getEmailLinkTrackingData(state) {
            return state.emailLinkTrackingData;
        },

        getlatestBrandItems(state) {
            return state.latestBrandItems || [];
        },

        getLatestBrandVideos(state) {
            return state.latestBrandVideos || [];
        },

        getFeaturedBrands(state) {
            return state.featuredBrand || null;
        }
    }
});

export default PageStore;

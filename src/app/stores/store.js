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
                inFocusArticles
            } = payload.body;
            if (!entity) return;

            return {
                title: entity.title,
                content: entity,
                items,
                navigationTags: entity.navigationTags,
                inFocusArticles
            };
        },
        LOAD_CONTENT_FAILED: (state, payload) => {
            return {
                error: payload.response.error,
                content: null
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

        getModuleItems: (state, module) => {
            if (!module) return [];
            return state[module] || [];
        }
    }
});

export default AppStore;

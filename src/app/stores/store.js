import {createReducerStore} from 'fluxible-reducer-store';

const AppStore = createReducerStore({
    storeName: 'AppStore',
    initialState: {
        messages: {},
        sortedByDate: []
    },
    reducers: {
        LOAD_CONTENT: (state, payload) => {
            let {entity, items} = payload.body;
            if (!entity) return;

            return {
                error: null,
                title: entity.title,
                content: entity,
                items,
                navigationTags: entity.navigationTags
            };
        },
    },
    getters: {
        getContent: function get(state) {
            return state.content;
        },

        getItems: function get(state) {
            return state.items;
        }
    }
});

export default AppStore;

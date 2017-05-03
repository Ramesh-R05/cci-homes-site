import { BaseStore } from '@bxm/flux';
import uniq from 'lodash/array/uniq';
import has from 'lodash/object/has';

export default class BaseContentStore extends BaseStore {

    static storeName = 'BaseContentStore';

    static handlers = {
        LOAD_CONTENT: 'onLoadContent'
    };

    constructor(dispatcher, name) {
        if (!name) throw new Error('CMS store name must be provided by the implementor store');
        super(dispatcher);
        this.name = name;
        this.items = [];
    }

    onLoadContent(payload) {
        if (!has(payload.body.stores, this.name)) return;

        const store = payload.body.stores[this.name];

        if (!has(store, 'items')) return;

        store.items.forEach(item => this.items.push(item));
        this.items = uniq(this.items, 'id');

        this.emitChange();
    }

    getItems() {
        return this.items;
    }

    getState() {
        return {
            items: this.items,
            name: this.name
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.items = state.items;
        this.name = state.name;
    }

}

import {canUseDOM} from 'react/lib/ExecutionEnvironment.js';
import {BaseStore} from '@bxm/flux';
import uniq from 'lodash/array/uniq';


class ModuleConfiguration {
    constructor(lynxStoreName, entityId, modules) {
        this.lynxStoreName = lynxStoreName;
        this.entityId = entityId;
        this.modules = modules;
    }
}

export default class FacetedModuleStore extends BaseStore {

    static storeName = 'FacetedModuleStore';

    static handlers = {
        'LOAD_CONTENT': 'onLoadContent',
        'FACETED_MODULE:PAGE_RECEIVED': 'onPageReceived',
        'FACETED_MODULE:PAGE_RECEIVED:FAILURE': 'onPageReceivedFailure'
    };

    constructor(dispatcher, lynxStoreName) {
        if (!lynxStoreName) throw new Error('lynxStoreName must be provided by the implementor store');
        super(dispatcher);
        this.lynxStoreName = lynxStoreName;
        this.items = [];
        this.faceting = {};
        this.paging = {};
    }

    onLoadContent(payload) {
        this.config = this.readConfiguration(payload);
        this.emitChange();
    }

    onPageReceived(payload) {
        if (payload.lynxStoreName !== this.lynxStoreName) return;

        this.traceMethod('onPageReceived', payload);

        this.faceting = payload.content.faceting;
        this.paging = payload.content.paging;
        this.settings = payload.content.settings;

        // dang: hack to get page size into the paging object. we will do this via the backend one day.
        this.paging.pageSize = this.paging.pageSize || this.settings.pageSize;

        payload.content.items.forEach(item => this.items.push(item));

        this.items = uniq(this.items, 'id'); // remove duplicates

        this.emitChange();
    }

    onPageReceivedFailure(payload) {
        if (payload.lynxStoreName !== this.lynxStoreName) return;
        this.traceError('onPageReceivedFailure', payload.content);
    }

    getConfiguration() {
        return this.config;
    }

    getItems() {
        return this.items;
    }

    getFaceting() {
        return this.faceting;
    }

    getPaging() {
        return this.paging;
    }

    getSettings() {
        return this.settings;
    }

    dehydrate() {
        return {
            config: this.config,
            faceting: this.faceting,
            items: this.items,
            paging: this.paging
        };
    }

    rehydrate(state) {
        this.config = state.config;
        this.faceting = state.faceting;
        this.items = state.items;
        this.paging = state.paging;
    }

    traceMethod(method, data) {
        if (data && (canUseDOM || typeof data === typeof '')) {
            console.log(`[FacetedModuleStore#${this.lynxStoreName}][${method}]`, data);
        } else {
            console.log(`[FacetedModuleStore#${this.lynxStoreName}][${method}]`);
        }
    }

    traceError(method, data) {
        if (data && (canUseDOM || typeof data === typeof '')) {
            console.error(`[ERROR][FacetedModuleStore#${this.lynxStoreName}][${method}]`, data);
        } else {
            console.error(`[ERROR][FacetedModuleStore#${this.lynxStoreName}][${method}]`);
        }
    }

    readConfiguration(payload) {
        let modules = {};
        Object.keys(payload.body.stores).forEach(key => {
            modules[payload.body.stores[key].module.storeName] = payload.body.stores[key].module.id;
        });
        return new ModuleConfiguration(this.lynxStoreName, payload.body.entity.id, modules);
    }
}

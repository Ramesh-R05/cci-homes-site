import {canUseDOM} from 'react/lib/ExecutionEnvironment.js';
import {BaseStore} from '@bxm/flux';
import extend from 'lodash/object/extend';
import toArray from 'lodash/lang/toArray';

class ModuleConfiguration {
    constructor(lynxStoreName, entityId, modules) {
        this.lynxStoreName = lynxStoreName;
        this.entityId = entityId;
        this.modules = modules;
    }
}

class FacetedModuleStore extends BaseStore {

    constructor(dispatcher, lynxStoreName) {
        if (!lynxStoreName) throw new Error('lynxStoreName must be provided by the implementor store');
        super(dispatcher);

        this.lynxStoreName = lynxStoreName;
        this.items = {};
        this.faceting = {};
        this.paging = {};
    }

    onLoadContent(payload) {
        this.traceMethod('onLoadContent');
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

        payload.content.items.forEach(item => this.items[item.id] = item);

        this.emitChange();
    }

    onPageReceivedFailure(payload) {
        if (payload.lynxStoreName !== this.lynxStoreName) return;
        this.traceError('onPageReceivedFailure', payload.content);
    }

    getConfiguration() {
        this.traceMethod('getConfiguration', this.config);
        return this.config;
    }

    getItems() {
        const items = toArray(this.items);
        this.traceMethod('getItems', items);
        return items;
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
        this.traceMethod('dehydrate');
        return {
            config: this.config
        };
    }

    rehydrate(state) {
        this.traceMethod('rehydrate', state);
        extend(this, state);
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

FacetedModuleStore.storeName = 'FacetedModuleStore';

FacetedModuleStore.handlers = {
    'LOAD_CONTENT': 'onLoadContent',
    'FACETED_MODULE:PAGE_RECEIVED': 'onPageReceived',
    'FACETED_MODULE:PAGE_RECEIVED:FAILURE': 'onPageReceivedFailure'
};

export default FacetedModuleStore;

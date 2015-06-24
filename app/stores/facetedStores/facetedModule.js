import {canUseDOM} from 'react/lib/ExecutionEnvironment.js';
import {BaseStore} from '@bxm/flux';
import extend from 'lodash/object/extend';

class FacetedModuleStore extends BaseStore {

    constructor(dispatcher, lynxStoreName) {
        if (!lynxStoreName) throw 'lynxStoreName must be provided by the implementor store';
        super(dispatcher);

        this.lynxStoreName = lynxStoreName;
        this.items = {};
        this.faceting = {};
        this.paging = {};
    }

    lynxStoreName:String;
    config:ModuleConfiguration;
    items:Object;
    faceting:Object;
    paging:Object;

    onLoadContent(payload:LynxResponse) {
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
        if (payload.lynxStoreName != this.lynxStoreName) return;
        this.traceError('onPageReceivedFailure', payload.content);
    }

    getConfiguration():ModuleConfiguration {
        this.traceMethod('getConfiguration', this.config);
        return this.config;
    }

    getItems() {
        // consumers expect the store to be an array, so we will convert it back to keep them happy
        const items = Object.keys(this.items).map(key => this.items[key]);

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
        if (data && (canUseDOM || typeof data == typeof '')) {
            console.log(`[FacetedModuleStore#${this.lynxStoreName}][${method}]`, data);
        }
        else {
            console.log(`[FacetedModuleStore#'${this.lynxStoreName}][${method} ]`);
        }
    }

    traceError(method, data) {
        if (data && (canUseDOM || typeof data == typeof '')) {
            console.error(`[ERROR][FacetedModuleStore#${this.lynxStoreName}][${method}']`, data);
        }
        else {
            console.error(`[ERROR][FacetedModuleStore#'${this.lynxStoreName}][${method}]`);
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

class ModuleConfiguration {
    constructor(lynxStoreName:String, entityId:String, modules:Object) {
        this.lynxStoreName = lynxStoreName;
        this.entityId = entityId;
        this.modules = modules;
    }

    lynxStoreName:String;
    entityId:String;
    modules:Object;
}

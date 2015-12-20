import {canUseDOM} from 'exenv';
import {BaseStore} from '@bxm/flux';
import uniq from 'lodash/array/uniq';
import merge from 'lodash/object/merge';


class ModuleConfiguration {
    constructor(lynxStoreName, entityId, modules) {
        this.lynxStoreName = lynxStoreName;
        this.entityId = entityId;
        this.modules = modules;
    }
}

export const handlers = {
    'LOAD_CONTENT': 'onLoadContent',
    'FACETED_MODULE:PAGE_RECEIVED': 'onPageReceived',
    'FACETED_MODULE:PAGE_RECEIVED:FAILURE': 'onPageReceivedFailure',
    'NAVIGATE_SUCCESS': 'onNavigateSuccess',
    'NAVIGATE_START': 'onNavigateStart'
};

export default class FacetedModuleStore extends BaseStore {

    static storeName = 'FacetedModuleStore';

    static handlers = handlers;

    constructor(dispatcher, lynxStoreName) {
        if (!lynxStoreName) throw new Error('lynxStoreName must be provided by the implementor store');
        super(dispatcher);
        this.lynxStoreName = lynxStoreName;
        this.items = [];
        this.faceting = {};
        this.paging = {
            currentPage: 0,
            pages: 0,
            isLoading: false
        };
    }

    onLoadContent(payload) {
        this.config = this.readConfiguration(payload);
        this.emitChange();
    }

    onNavigateStart() {
        this.paging.isLoading = true;
        this.emitChange();
    }

    onNavigateSuccess(payload) {
        const page = parseInt(payload.get('query').get('page') || 0, 10);
        if (page !== this.paging.currentPage) {
            this.paging.currentPage = page;
            this.emitChange();
        }
    }

    onPageReceived(payload) {
        if (payload.lynxStoreName !== this.lynxStoreName) return;
        this.faceting = payload.content.faceting;
        this.settings = payload.content.settings;
        this.paging = merge(this.paging, payload.content.paging);
        payload.content.items.forEach(item => this.items.push(item));
        this.items = uniq(this.items, 'id');
        this.paging.isLoading = false;
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

    getCurrentPage() {
        return this.paging.currentPage;
    }

    getIsLoading() {
        return this.paging.isLoading;
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

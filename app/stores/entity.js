import {BaseStore} from '@bxm/flux';


class EntityStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.title = '';
        this.content = {};
        this.navigationTags = [];
    }

    onLoadContent(payload) {
        let entity = payload.body.entity;
        if (!entity) return;

        this.title = entity.title;
        this.content = entity;
        this.navigationTags = entity.navigationTags;

        this.emitChange();
    }

    getTitle() {
        return this.title;
    }

    getContent() {
        return this.content;
    }

    getNavigationTags() {
        return this.navigationTags;
    }

    getState() {
        return {
            title: this.title,
            content: this.content,
            navigationTags: this.navigationTags
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.title = state.title;
        this.content = state.content;
        this.navigationTags = state.navigationTags;
    }

}

EntityStore.storeName = 'EntityStore';

EntityStore.handlers = {
    'LOAD_CONTENT': 'onLoadContent'
};

export default EntityStore;

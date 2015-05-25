import {BaseStore} from '@bxm/flux';

class EntityStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.nodeType = '';
        this.title = '';
        this.content = {};
    }

    onLoadContent(payload) {
        let entity = payload.body.entity;
        if (!entity) return;

        this.title = entity.title;
        this.nodeType = entity.nodeType;
        this.content = entity;

        this.emitChange();
    }

    getTitle() {
        return this.title;
    }

    getNodeType() {
        return this.nodeType;
    }

    getContent() {
        return this.content;
    }

    getState() {
        return {
            title: this.title,
            nodeType: this.nodeType,
            content: this.content
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.title = state.title;
        this.nodeType = state.nodeType;
        this.content = state.content;
    }

}

EntityStore.storeName = 'EntityStore';

EntityStore.handlers = {
    'LOAD_CONTENT': 'onLoadContent'
};

export default EntityStore;

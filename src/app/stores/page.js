import {BaseStore} from '@bxm/flux';


export default class PageStore extends BaseStore {

    static storeName = 'PageStore';

    static handlers = {
        LOAD_CONTENT: 'onLoadContent',
        LOAD_CONTENT_FAILED: 'onLoadContentFailed'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.state = {};
        this.state.title = '';
        this.state.content = {};
        this.state.navigationTags = [];
    }

    onLoadContent(payload) {
        let entity = payload.body.entity;
        if (!entity) return;

        this.state.error = null;
        this.state.title = entity.title;
        this.state.content = entity;
        this.state.navigationTags = entity.navigationTags;

        this.emitChange();
    }

    onLoadContentFailed(payload) {
        this.state.error = payload.response.error;
        this.state.content = null;

        this.emitChange();
    }

    getTitle() {
        return this.state.title;
    }

    getContent() {
        return this.state.content;
    }

    getErrorStatus() {
        return this.state.error;
    }

    getNodeType() {
        return this.state.content ? this.state.content.nodeType : '';
    }

    getNavigationTags() {
        return this.state.navigationTags;
    }

    dehydrate() {
        return this.state;
    }

    rehydrate(state) {
        this.state = state;
    }

}

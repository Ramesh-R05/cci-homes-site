import {BaseStore} from '@bxm/flux';
import get from 'lodash/object/get';

export default class RequestStore extends BaseStore {

    static storeName = 'RequestStore';

    static handlers = {
        LOAD_CONTENT: 'onLoadContent'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.request = {};
        this.tagLeaf = '';
    }

    onLoadContent(payload) {
        const request = payload.body.request;

        if (!request) return;

        this.request = request;
        this.tagLeaf = get(request, 'queryString.leaf', '');

        this.emitChange();
    }

    getRequest() {
        return this.request;
    }

    getTagLeaf() {
        return get(this.request, 'queryString.leaf', '');
    }

    getState() {
        return {
            request: this.request
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.request = state.request;
    }

}

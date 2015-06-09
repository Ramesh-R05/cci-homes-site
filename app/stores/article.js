import {BaseStore} from '@bxm/flux';

import mockFeedItems from '../../tests/mock/feed.json';

class ArticleStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.items = [];
    }

    onLoadContent(payload) {
        // TODO (cjenkins 04/06/2015): Write the logic to process the payload
        // after the CMS has been configured to store feed data
        payload.toString();
        this.items = mockFeedItems;
        this.emitChange();
    }

    getItems() {
        return this.items;
    }

    getState() {
        return {
            items: this.items
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.items = state.items;
    }

}

ArticleStore.storeName = 'ArticleStore';

ArticleStore.handlers = {
    'LOAD_CONTENT': 'onLoadContent'
};

export default ArticleStore;

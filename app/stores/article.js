import {BaseStore} from '@bxm/flux';

import mockFeedItems from '../../tests/mock/feed.json';

class ArticleStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.items = [];
    }

    // NOTE: had to remove the "payload" parameter from this function to keep
    // eslint from complaining. Should be onLoadContent(payload)
    onLoadContent() {
        // TODO (cjenkins 04/06/2015): Write the logic to process the payload
        // after the CMS has been configured to store feed data
        this.items = mockFeedItems;
        // Until DHO-181 is complete, duplicate the mock items so we can see
        // multiple ads in the LHR
        Array.prototype.push.apply(this.items, mockFeedItems);
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

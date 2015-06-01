import {BaseStore} from '@bxm/flux';
import mockFeedItems from '../../tests/mock/feed.json';
import {articles as articlesMock} from '../../tests/mock/articles';

class ArticleStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.items = [];
        this.articles = [];
    }

    // NOTE: had to remove the "payload" parameter from this function to keep
    // eslint from complaining. Should be onLoadContent(payload)
    onLoadContent() {
        // TODO (cjenkins 04/06/2015): Write the logic to process the payload
        // after the CMS has been configured to store feed data
        this.items = mockFeedItems;
        this.articles = articlesMock;
        this.emitChange();
    }

    getItems() {
        return this.items;
    }

    getState() {
        return {
            articles: this.articles,
            items: this.items
        };
    }

    getArticles() {
        return this.articles;
    }

    getFeaturedArticles() {
        return this.articles.slice(1, 4);
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.articles = state.articles;
        this.items = state.items;
    }

}

ArticleStore.storeName = 'ArticleStore';

ArticleStore.handlers = {
    'LOAD_CONTENT': 'onLoadContent'
};

export default ArticleStore;

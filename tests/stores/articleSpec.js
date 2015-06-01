import {articles as articlesMock} from '../mock/articles';
import ArticleStore from '../../app/stores/article';

describe('mockRawArticleStoreData store', () => {
    let store;

    describe('after initialising', () => {
        before(() => {
            store = new ArticleStore();
        });

        it('should initialize with empty articles', () => {
            expect(store.articles).to.deep.equal([]);
        });
    });

    describe('after receiving articles', () => {
        before(() => {
            store = new ArticleStore();
            store.onLoadContent();
        });

        it('getArticles() should return all the articles', () => {
            expect(store.getArticles()).to.deep.equal(articlesMock);
        });

        it('getFeaturedArticles() should return items from index 1 to 4', () => {
            expect(store.getFeaturedArticles()).to.deep.equal(articlesMock.slice(1, 4));
        });
    });

});

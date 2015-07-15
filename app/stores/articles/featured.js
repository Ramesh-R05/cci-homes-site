import BaseContentStore from '../baseContentStore';

export default class FeaturedArticles extends BaseContentStore {

    static storeName = 'FeaturedArticles';

    constructor(dispatcher) {
        super(dispatcher, 'featuredArticles');
    }

}

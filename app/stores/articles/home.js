import BaseContentStore from '../baseContentStore';

export default class HomeArticles extends BaseContentStore {

    static storeName = 'HomeArticles';

    constructor(dispatcher) {
        super(dispatcher, 'featuredArticles');
    }

}

import BaseContentStore from '../baseContentStore';

export default class InFocusArticles extends BaseContentStore {

    static storeName = 'InFocusArticles';

    constructor(dispatcher) {
        super(dispatcher, 'inFocusArticles');
    }

}

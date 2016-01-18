import BaseContentStore from './baseContentStore';

export default class SponsorArticles extends BaseContentStore {
    static storeName = 'SponsorsArticles';

    constructor(dispatcher) {
        super(dispatcher, 'sponsors');
    }
}

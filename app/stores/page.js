import {BaseStore} from '@bxm/flux';

class PageStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.pageTitle = '';
    }

    updatePageTitle(payload) {
        this.pageTitle = payload.pageTitle;
        this.emitChange();
    }

    getPageTitle() {
        return this.pageTitle;
    }

    getState() {
        return {
            pageTitle: this.pageTitle
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.pageTitle = state.pageTitle;
    }
}

PageStore.storeName = 'PageStore';

PageStore.handlers = {
    'UPDATE_PAGE_TITLE': 'updatePageTitle'
};

export default PageStore;

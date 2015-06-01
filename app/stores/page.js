import {BaseStore} from '@bxm/flux';
import platform from '@bxm/ui/lib/common/platform';

class PageStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.pageTitle = '';
    }

    onNavigateStart(payload) {
        if (payload.userAgent) platform.set(payload.userAgent);
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
    'UPDATE_PAGE_TITLE': 'updatePageTitle',
    'NAVIGATE_START': 'onNavigateStart'
};

export default PageStore;

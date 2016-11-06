import {BaseStore} from '@bxm/flux';

export default class MenuStore extends BaseStore {
    static storeName = 'MenuStore';

    static handlers = {
        'MENU:SIDE_MENU_ACTIVATE': 'onSideMenuActivate'
    };

    constructor(...args) {
        super(...args);
        this.sideMenuOpen = false;
    }

    onSideMenuActivate() {
        this.sideMenuOpen = !this.sideMenuOpen;
        this.emitChange();
    }

    isSideMenuOpen() {
        return this.sideMenuOpen;
    }

    getState() {
        return {
            isSideMenuOpen: this.sideMenuOpen
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.sideMenuOpen = state.isSideMenuOpen;
    }
}

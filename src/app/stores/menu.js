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

    getNavItems() {
        return [
            { name: 'Home tours', url: '/home-tours' },
            { name: 'Interiors', url: '/interiors' },
            { name: 'Outdoor', url: '/outdoor' },
            { name: 'Renovate', url: '/renovate' },
            { name: 'My Ideal House', url: '/my-ideal-house' }
        ];
    }

    getState() {
        return {
            isSideMenuOpen: this.sideMenuOpen,
            navItems: this.getNavItems()
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.sideMenuOpen = state.isSideMenuOpen;
    }
}

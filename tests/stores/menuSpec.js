import cloneDeep from 'lodash/lang/cloneDeep';
import extend from 'lodash/object/extend';
import MenuStore from '../../app/stores/menu';

const sandbox = sinon.sandbox.create();

describe('Menu store', () => {
    let store;

    after(() => sandbox.restore());

    describe('after initialising', () => {
        before(() => {
            store = new MenuStore();
        });

        it('should initialize with isSideMenuOpen set to false', () => {
            expect(store.isSideMenuOpen()).to.be.false;
        });

        it('should initialize with isSideMenuOpen set to false', () => {
            expect(store.getNavItems()).to.eql([
                { name: 'Home tours', url: '/home-tours' },
                { name: 'Interiors', url: '/interiors' },
                { name: 'Outdoor', url: '/outdoor' },
                { name: 'Renovate', url: '/renovate' },
                { name: 'My Ideal House', url: '/my-ideal-house' }
            ]);
        });
    });

    describe('receive a menu activation event when closed', () => {
        let emitChangeStub;

        before(() => {
            store = new MenuStore();
            emitChangeStub = sinon.stub(store, 'emitChange');
            store.onSideMenuActivate();
        });

        it('should toggle isSideMenuOpen to true', () => {
            expect(store.isSideMenuOpen()).to.be.true;
        });

        it('should emit a change', () => {
            expect(emitChangeStub.calledOnce).to.be.true;
        });
    });

    describe('receive a menu activation event when open', () => {
        let emitChangeStub;

        before(() => {
            store = new MenuStore();
            store.rehydrate(extend({}, store.dehydrate(), { isSideMenuOpen: true }));
            emitChangeStub = sinon.stub(store, 'emitChange');
            store.onSideMenuActivate();
        });

        it('should toggle isSideMenuOpen to true', () => {
            expect(store.isSideMenuOpen()).to.be.false;
        });

        it('should emit a change', () => {
            expect(emitChangeStub.calledOnce).to.be.true;
        });
    });
});

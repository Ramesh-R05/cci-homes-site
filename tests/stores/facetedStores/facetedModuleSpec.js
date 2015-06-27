import extend from 'lodash/object/extend';
import {betterMockActionContext} from '@bxm/flux';
import {contentPayload, pageReceivedPayload} from '../../mock/facetedModule';
const safada = require('../../utils/safada/safada')(Context);
const proxyquire = require('proxyquire').noCallThru();

const storeNameUnderTest = 'storeName';
let Context;
let store;
let anotherStore;

const createContext = () => {
    Context = betterMockActionContext();
    store = Context.registerStore(require('./facetedModuleImpl'));
    sinon.spy(store, 'emitChange');
};

describe('Stores', () => {

    describe('Faceted Module', () => {
        describe('Action -> LOAD_CONTENT', () => {
            before(() => {
                createContext();
                Context.dispatch('LOAD_CONTENT', contentPayload);
            });

            it('calls emitChange()', () => {
                expect(store.emitChange.called).to.be.true;
            });

            it('reads the lynx module names and ids from the payload', () => {
                expect(store.config.modules).to.have.property('module1', "MDOULE-1");
                expect(store.config.modules).to.have.property('module2', "MDOULE-2");
            });

            it('reads the entity id from the payload', () => {
                expect(store.config.entityId).to.equal(contentPayload.body.entity.id);
            });

        });

        describe('Action -> FACETED_MODULE:PAGE_RECEIVED', () => {
            before(() => {
                store.emitChange.reset();
                createContext();
                Context.dispatch('FACETED_MODULE:PAGE_RECEIVED', pageReceivedPayload);
            });

            it('calls emitChange()', () => {
                expect(store.emitChange.called).to.be.true;
            });

            it('#getPaging returns the correct value', () => {
                expect(store.getPaging()).to.deep.equal(pageReceivedPayload.content.paging);
            });

            it('#getPaging returns pageSize', () => {
                expect(store.getPaging()).to.have.property('pageSize', pageReceivedPayload.content.settings.pageSize);
            });

            it('#getFaceting returns the correct value', () => {
                expect(store.getFaceting()).to.deep.equal(pageReceivedPayload.content.faceting);
            });

            it('#getSettings returns the correct value', () => {
                expect(store.getSettings()).to.deep.equal(pageReceivedPayload.content.settings);
            });
        });

        describe('Action -> FACETED_MODULE:PAGE_RECEIVED:FAILURE', () => {
            before(() => {
                store.emitChange.reset();
                createContext();
                sinon.spy(console, 'error');
                Context.dispatch('FACETED_MODULE:PAGE_RECEIVED:FAILURE', {lynxStoreName: storeNameUnderTest, content: 'error'});
            });

            after(() => {
               console.error.restore();
            });

            it('should trace error', () => {
                expect(console.error.called).to.be.true;
            });
        });

        describe('Events targeted at a different facetedModule store', () => {
            before(() => {
                store.emitChange.reset();
                createContext();
                anotherStore = Context.registerStore(require('./anotherFacetedModuleImpl'));
                Object.freeze(anotherStore.items);
            });

            it('does not call emitChange()', () => {
                expect(store.emitChange.called).to.be.false;
            });

            it('will throw if the store tries to use the payload', () => {
                expect(() => Context.dispatch('FACETED_MODULE:PAGE_RECEIVED', extend(pageReceivedPayload, {lynxStoreName: storeNameUnderTest})).to.throw());
            });

            it('FACETED_MODULE:PAGE_RECEIVED ignores payloads meant for another faceted module store', () => {
                expect(() => Context.dispatch('FACETED_MODULE:PAGE_RECEIVED', pageReceivedPayload)).to.not.throw();
            });
        });
    });
});

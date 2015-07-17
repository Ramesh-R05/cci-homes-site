import extend from 'lodash/object/extend';
import {betterMockActionContext} from '@bxm/flux';
import {contentPayload, pageReceivedPayload} from '../../mock/facetedModule';
import FacetedModuleStore from '../../../app/stores/facetedStores/facetedModule';
import {articles as itemsMock, articlesPage2 as itemsPage2Mock} from '../../mock/articles';
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

            const storePaging = {
                currentPage: 0,
                pages: 4,
                totalResults: 31,
                isLoading: false
            };

            before(() => {
                store.emitChange.reset();
                createContext();
                Context.dispatch('FACETED_MODULE:PAGE_RECEIVED', pageReceivedPayload);
            });

            it('calls emitChange()', () => {
                expect(store.emitChange.called).to.be.true;
            });

            it('#getPaging returns the correct value', () => {
                expect(store.getPaging()).to.deep.equal(storePaging);
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

        describe('when paginating', () => {
            let numItems;
            let store;
            const facetedStoreName = 'Test';
            const firstPayload = {
                lynxStoreName: facetedStoreName,
                content: {
                    items: itemsMock,
                    faceting: {},
                    paging: {
                        pageSize: 10
                    }
                }
            };
            const secondPayload = firstPayload;
            const thirdPayload = {
                lynxStoreName: facetedStoreName,
                content: {
                    items: itemsPage2Mock,
                    faceting: {},
                    paging: {
                        pageSize: 10
                    }
                }
            };

            before(() => {
                store = new FacetedModuleStore(null, facetedStoreName);
                store.onPageReceived(firstPayload);
                numItems = store.getItems().length;
            });

            const expectedNumItems = 20;
            it(`should have ${expectedNumItems} items in the first page`, () => {
               expect(numItems).to.equal(expectedNumItems);
            });

            it(`should have ${expectedNumItems} after receiving items that already are in the store`, () => {
                store.onPageReceived(secondPayload);
                numItems = store.getItems().length;
                expect(numItems).to.equal(expectedNumItems);
            });

            const numNewItems = thirdPayload.content.items.length;
            const expectedPage2NumItems = expectedNumItems + numNewItems;
            it(`should have ${expectedPage2NumItems} after receiving ${numNewItems} unique new items`, () => {
                store.onPageReceived(thirdPayload);
                numItems = store.getItems().length;
                expect(numItems).to.equal(expectedPage2NumItems);
            });

        });
    });
});

import BaseContentStore from '../../app/stores/baseContentStore';
import { articles as articlesMock, articlesPage2 as articlesMock2 } from '../mock/articles';

describe('BaseContentStore', () => {
    let store;
    let storeName = 'test';
    let missingStoreName = 'missing';
    const payload1 = {
        body: {
            stores: {
                test: {
                    items: articlesMock
                }
            }
        }
    };
    const payload2 = {
        body: {
            stores: {
                test: {
                    items: articlesMock2
                }
            }
        }
    };

    describe('after initialising', () => {
        before(() => {
            store = new BaseContentStore(null, storeName);
        });

        it('should initialize with empty items', () => {
            expect(store.getItems()).to.deep.equal([]);
        });
    });

    describe(`after receiving content with the ${missingStoreName} store missing from the payload`, () => {
        before(() => {
            store = new BaseContentStore(null, missingStoreName);
            store.onLoadContent(payload1);
        });

        it('should have empty items', () => {
            expect(store.getItems()).to.deep.equal([]);
        });
    });

    describe(`after receiving content with the 'items' key missing in the store`, () => {
        const payload = {
            body: {
                stores: {
                    test: {}
                }
            }
        };
        before(() => {
            store = new BaseContentStore(null, storeName);
            store.onLoadContent(payload);
        });

        it('should have empty items', () => {
            expect(store.getItems()).to.deep.equal([]);
        });
    });

    describe('after creating a store without a name', () => {
        it('should throw an error', () => {
            const fn = () => (store = new BaseContentStore());
            expect(fn).to.throw(Error);
        });
    });

    describe('after receiving content', () => {
        let emitChangeStub;

        before(() => {
            store = new BaseContentStore(null, 'test');
            emitChangeStub = sinon.stub(store, 'emitChange');
        });

        describe('after the initial load', () => {
            before(() => {
                store.onLoadContent(payload1);
            });

            it(`should have all the received items`, () => {
                expect(store.getItems()).to.deep.equal(payload1.body.stores.test.items);
            });

            it('should have called the store emitChange method', () => {
                expect(emitChangeStub.calledOnce).to.be.true;
            });
        });

        describe('after the second load', () => {
            before(() => {
                store.onLoadContent(payload2);
            });

            const expectedNumItems = 29;
            it(`should have the existing items plus the new ones received`, () => {
                expect(store.getItems().length).to.equal(expectedNumItems);
            });
        });

        describe('after receiving the same items again', () => {
            before(() => {
                store.onLoadContent(payload2);
            });

            const expectedNumItems = 29;
            it(`should have ${expectedNumItems} items`, () => {
                expect(store.getItems().length).to.equal(expectedNumItems);
            });
        });
    });
});

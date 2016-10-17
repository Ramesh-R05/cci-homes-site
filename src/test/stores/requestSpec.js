import cloneDeep from 'lodash/lang/cloneDeep';
import RequestStore from '../../app/stores/request';
import {tagPage, homePage} from '../mock/request';

describe('Request store', () => {
    let store;
    let emitChangeStub;

    describe('after initialising', () => {
        before(() => {
            store = new RequestStore();
        });

        it('should initialize with empty request', () => {
            expect(store.getRequest()).to.deep.equal({});
        });
    });

    describe('after receiving request for a tag page', () => {
        let emitChangeStub;

        before(() => {
            store = new RequestStore();
            emitChangeStub = sinon.stub(store, 'emitChange');
            store.onLoadContent(tagPage);
        });

        const expectedTagLeaf = tagPage.body.request.queryString.leaf;
        it(`should have the tagLeaf equal to ${expectedTagLeaf}`, () => {
            expect(store.getTagLeaf()).to.equal(expectedTagLeaf);
        });

        it(`should have the request`, () => {
            expect(store.getRequest()).to.deep.equal(tagPage.body.request);
        });

        it('should have called the store emitChange method', () => {
            expect(emitChangeStub.calledOnce).to.be.true;
        });
    });

   describe('after receiving request for the homepage page', () => {
       let emitChangeStub;

       before(() => {
           store = new RequestStore();
           store.onLoadContent(homePage);
       });

       it(`should have the tagLeaf to be an empty string`, () => {
           expect(store.getTagLeaf()).to.equal('');
       });
   });

});

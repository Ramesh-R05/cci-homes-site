import {betterMockActionContext} from '@bxm/flux';
import Q from 'q';
const proxyquire = require('proxyquire').noCallThru();

const FacetedModuleServiceMock = {
    init: function(){},
    read: function(){}
};

const ContextMock = {
    dispatch: function(){
    },
    getService: function() {
        return FacetedModuleServiceMock;
    }
};

const FacetedModuleActions = proxyquire('../../app/actions/facetedModule', {
    '../services/facetedModule': FacetedModuleServiceMock
});

describe('FacetedModuleActions', () => {

    describe('#getPage', () => {
        let defer;
        let serviceReadStub;
        let dispatchStub;

        beforeEach(function(){
            defer = Q.defer();
            serviceReadStub = sinon.stub(FacetedModuleServiceMock, 'read')
                .returns(defer.promise);
            dispatchStub = sinon.stub(ContextMock, 'dispatch');
        });

        afterEach(function(){
            FacetedModuleServiceMock.read.restore();
            ContextMock.dispatch.restore();
        });

        it('should dispatch the "FACETED_MODULE:PAGE_RECEIVED" after successful request', (done) => {
            FacetedModuleActions.getPage(ContextMock, {
                page: 0,
                params: {tags: ['Tag']},
                moduleConfig: {}
            });

            defer.promise.then(function(){
                expect(serviceReadStub.calledOnce).to.be.true;
                expect(dispatchStub.withArgs('FACETED_MODULE:PAGE_RECEIVED', sinon.match.object).calledOnce).to.be.true;
                done();
            });

            defer.resolve({});
        });

        it('should dispatch the "FACETED_MODULE:PAGE_RECEIVED:FAILURE" after failed request', (done) => {
            FacetedModuleActions.getPage(ContextMock, {
                page: 0,
                params: {tags: ['Tag']},
                moduleConfig: {}
            });

            defer.promise.fail(function(){
                expect(serviceReadStub.calledOnce).to.be.true;
                expect(dispatchStub.withArgs('FACETED_MODULE:PAGE_RECEIVED:FAILURE', sinon.match.object).calledOnce).to.be.true;
                done();
            });

            defer.reject(new Error('Error'));
        });

    });

});

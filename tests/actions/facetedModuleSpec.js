var _ = require('lodash');
import {betterMockActionContext} from '@bxm/flux';
var Context = betterMockActionContext();
var safada = require('../utils/safada/safada')(Context);
var proxyquire = require('proxyquire').noCallThru();

var actions;

describe('Actions', () => {
    describe('Faceted Module', () => {
        describe('#getPage', () => {
            before(() => {
                actions = proxyquire('../../app/actions/facetedModule', {});
            });

            afterEach(()=> {
               safada.reset();
            });

            it('should dispatch the "FACETED_MODULE:PAGE_RECEIVED" after successful request', () => {
                actions.getPageSuccess(Context, actionPayload, serviceResponseSuccess);

                expect(safada.wasDispatched('FACETED_MODULE:PAGE_RECEIVED')).to.be.true;
                var payload = safada.getLastDispatchedPayload('FACETED_MODULE:PAGE_RECEIVED');
                expect(payload).to.have.property('lynxStoreName', actionPayload.moduleConfig.lynxStoreName);
                expect(payload).to.have.property('content', serviceResponseSuccess.body);
            });

            it('should dispatch the "FACETED_MODULE:PAGE_RECEIVED:FAILURE" after failed request', () => {
                actions.getPageFailure(Context, actionPayload, serviceResponseFailure);

                expect(safada.wasDispatched('FACETED_MODULE:PAGE_RECEIVED:FAILURE')).to.be.true;
                var payload = safada.getLastDispatchedPayload('FACETED_MODULE:PAGE_RECEIVED:FAILURE');
                expect(payload).to.have.property('lynxStoreName', actionPayload.moduleConfig.lynxStoreName);
                expect(payload).to.have.property('content', serviceResponseFailure);
            });
        });
    });
});

var serviceResponseSuccess = {body: "success"};
var serviceResponseFailure = "error";

var actionPayload = {
    page: 0,
    moduleConfig: {
        lynxStoreName: 'testStoreName'
    }
};

var serviceConfig = {
    server: {
        port: 80
    },
    service: {
        facetedModule: {
            local: 'http://localhost',
            path: '/api/facetedModule'
        }
    }
};

var moduleConfig = {
    moduleConfig: {
        lynxStoreName: 'testModuleName',
        entityId: 'ENTITY-ID',
        modules: {
            testModuleName: 'MODULE-ID'
        }
    }
};
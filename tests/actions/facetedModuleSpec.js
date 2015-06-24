import {betterMockActionContext} from '@bxm/flux';
const Context = betterMockActionContext();
const safada = require('../utils/safada/safada')(Context);
const proxyquire = require('proxyquire').noCallThru();


describe('Actions', () => {
    describe('Faceted Module', () => {
        describe('#getPage', () => {

            let actions;
            const serviceResponseSuccess = {body: "success"};
            const serviceResponseFailure = "error";
            const actionPayload = {
                page: 0,
                moduleConfig: {
                    lynxStoreName: 'testStoreName'
                }
            };

            before(() => {
                actions = proxyquire('../../app/actions/facetedModule', {});
            });

            afterEach(()=> {
               safada.reset();
            });

            it('should dispatch the "FACETED_MODULE:PAGE_RECEIVED" after successful request', () => {
                actions.getPageSuccess(Context, actionPayload, serviceResponseSuccess);

                expect(safada.wasDispatched('FACETED_MODULE:PAGE_RECEIVED')).to.be.true;
                const payload = safada.getLastDispatchedPayload('FACETED_MODULE:PAGE_RECEIVED');
                expect(payload).to.have.property('lynxStoreName', actionPayload.moduleConfig.lynxStoreName);
                expect(payload).to.have.property('content', serviceResponseSuccess.body);
            });

            it('should dispatch the "FACETED_MODULE:PAGE_RECEIVED:FAILURE" after failed request', () => {
                actions.getPageFailure(Context, actionPayload, serviceResponseFailure);

                expect(safada.wasDispatched('FACETED_MODULE:PAGE_RECEIVED:FAILURE')).to.be.true;
                const payload = safada.getLastDispatchedPayload('FACETED_MODULE:PAGE_RECEIVED:FAILURE');
                expect(payload).to.have.property('lynxStoreName', actionPayload.moduleConfig.lynxStoreName);
                expect(payload).to.have.property('content', serviceResponseFailure);
            });
        });
    });
});

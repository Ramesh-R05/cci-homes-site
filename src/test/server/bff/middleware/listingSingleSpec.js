import proxyquire, { noCallThru } from 'proxyquire';
import mockData from '../../../mock/listing';
import MiddlewareTestFactory from '../../../utils/middlewareTestFactory';
noCallThru();

// stubs
const makeRequestStub = sinon.stub();
const transformListingGalleriesStub = sinon.stub();
const parseEntityStub = sinon.stub();
const filterEmptyItemsStub = sinon.stub();

const entityServiceMockUrl = 'http://entitiesUrl.com';

const getMockEntity = () => ({
    ...mockData
});

function resetStubsAndSpies() {
    makeRequestStub.reset();
    transformListingGalleriesStub.reset();
    parseEntityStub.reset();
    filterEmptyItemsStub.reset();
}

const listingSingleMiddleware = proxyquire('../../../../app/server/bff/middleware/listingSingle', {
    '../../makeRequest': makeRequestStub,
    '../helper/transformListingGalleries': transformListingGalleriesStub,
    '../helper/filterEmptyItems': filterEmptyItemsStub,
    '../helper/parseEntity': { parseEntity: parseEntityStub }
});

const { listingNodeTypes } = listingSingleMiddleware;

const MiddlewareTestWrapper = new MiddlewareTestFactory(listingSingleMiddleware.default, {
    baseRequest: {
        query: {
            preview: 'preview',
            id: 16224
        },
        app: {
            locals: {
                config: {
                    services: {
                        remote: {
                            entity: entityServiceMockUrl
                        }
                    }
                }
            }
        }
    }
});

describe('single listing middleware', () => {
    describe('when id is present in the request query', () => {
        describe('and preview is also present', () => {
            let testArgs;
            let result;
            let entityResponse;
            let callMiddleware;

            before(async () => {
                [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                    req: { query: { id: 1234, preview: true } }
                });

                entityResponse = { ...getMockEntity() };

                makeRequestStub
                    .withArgs(`${testArgs.req.app.locals.config.services.remote.entity}/HOMES-${testArgs.req.query.id}?saved=true`)
                    .resolves(entityResponse);
                parseEntityStub.withArgs(entityResponse).returnsArg(0);
                transformListingGalleriesStub.withArgs(entityResponse.galleries).returnsArg(0);
                filterEmptyItemsStub.withArgs(entityResponse.testimonials, 'message').returnsArg(0);
                filterEmptyItemsStub.withArgs(entityResponse.profileGallery, 'url').returnsArg(0);
                filterEmptyItemsStub.withArgs(entityResponse.heroGallery, 'url').returnsArg(0);

                result = await callMiddleware();
            });

            after(() => {
                resetStubsAndSpies();
            });

            it('sets adds an entiy to the response body', () => {
                expect(result.res).to.deep.eq({
                    body: {
                        entity: {
                            ...entityResponse,
                            linkedGalleries: entityResponse.galleries
                        }
                    }
                });
            });

            it('calls the next middleware', () => {
                expect(testArgs.next).to.be.called;
            });
        });

        describe('and preview is not present', () => {
            describe('and entity service returns an empty response', () => {
                let testArgs;
                let result;
                let callMiddleware;

                before(async () => {
                    [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                        req: { query: { id: 1234, preview: true } }
                    });

                    makeRequestStub
                        .withArgs(
                            `${testArgs.req.app.locals.config.services.remote.entity}/HOMES-${testArgs.req.query.id}?saved=${
                                testArgs.req.query.preview
                            }`
                        )
                        .resolves(null);

                    result = await callMiddleware();
                });

                after(() => {
                    resetStubsAndSpies();
                });

                it('calls the next middleware', () => {
                    expect(testArgs.next).to.be.calledOnce;
                });

                it('does not modify the response body', () => {
                    expect(testArgs.res).to.deep.eq(result.res);
                });
            });

            describe('and entity service returns an entity with a valid listing node type', () => {
                listingNodeTypes.forEach(nodeType => {
                    describe(`and nodeType on returned entity is ${nodeType}`, () => {
                        let testArgs;
                        let result;
                        let entityResponse;
                        let callMiddleware;

                        before(async () => {
                            [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                                req: { query: { id: 1234, preview: false } }
                            });

                            entityResponse = { ...getMockEntity(), nodeTypeAlias: nodeType };

                            makeRequestStub
                                .withArgs(
                                    `${testArgs.req.app.locals.config.services.remote.entity}/HOMES-${testArgs.req.query.id}?saved=${!!testArgs.req
                                        .query.preview}`
                                )
                                .resolves(entityResponse);

                            parseEntityStub.withArgs(entityResponse).returnsArg(0);
                            transformListingGalleriesStub.withArgs(entityResponse.galleries).returnsArg(0);
                            filterEmptyItemsStub.withArgs(entityResponse.testimonials, 'message').returnsArg(0);
                            filterEmptyItemsStub.withArgs(entityResponse.profileGallery, 'url').returnsArg(0);
                            filterEmptyItemsStub.withArgs(entityResponse.heroGallery, 'url').returnsArg(0);

                            result = await callMiddleware();
                        });

                        after(() => {
                            resetStubsAndSpies();
                        });

                        it('sets adds an entity to the response body', () => {
                            expect(result.res).to.deep.eq({
                                body: {
                                    entity: {
                                        ...entityResponse,
                                        linkedGalleries: entityResponse.galleries
                                    }
                                }
                            });
                        });

                        it('calls the next middleware', () => {
                            expect(testArgs.next).to.be.calledOnce;
                        });
                    });
                });
            });

            describe('and entity service returns an entity with an invalid listing node type', () => {
                let testArgs;
                let result;
                let entityResponse;
                let callMiddleware;

                before(async () => {
                    [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                        req: { query: { id: 1234, preview: false } }
                    });

                    entityResponse = { ...getMockEntity(), nodeTypeAlias: 'HomesArticle' };

                    makeRequestStub
                        .withArgs(`${testArgs.req.app.locals.config.services.remote.entity}/HOMES-${testArgs.req.query.id}?saved=false`)
                        .resolves(entityResponse);

                    result = await callMiddleware();
                });

                after(() => {
                    resetStubsAndSpies();
                });

                it('calls the next middleware', () => {
                    expect(testArgs.next).to.be.calledOnce;
                });

                it('does not modify the response body', () => {
                    expect(testArgs.res).to.deep.eq(result.res);
                });
            });
        });
    });

    describe('when any of the methods throws an error', () => {
        let testArgs;
        let mockError;
        let result;

        let callMiddleware;

        before(async () => {
            [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                req: { query: { id: 1234, preview: false } }
            });

            mockError = new Error('makeRequest errored with some status');

            makeRequestStub
                .withArgs(`${testArgs.req.app.locals.config.services.remote.entity}/HOMES-${testArgs.req.query.id}?saved=false`)
                .throws(mockError);

            result = await callMiddleware();
        });

        after(() => {
            resetStubsAndSpies();
        });

        it('does not modify the response body', () => {
            expect(testArgs.res).to.deep.eq(result.res);
        });

        it('calls the next middleware with the error object', () => {
            expect(testArgs.next).to.be.calledOnceWith(mockError);
        });
    });
});

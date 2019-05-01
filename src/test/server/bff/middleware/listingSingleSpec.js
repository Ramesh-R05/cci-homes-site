import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

// stubs
const makeRequestStub = sinon.stub();
const transformListingGalleriesStub = sinon.stub();

// spies
const makeRequestSpy = sinon.spy(makeRequestStub);

// constants
const entityServiceMockUrl = 'http://entitiesUrl.com';

const getBaseRequest = () => ({
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
});

const getMockEntity = () => ({
    nodeTypeAlias: 'PremiumListing',
    copy: 'Cool premium listing copy.'
});

function resetStubsAndSpies() {
    makeRequestStub.reset();
}

const listingSingleMiddleware = proxyquire('../../../../app/server/bff/middleware/listingSingle', {
    '../../makeRequest': makeRequestSpy,
    '../helper/transformListingGalleries': transformListingGalleriesStub
});

describe('single listing middleware', () => {
    describe(`when receiving data`, () => {
        describe(`and node type is for a premium listing page`, () => {
            let req;
            let res;
            const next = sinon.spy();
            const linkedGalleries = [1, 2, 3];

            beforeEach(() => {
                makeRequestStub.resolves({ ...getMockEntity() });
                transformListingGalleriesStub.returns(linkedGalleries);

                req = { ...getBaseRequest() };
                res = {};
            });

            afterEach(() => {
                res = {};
                resetStubsAndSpies();
            });

            it('should make a request for the listing entity', done => {
                listingSingleMiddleware(req, res, next)
                    .then(() => {
                        const { preview } = req.query;
                        const saved = `?saved=${!!preview}`;
                        expect(makeRequestSpy).to.be.called;
                        expect(makeRequestSpy.calledWith(`${entityServiceMockUrl}/HOMES-${req.query.id}${saved}`)).to.be.true;
                        done();
                    })
                    .catch(done);
            });
            it('should set the response body to the correct shape', done => {
                const expectedBody = {
                    entity: { nodeType: getMockEntity().nodeTypeAlias, copy: getMockEntity().copy, linkedGalleries }
                };

                listingSingleMiddleware(req, res, next)
                    .then(() => {
                        expect(res.body).to.deep.eq(expectedBody);
                        done();
                    })
                    .catch(done);
            });
            it('should call the next middleware', done => {
                listingSingleMiddleware(req, res, next)
                    .then(() => {
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });
        });
    });
});

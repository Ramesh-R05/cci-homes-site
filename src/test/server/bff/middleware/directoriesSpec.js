import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

// stubs
const getLatestTeasersStub = sinon.stub();
const makeRequestStub = sinon.stub();
const parseEntitiesStub = sinon.stub();
const parseEntityStub = sinon.stub();
const getDirectoryFiltersStub = sinon.stub();

// spies
const parseEntitySpy = sinon.spy(parseEntityStub);
const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);
const makeRequestSpy = sinon.spy(makeRequestStub);
const getDirectoryFiltersSpy = sinon.spy(getDirectoryFiltersStub);

// constants
const entityServiceMockUrl = 'http://entitiesUrl.com';
const urlNameMock = 'directories';
const baseDirectoriesQueryMock = `tagsDetails/fullName eq 'food_Homes_navigation_directories'`;

const getMockListingResponse = count => Array.from(Array(count), (x, i) => ({ name: `name ${i}` }));

const getBaseRequest = () => ({
    query: {},
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
    tagsDetails: [
        {
            urlName: urlNameMock
        }
    ]
});

function resetStubsAndSpies() {
    makeRequestSpy.reset();
    getLatestTeasersSpy.reset();
    makeRequestStub.reset();
    parseEntitiesStub.reset();
    getLatestTeasersStub.reset();
}

const directoriesMiddleware = proxyquire('../../../../app/server/bff/middleware/directories', {
    '../helper/parseEntity': {
        parseEntities: parseEntitiesStub,
        parseEntity: parseEntitySpy
    },
    '../api/listing': getLatestTeasersSpy,
    '../../makeRequest': makeRequestSpy,
    '../api/directoryFilters': getDirectoryFiltersSpy
});

describe('directories middleware', () => {
    describe('without filters in the request', () => {
        let req;
        let res;
        const next = sinon.spy();

        beforeEach(() => {
            makeRequestStub.resolves({ ...getMockEntity() });
            getLatestTeasersStub.resolves({ data: getMockListingResponse(16) });
            parseEntityStub.returns({ ...getMockEntity(), kingtag: urlNameMock });
            parseEntitiesStub.returns(getMockListingResponse(6));
            parseEntitiesStub
                .onFirstCall()
                .returns(getMockListingResponse(6))
                .onSecondCall()
                .returns(getMockListingResponse(10));
            getDirectoryFiltersStub.returns([]);

            req = { ...getBaseRequest() };
            res = {};
        });

        afterEach(() => {
            res = {};
            resetStubsAndSpies();
        });

        it('should make a request for the page entity', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(makeRequestSpy).to.be.called;
                    expect(makeRequestSpy.calledWith(`${entityServiceMockUrl}/section/directories`)).to.be.true;
                    done();
                })
                .catch(done);
        });
        it('should make a request for the unfiltered directory items', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(getLatestTeasersSpy).to.be.called;
                    expect(getLatestTeasersSpy.getCall(0).args).to.deep.eq([100, 0, baseDirectoriesQueryMock]);
                    done();
                })
                .catch(done);
        });
        it('should set the kingtag on the entity to the urlName of the first tag', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(res.body.entity.kingtag).to.eq(urlNameMock);
                    done();
                })
                .catch(done);
        });
        it('should make a request for the directory filters', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(getDirectoryFiltersSpy).to.be.called;
                    done();
                })
                .catch(done);
        });
        it('should set the response body to the correct shape', done => {
            const expectedBody = {
                entity: { tagsDetails: getMockEntity().tagsDetails, kingtag: urlNameMock },
                topDirectories: getMockListingResponse(6),
                remainingDirectories: getMockListingResponse(10),
                directoryFilters: []
            };

            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(res.body).to.deep.eq(expectedBody);
                    done();
                })
                .catch(done);
        });
        it('should call the next middleware', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(next).to.be.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('with filters in the request', () => {
        const req = { ...getBaseRequest(), query: { filters: 'tag_1,tag_2' } };
        const res = {};
        const next = sinon.spy();

        beforeEach(() => {
            makeRequestStub.resolves({ ...getMockEntity() });
        });

        afterEach(() => {
            resetStubsAndSpies();
        });

        it('should make a request for the filtered directory items', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(getLatestTeasersSpy).to.be.called;
                    expect(getLatestTeasersSpy.getCall(0).args).to.deep.eq([
                        100,
                        0,
                        `${baseDirectoriesQueryMock} and tagsDetails/fullName eq 'tag_1' and tagsDetails/fullName eq 'tag_2'`
                    ]);
                    done();
                })
                .catch(done);
        });
    });

    describe('when getLatestTeasers response has a length greater than 6', () => {
        let req;
        let res;
        const next = sinon.stub();

        beforeEach(() => {
            req = { ...getBaseRequest() };
            res = {};
            makeRequestStub.resolves({ ...getMockEntity() });
            getLatestTeasersStub.resolves({ data: getMockListingResponse(10) });
        });

        afterEach(() => {
            res = {};
            resetStubsAndSpies();
        });

        it('should call parseEntities with the correct number of items', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    const [topDirectoriesCall, remainingDirectoriesCall] = parseEntitiesStub.getCalls();
                    expect(topDirectoriesCall.args[0]).to.have.length(6);
                    expect(remainingDirectoriesCall.args[0]).to.have.length(4);
                    done();
                })
                .catch(done);
        });

        it('should call parseEntities twice', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(parseEntitiesStub.callCount).to.eq(2);
                    done();
                })
                .catch(done);
        });
    });

    describe('when getLatestTeasers response has a length less than 6', () => {
        let req;
        let res;
        const next = sinon.stub();

        beforeEach(() => {
            req = { ...getBaseRequest() };
            res = {};
            makeRequestStub.resolves({ ...getMockEntity() });
            getLatestTeasersStub.resolves({ data: getMockListingResponse(4) });
        });

        afterEach(() => {
            res = {};
            resetStubsAndSpies();
        });

        it('should call parseEntities with the correct number of items', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    const [topDirectoriesCall, remainingDirectoriesCall] = parseEntitiesStub.getCalls();
                    expect(topDirectoriesCall.args[0]).to.have.length(4);
                    expect(remainingDirectoriesCall.args[0]).to.have.length(0);
                    done();
                })
                .catch(done);
        });

        it('should call parseEntities twice', done => {
            directoriesMiddleware(req, res, next)
                .then(() => {
                    expect(parseEntitiesStub.callCount).to.eq(2);
                    done();
                })
                .catch(done);
        });
    });
});

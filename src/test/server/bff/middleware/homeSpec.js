import proxyquire, { noCallThru } from 'proxyquire';
import heroStubData from '../../../../stubs/module-homepagehero';
import itemsStubData from '../../../../stubs/listings-homepage';
import latestVideoStubData from '../../../../stubs/bff-latest-videos';
noCallThru();

const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();
const getModulesStub = sinon.stub();

const entityStubData = {
    id: 'HOMES-123',
    nodeName: 'Kmart nursery furniture',
    urlName: 'kmart-nursery-furniture'
};

const homeFilter = "(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery')";

const latestVideoFilter = "(nodeTypeAlias eq 'HomesArticle' and contentHasVideo eq 'true')";

const expectedBody = {
    entity: entityStubData,
    hero: heroStubData,
    items: itemsStubData,
    latestVideos: latestVideoStubData,
    list: {
        params: {
            listName: 'home',
            basePath: `/`,
            offset: 6,
            pageNo: 1,
            pageSize: 12,
            filter: homeFilter
        }
    },
    section: {
        id: 'HOMES-123',
        name: 'Kmart nursery furniture',
        urlName: 'kmart-nursery-furniture'
    }
};

let heroStubDataWrapper = {
    totalCount: 1,
    data: [heroStubData]
};

const entityServiceMockUrl = 'http://entitiesUrl.com';
const moduleServiceMockUrl = 'http://modulesUrl.com';
const entityServiceMockUrlForHomepage = `${entityServiceMockUrl}/homepage`;
const moduleServiceMockUrlForHomepageHero = `${moduleServiceMockUrl}/homepagehero`;

getLatestTeasersStub.returns({ data: {} });

let makeRequestStub = requestUrl => {
    if (requestUrl.includes(entityServiceMockUrlForHomepage)) {
        return entityStubData;
    } else if (requestUrl.includes(moduleServiceMockUrlForHomepageHero)) {
        return heroStubDataWrapper;
    }
};

const makeRequestSpy = sinon.spy(makeRequestStub);

parseEntityStub.onFirstCall().returns(entityStubData);
parseEntityStub.onSecondCall().returns(heroStubData);
parseEntitiesStub.onFirstCall().returns(itemsStubData);
parseEntitiesStub.onSecondCall().returns(latestVideoStubData);

const homeMiddleware = proxyquire('../../../../app/server/bff/middleware/home', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntity: () => parseEntityStub(),
        parseEntities: parseEntitiesStub
    },
    '../api/listing': getLatestTeasersStub,
    '../api/module': getModulesStub
});

describe('home middleware', () => {
    const req = {
        query: {},
        app: {
            locals: {
                config: {
                    services: {
                        remote: {
                            entity: entityServiceMockUrl,
                            module: moduleServiceMockUrl
                        }
                    }
                }
            }
        }
    };
    const res = {};
    const next = () => {};

    describe(`when receiving data`, () => {
        describe(`and brand query is defined`, () => {
            before(() => {
                req.query = { brand: 'belle' };
            });

            after(() => {
                req.query = {};
            });

            it('should not call service urls', done => {
                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(makeRequestSpy.called).to.be.false;

                        done();
                    })
                    .catch(done);
            });
        });

        describe(`and brand query is not defined`, () => {
            const nextSpy = sinon.spy();

            before(() => {
                getModulesStub.resolves(heroStubData.data);
            });

            it('should return all modules in the desired structure', done => {
                homeMiddleware(req, res, next)
                    .then(() => {
                        expect(res.body).to.deep.equal(expectedBody);
                        done();
                    })
                    .catch(done);
            });

            it('should use the required config values for content service urls for the request', done => {
                homeMiddleware(req, res, next)
                    .then(() => {
                        const entityServiceUrl = `${entityServiceMockUrl}/homepage`;

                        const makeRequestSpyCall = makeRequestSpy.getCall(0);
                        const getModulesStubCall = getModulesStub.getCall(0);
                        const getLatestTeasersStubFirstCall = getLatestTeasersStub.getCall(0);
                        const getLatestTeasersStubSecondCall = getLatestTeasersStub.getCall(1);

                        expect(makeRequestSpyCall.args[0]).to.equal(entityServiceUrl);
                        expect(getModulesStubCall.args[0]).to.equal('homepagehero');

                        expect(getLatestTeasersStubFirstCall.args).to.deep.equal([6, 0, homeFilter]);
                        expect(getLatestTeasersStubSecondCall.args).to.deep.equal([3, 0, latestVideoFilter]);

                        done();
                    })
                    .catch(done);
            });

            describe(`when module response is empty`, () => {
                before(() => {
                    heroStubDataWrapper = {};
                });

                it('should not be an error', done => {
                    homeMiddleware(req, res, nextSpy)
                        .then(() => {
                            expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                            done();
                        })
                        .catch(done);
                });
            });

            describe(`when there is no hero module`, () => {
                before(() => {
                    heroStubDataWrapper = {
                        totalCount: 0,
                        data: []
                    };
                });

                it('should not throw an error)', done => {
                    homeMiddleware(req, res, nextSpy)
                        .then(() => {
                            expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                            done();
                        })
                        .catch(done);
                });
            });
        });
    });
});

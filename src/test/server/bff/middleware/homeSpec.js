import proxyquire, {noCallThru} from 'proxyquire';
import heroStubData from '../../../../stubs/module-homepagehero';
noCallThru();

const parseEntityStub = sinon.stub();
const parseModulesStub = sinon.stub();

const entityStubData = {
    id: 'HOMES-123'
};

const moduleStubData = {
    featuredarticles: {
        items: [
            {
                id: 'HOMES-123'
            }
        ]
    }
};

const expectedBody = {
    entity: entityStubData,
    hero: heroStubData,
    items: moduleStubData.featuredarticles.items
};

let heroStubDataWrapper = {
    totalCount: 1,
    data: [
        heroStubData
    ]
};

const entityServiceMockUrl = 'http://entitiesUrl.com';
const moduleServiceMockUrl = 'http://modulesUrl.com';
const entityServiceMockUrlForHomepage = `${entityServiceMockUrl}/homepage`;
const moduleServiceMockUrlForHomepageHero = `${moduleServiceMockUrl}/homepagehero`;
const moduleServiceMockUrlForFeatureArticle = `${moduleServiceMockUrl}/featuredarticles`;

let makeRequestStub = (requestUrl) => {

    if (requestUrl.includes(entityServiceMockUrlForHomepage)) {
        return entityStubData;
    } else if (requestUrl.includes(moduleServiceMockUrlForHomepageHero)) {
        return heroStubDataWrapper;
    } else if (requestUrl.includes(moduleServiceMockUrlForFeatureArticle)) {
        return moduleStubData;
    }
};

const makeRequestSpy = sinon.spy(makeRequestStub);

parseEntityStub.onFirstCall().returns(entityStubData);
parseEntityStub.onSecondCall().returns(heroStubData);
parseModulesStub.returns(moduleStubData);

const homeMiddleware = proxyquire('../../../../app/server/bff/middleware/home', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntity: () => {
            return parseEntityStub()
        }
    },
    '../helper/parseModule': {
        parseModules: () => {
            return parseModulesStub()
        }
    }
});

describe('home middleware', () => {
    const req = {
        query: {},
        app: {
            config: {
                services: {
                    remote: {
                        entity: entityServiceMockUrl,
                        module: moduleServiceMockUrl
                    }
                }
            }
        }
    };
    const res = {};
    const next = ()=>{};

    describe(`when receiving data`, () => {

        describe(`and brand query is defined`, () => {
            before(()=>{
                req.query = { brand: 'belle'};
            });

            after(()=>{
                req.query = {};
            });

            it('should not call service urls', (done)=> {
                homeMiddleware(req, res, next).then(() => {
                    expect(makeRequestSpy.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and brand query is not defined`, () => {
            const nextSpy = sinon.spy();

            beforeEach(()=> {
                nextSpy.reset();
                makeRequestSpy.reset();
                parseEntityStub.reset();
                parseModulesStub.reset();
            });

            it('should use the required config values for content service urls for the request', (done)=> {

                before(() => {
                    heroStubDataWrapper = {
                        totalCount: 1,
                        data: [
                            heroStubData
                        ]
                    }
                });

                homeMiddleware(req, res, next).then(() => {
                    const entityServiceUrl = `${entityServiceMockUrl}/homepage`;
                    const heroModuleServiceUrl = `${moduleServiceMockUrl}/homepagehero`;
                    const modulesServiceUrl = `${moduleServiceMockUrl}/featuredarticles`;

                    expect(makeRequestSpy.firstCall.calledWith(entityServiceUrl)).to.be.true;
                    expect(makeRequestSpy.secondCall.calledWith(heroModuleServiceUrl)).to.be.true;
                    expect(makeRequestSpy.thirdCall.calledWith(modulesServiceUrl)).to.be.true;

                    done();
                }).catch(done);
            });

            describe(`when module response is empty`, () => {
                before(()=>{
                    heroStubDataWrapper = {};
                });

                it('should not be an error', (done)=> {
                    homeMiddleware(req, res, nextSpy).then(() => {
                        expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                        done();
                    }).catch(done);
                });
            });

            describe(`when there is no hero module`, () => {
                before(() => {
                    heroStubDataWrapper = {
                        totalCount: 0,
                        data: []
                    }
                });

                it('should not throw an error)', (done)=> {
                    homeMiddleware(req, res, nextSpy).then(() => {
                        expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                        done();
                    }).catch(done);
                });
            });

            it('should return all modules in the desired structure', (done)=> {
                homeMiddleware(req, res, next).then(() => {
                    expect(res.body).to.deep.equal(expectedBody);

                    done();
                }).catch(done);
            });
        });
    });

});

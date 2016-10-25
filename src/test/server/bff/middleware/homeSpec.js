import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const makeRequestSpy = sinon.spy();
const parseEntityStub = sinon.stub();
const parseModulesStub = sinon.stub();

const entityStubData = {
    id: 'HOMES-123'
};

const moduleStubData = {
    featuredarticles: {
        id: "HOMES-1375",
        url: "/modules/homepage/featured-articles",
        moduleManualContent: {
            data: [
                {
                    id: 'HOMES-123'
                }
            ]
        }
    },
    infocusarticles: {
        id: "HOMES-1382",
        url: "/modules/homepage/in-focus-articles",
        moduleManualContent: {
            data: [
                {
                    id: 'HOMES-123'
                }
            ]
        }
    }
};

const expectedBody = {
    entity: entityStubData,
    stores: {
        featuredArticles: {
            ...moduleStubData.featuredarticles,
            moduleManualContent: moduleStubData.featuredarticles.moduleManualContent
        },
        inFocusArticles: {
            ...moduleStubData.infocusarticles,
            moduleManualContent: moduleStubData.infocusarticles.moduleManualContent
        }
    }
};

parseEntityStub.returns(entityStubData);
parseModulesStub.returns(moduleStubData);

const entityServiceMockUrl = 'http://entitiesUrl.com';
const moduleServiceMockUrl = 'http://modulesUrl.com';

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
    },
    '@bxm/winston-logger': { backendLogger: { log(){} } }
});

describe('home middleware', () => {
    const req = {
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
        it('should use the required config values for content service urls for the request', (done)=> {
            homeMiddleware(req, res, next).then(() => {
                const entityServiceUrl = `${entityServiceMockUrl}/homepage`;
                const modulesServiceUrl = `${moduleServiceMockUrl}/featuredArticles,infocusarticles`;

                expect(makeRequestSpy.firstCall.calledWith(entityServiceUrl)).to.be.true;
                expect(makeRequestSpy.secondCall.calledWith(modulesServiceUrl)).to.be.true;

                done();
            }).catch(done);
        });

        it('should return all modules in the desired structure', (done)=> {
            homeMiddleware(req, res, next).then(() => {
                expect(res.body).to.deep.equal(expectedBody);
                done();
            }).catch(done);
        });
    });

});

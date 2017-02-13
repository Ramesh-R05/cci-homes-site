import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-belle';
import heroStubData from '../../../../stubs/module-bellehero';
import itemsStubData from '../../../../stubs/listings-belle';
import brands from '../../../../app/config/brands';

const getLatestTeasersStub = sinon.stub();
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

let heroStubDataWrapper = {
    totalCount: 1,
    data: [
        heroStubData
    ]
};

const entityServiceMockUrl = 'http://entitiesUrl.com';
const moduleServiceMockUrl = 'http://moduleUrl.com';
const entityServiceMockUrlForBelle = `${entityServiceMockUrl}/section/belle`;
const moduleServiceMockUrlForBelle = `${moduleServiceMockUrl}/bellehero`;

getLatestTeasersStub.returns({data: {}});

parseEntityStub.onFirstCall().returns(entityStubData);
parseEntityStub.onSecondCall().returns(heroStubData);
parseEntitiesStub.returns(itemsStubData);

let makeRequestStub = (requestUrl) => {
    if (requestUrl.includes(entityServiceMockUrlForBelle)) {
        return entityStubData;
    } else if (requestUrl.includes(moduleServiceMockUrlForBelle)) {
        return heroStubDataWrapper;
    }
};

const makeRequestSpy = sinon.spy(makeRequestStub);

const expectedBody = {
    entity: entityStubData,
    hero: heroStubData,
    items: itemsStubData
};

const brandMiddleware = proxyquire('../../../../app/server/bff/middleware/brand', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    },
    '../api/listing': {
        getLatestTeasers: getLatestTeasersStub
    }
});

describe('brand middleware', () => {
    const req = {
        query: {
            brand: 'belle'
        },
        app: {
            config: {
                brands: {
                    uniheader: brands
                },
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
    const expectedBrand = brands.find((brand)=>{
        return brand.title == entityStubData.articleSource;
    });
    const expectedHeroModuleName = `${expectedBrand.id}hero`;

    describe(`when receiving data`, () => {

        describe(`and brand query is not defined`, () => {
            let brand = req.query;

            before(()=>{
                req.query = {};
            });

            after(()=>{
                req.query = brand;
            });

            it('should not call service urls', (done)=> {
                brandMiddleware(req, res, next).then(() => {
                    sinon.assert.notCalled(makeRequestSpy);
                    sinon.assert.notCalled(getLatestTeasersStub);

                    done();
                }).catch(done);
            });
        });

        describe(`and brand query is defined`, () => {

            beforeEach(()=> {
                getLatestTeasersStub.reset();
                parseEntityStub.reset();
                parseEntitiesStub.reset();
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

                brandMiddleware(req, res, next).then(() => {
                    const expectedEntityServiceUrl = `${entityServiceMockUrl}/section/${req.query.brand}`;
                    const expectedModuleServiceUrl = `${moduleServiceMockUrl}/${expectedHeroModuleName}`;

                    const makeRequestSpyFirstCall = makeRequestSpy.getCall(0);
                    const makeRequestSpySecondCall = makeRequestSpy.getCall(1);
                    const getLatestTeasersStubFirstCall = getLatestTeasersStub.getCall(0);

                    expect(makeRequestSpyFirstCall.args[0]).to.equal(expectedEntityServiceUrl);
                    expect(makeRequestSpySecondCall.args[0]).to.equal(expectedModuleServiceUrl);
                    expect(getLatestTeasersStubFirstCall.args[0]).to.equal(12);
                    expect(getLatestTeasersStubFirstCall.args[1]).to.equal(0);
                    expect(getLatestTeasersStubFirstCall.args[2]).to.equal(`source eq '${entityStubData.articleSource}'`);

                    sinon.assert.calledWith(parseEntityStub, sinon.match.has('brand', expectedBrand.id));

                    done();
                }).catch(done);
            });

            describe(`when module response is empty`, () => {
                const nextSpy = sinon.spy();

                before(()=>{
                    heroStubDataWrapper = {};
                });

                it('should not be an error', (done)=> {
                    brandMiddleware(req, res, nextSpy).then(() => {
                        expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                        done();
                    }).catch(done);
                });
            });

            describe(`when there is no hero module`, () => {
                const nextSpy = sinon.spy();

                before(() => {
                    heroStubDataWrapper = {
                        totalCount: 0,
                        data: []
                    }
                });

                it('should not throw an error)', (done)=> {
                    brandMiddleware(req, res, nextSpy).then(() => {
                        expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                        done();
                    }).catch(done);
                });
            });

            it('should return all modules in the desired structure', (done) => {
                brandMiddleware(req, res, next).then(() => {
                    expect(res.body).to.deep.equal(expectedBody);

                    done();
                }).catch(done);
            });
        });
    });

});

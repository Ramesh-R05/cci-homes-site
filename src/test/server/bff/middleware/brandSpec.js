import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-belle';
import heroStubData from '../../../../stubs/module-bellehero';
import itemsStubData from '../../../../stubs/listings-belle';
import brands from '../../../../app/config/brands';

const makeRequestStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

makeRequestStub.onFirstCall().returns(entityStubData);
makeRequestStub.onSecondCall().returns({
    totalCount: 1,
    data: [
        heroStubData
    ]
});

getLatestTeasersStub.returns({data: {}});

parseEntityStub.onFirstCall().returns(entityStubData);
parseEntityStub.onSecondCall().returns(heroStubData);
parseEntitiesStub.returns(itemsStubData);

const entityServiceMockUrl = 'http://entitiesUrl.com';
const moduleServiceMockUrl = 'http://moduleUrl.com';

const expectedBrand = brands.find((brand)=>{
    return brand.title == entityStubData.articleSource;
});

const heroModuleName = `${expectedBrand.id}hero`;

const expectedBody = {
    entity: entityStubData,
    hero: heroStubData,
    items: itemsStubData
};

const brandMiddleware = proxyquire('../../../../app/server/bff/middleware/brand', {
    '../../makeRequest': makeRequestStub,
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
                    sinon.assert.notCalled(makeRequestStub);
                    sinon.assert.notCalled(getLatestTeasersStub);

                    done();
                }).catch(done);
            });
        });

        describe(`and brand query is defined`, () => {

            beforeEach(()=> {
                makeRequestStub.reset();
                getLatestTeasersStub.reset();
                parseEntityStub.reset();
                parseEntitiesStub.reset();
            });

            it('should use the required config values for content service urls for the request', (done)=> {
                brandMiddleware(req, res, next).then(() => {
                    const entityServiceUrl = `${entityServiceMockUrl}/section/${req.query.brand}`;
                    const moduleServiceUrl = `${moduleServiceMockUrl}/${heroModuleName}`;

                    const makeRequestStubFirstCall = makeRequestStub.getCall(0);
                    const getLatestTeasersStubFirstCall = getLatestTeasersStub.getCall(0);
                    const makeRequestStubSecondCall = makeRequestStub.getCall(1);

                    expect(makeRequestStubFirstCall.args[0]).to.equal(entityServiceUrl);
                    expect(getLatestTeasersStubFirstCall.args[0]).to.equal(12);
                    expect(getLatestTeasersStubFirstCall.args[1]).to.equal(0);
                    expect(getLatestTeasersStubFirstCall.args[2]).to.equal(`source eq '${entityStubData.articleSource}'`);
                    expect(makeRequestStubSecondCall.args[0]).to.equal(moduleServiceUrl);

                    sinon.assert.calledWith(parseEntityStub, sinon.match.has('brand', expectedBrand.id));

                    done();
                }).catch(done);
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

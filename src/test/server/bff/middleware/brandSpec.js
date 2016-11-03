import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-belle';
import itemsStubData from '../../../../stubs/listings-belle';

const makeRequestStub = () => ({articleSource: entityStubData.articleSource});
const getLatestTeasersStub = () => ({data: {}});
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

parseEntityStub.returns(entityStubData);
parseEntitiesStub.returns(itemsStubData);

const makeRequestSpy = sinon.spy(makeRequestStub);
const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);

const entityServiceMockUrl = 'http://entitiesUrl.com';

const expectedBody = {
    entity: entityStubData,
    items: itemsStubData
};

const brandMiddleware = proxyquire('../../../../app/server/bff/middleware/brand', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    },
    '../api/listing': {
        getLatestTeasers: getLatestTeasersSpy
    }
});

describe('brand middleware', () => {
    const req = {
        query: {
            brand: 'belle'
        },
        app: {
            config: {
                services: {
                    remote: {
                        entity: entityServiceMockUrl
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
                req.query.brand = brand;
            });

            it('should not call service urls', (done)=> {
                brandMiddleware(req, res, next).then(() => {
                    expect(makeRequestSpy.called).to.be.false;
                    expect(getLatestTeasersSpy.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and brand query is defined`, () => {

            it('should use the required config values for content service urls for the request', (done)=> {
                brandMiddleware(req, res, next).then(() => {
                    const entityServiceUrl = `${entityServiceMockUrl}/section/${req.query.brand}`;

                    expect(makeRequestSpy.firstCall.calledWith(entityServiceUrl)).to.be.true;
                    expect(getLatestTeasersSpy.firstCall.calledWith(12, 0, entityStubData.articleSource, 'source')).to.be.true;

                    done();
                }).catch(done);
            });

            it('should return all modules in the desired structure', (done)=> {
                brandMiddleware(req, res, next).then(() => {
                    expect(res.body).to.deep.equal(expectedBody);
                    done();
                }).catch(done);
            });
        });
    });

});

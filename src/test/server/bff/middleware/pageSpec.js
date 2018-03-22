import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-3193';
import brands from '../../../../app/config/brands';

const makeRequestStub = () => ({articleSource: entityStubData.articleSource});

const parseEntityStub = sinon.stub();

parseEntityStub.returns(entityStubData);

const makeRequestSpy = sinon.spy(makeRequestStub);

const entityServiceMockUrl = 'http://entitiesUrl.com';

const expectedBrand = brands.find((brand)=>{
    return brand.title == entityStubData.articleSource;
});

const expectedBody = {
    entity: entityStubData
};

const articleMiddleware = proxyquire('../../../../app/server/bff/middleware/page', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
    }
});

describe('page middleware', () => {
    const req = {
        query: {
            preview: 'preview',
            page: 'an-article-or-gallery-title',
            id: 2234
        },
        app: {
            locals: {
                config: {
                    brands: {
                        uniheader: brands
                    },
                    services: {
                        remote: {
                            entity: entityServiceMockUrl
                        }
                    }
                }
            }
        }
    };
    const res = {};
    const next = ()=>{};

    describe(`when receiving data`, () => {

        describe(`and page query is not defined`, () => {

            let page = req.query;

            before(()=>{
                req.query = {};
            });

            after(()=>{
                req.query = page;
            });

            it('should not call service urls', (done) => {
                articleMiddleware(req, res, next).then(() => {

                    expect(makeRequestSpy.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and page query is defined`, () => {

            it('should use the required config values for content service urls for the request', (done) => {
                articleMiddleware(req, res, next).then(() => {
                    const {preview} = req.query;
                    const saved = `?saved=${!!preview}`;
                    const entityServiceUrl = `${entityServiceMockUrl}/HOMES-${req.query.id}${saved}`;
                    expect(makeRequestSpy.firstCall.calledWith(entityServiceUrl)).to.be.true;

                    expect(parseEntityStub.calledWith(sinon.match.has('brand', expectedBrand.id))).to.be.true;

                    done();
                }).catch(done);
            });

            it('should return all modules in the desired structure', (done)  => {
                articleMiddleware(req, res, next).then(() => {
                    expect(res.body).to.deep.equal(expectedBody);
                    done();
                }).catch(done);
            });
        });
    });

});

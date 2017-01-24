import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-nodetypealias-campaign-urlname-myer-eat-live';
import listingsStubData from '../../../../stubs/listings-campaign-myer-eat-live';

const makeRequestStub = sinon.stub();
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

makeRequestStub.onFirstCall().returns({sponsorName: entityStubData.sponsorName});
makeRequestStub.onSecondCall().returns(listingsStubData);

parseEntityStub.returns(entityStubData);
parseEntitiesStub.onFirstCall().returns(listingsStubData.data.slice(11));
parseEntitiesStub.onSecondCall().returns(listingsStubData.data.slice(0, 11));

const entityServiceMockUrl = 'http://entitiesUrl.com';
const listingsServiceMockUrl = 'http://listingsUrl.com';
const siteMockHost = 'http://siteHost.com';

const campaign = 'myer-eat-live';

const currentPath = `/campaign/${campaign}`;
const nextPath = `/campaign/${campaign}?pageNo=2`;
const expectedList = {
    listName: campaign,
    params: {
        pageNo: 1,
        filter: `(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and sponsorName eq '${entityStubData.sponsorName}'`
    },
    items: [
        listingsStubData.data.slice(11)
    ],
    previous: null,
    current: {
        path: currentPath,
        url: `${siteMockHost}${currentPath}`
    },
    next: {
        path: nextPath,
        url: `${siteMockHost}${nextPath}`
    }
};

const expectedBody = {
    entity: entityStubData,
    items: listingsStubData.data.slice(0, 11),
    list: expectedList
};

const campaignMiddleware = proxyquire('../../../../app/server/bff/middleware/campaign', {
    '../../makeRequest': makeRequestStub,
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    }
});

describe('campaign middleware', () => {
    const req = {
        query: {
            campaign: campaign
        },
        app: {
            config: {
                site: {
                    host: siteMockHost
                },
                services: {
                    remote: {
                        entity: entityServiceMockUrl,
                        listings: listingsServiceMockUrl
                    }
                }
            }
        }
    };
    const res = {};
    const next = ()=>{};

    describe(`when receiving data`, () => {

        describe(`and campaign query is not defined`, () => {
            before(()=>{
                req.query = {};
            });

            after(()=>{
                req.query.campaign = campaign;
            });

            it('should not call service urls', (done)=> {
                campaignMiddleware(req, res, next).then(() => {
                    expect(makeRequestStub.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and campaign query is defined`, () => {

            beforeEach(()=> {
                makeRequestStub.reset();
                parseEntitiesStub.reset();
            });

            it('should use the required config values for content service urls for the request', (done)=> {
                campaignMiddleware(req, res, next).then(() => {
                    const entityServiceUrl = `${entityServiceMockUrl}/?nodeTypeAlias=Campaign&urlName=${req.query.campaign}`;
                    const listingsServiceUrl = `${listingsServiceMockUrl}/teasers?$select=*&$filter=(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and sponsorName eq '${entityStubData.sponsorName}'&$orderby=pageDateCreated desc&$top=20&$skip=0`;

                    const makeRequestStubFirstCall = makeRequestStub.getCall(0);
                    const makeRequestStubSecondCall = makeRequestStub.getCall(1);

                    expect(makeRequestStubFirstCall.args[0]).to.equal(entityServiceUrl);
                    expect(makeRequestStubSecondCall.args[0]).to.equal(listingsServiceUrl);

                    done();
                }).catch(done);
            });

            it('should return all modules in the desired structure', (done)=> {

                campaignMiddleware(req, res, next).then(() => {
                    expect(res.body).to.deep.equal(expectedBody);
                    done();
                }).catch(done);
            });
        });
    });

});

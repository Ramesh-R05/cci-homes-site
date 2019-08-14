import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-nodetypealias-campaign-urlname-myer-eat-live';
import listingsStubData from '../../../../stubs/listings-campaign-myer-eat-live';

const getEntityStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

getEntityStub.onFirstCall().returns({ sponsorName: entityStubData.sponsorName });
getEntityStub.onSecondCall().returns(listingsStubData);
getLatestTeasersStub.onFirstCall().returns(listingsStubData);

parseEntityStub.returns(entityStubData);
parseEntitiesStub.onFirstCall().returns(listingsStubData.data.slice(0, 11));

const entityServiceMockUrl = 'http://entitiesUrl.com';
const listingsServiceMockUrl = 'http://listingsUrl.com';
const siteMockHost = 'http://siteHost.com';

const campaign = 'myer-eat-live';
const campaignFilter = `(nodeTypeAlias eq 'HomesArticle' or nodeTypeAlias eq 'Gallery') and sponsorName eq '${entityStubData.sponsorName}'`;

const expectedBody = {
    entity: entityStubData,
    items: listingsStubData.data.slice(0, 11),
    list: {
        params: {
            listName: campaign,
            basePath: `/campaign/${campaign}`,
            offset: 6,
            pageNo: 1,
            pageSize: 12,
            filter: campaignFilter
        }
    }
};

const campaignMiddleware = proxyquire('../../../../app/server/bff/middleware/campaign', {
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    },
    '../api': {
        getLatestTeasers: getLatestTeasersStub,
        getEntity: getEntityStub
    }
}).default;

describe('campaign middleware', () => {
    const req = {
        query: {
            campaign: campaign
        },
        app: {
            locals: {
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
        }
    };
    const res = {};
    const next = () => {};

    describe(`when receiving data`, () => {
        describe(`and campaign query is not defined`, () => {
            before(() => {
                req.query = {};
            });

            after(() => {
                req.query.campaign = campaign;
            });

            it('should not call service urls', done => {
                campaignMiddleware(req, res, next)
                    .then(() => {
                        expect(getEntityStub.called).to.be.false;
                        expect(getLatestTeasersStub.called).to.be.false;

                        done();
                    })
                    .catch(done);
            });
        });

        describe(`and campaign query is defined`, () => {
            it('should return all modules in the desired structure', done => {
                campaignMiddleware(req, res, next)
                    .then(() => {
                        expect(res.body).to.deep.equal(expectedBody);
                        done();
                    })
                    .catch(done);
            });

            it('should use the required config values for content service urls for the request', done => {
                campaignMiddleware(req, res, next)
                    .then(() => {
                        const entityServiceUrl = `?nodeTypeAlias=Campaign&urlName=${req.query.campaign}`;

                        const getEntityStubFirstCall = getEntityStub.getCall(0);
                        const getLatestTeasersStubFirstCall = getLatestTeasersStub.getCall(0);

                        expect(getEntityStubFirstCall.args[0]).to.equal(entityServiceUrl);

                        expect(getLatestTeasersStubFirstCall.args[0]).to.equal(6);
                        expect(getLatestTeasersStubFirstCall.args[1]).to.equal(0);
                        expect(getLatestTeasersStubFirstCall.args[2]).to.equal(campaignFilter);

                        done();
                    })
                    .catch(done);
            });
        });
    });
});

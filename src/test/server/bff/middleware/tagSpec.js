import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
import listingsStubData from '../../../../stubs/listings-luxury-home';
import tagStubData from '../../../../stubs/tag-luxury-home';

const getTagsStub = sinon.stub();
getTagsStub.resolves(tagStubData);
const getLatestTeasersStub = () => listingsStubData;
const parseEntitiesStub = sinon.stub();

parseEntitiesStub.onFirstCall().returns(listingsStubData.data.slice(0, 11));

const getTagsSpy = sinon.spy(getTagsStub);
const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);

const listingsServiceMockUrl = 'http://listingsUrl.com';
const tagServiceMockUrl = 'http://tagUrl.com';
const siteMockHost = 'http://siteHost.com';

const tagSection = 'luxury-home';
const tagFilter = `tagsDetails/urlName eq '${tagSection}'`;

const expectedTagData = {
    title: tagStubData.data[0].displayName,
    urlName: tagStubData.data[0].urlName,
    nodeType: 'TagSection',
    dateCreated: tagStubData.data[0].createdAt, //"2016-02-16T23:15:11.480Z"
    kingtag: tagStubData.data[0].urlName
};

const expectedBody = {
    entity: expectedTagData,
    items: listingsStubData.data.slice(0, 11),
    list: {
        params: {
            listName: tagSection,
            basePath: `/tags/${tagSection}`,
            offset: 6,
            pageNo: 1,
            pageSize: 12,
            filter: tagFilter
        }
    }
};

const tagSectionMiddleware = proxyquire('../../../../app/server/bff/middleware/tag', {
    '../helper/parseEntity': {
        parseEntities: parseEntitiesStub
    },
    '../api': {
        getLatestTeasers: getLatestTeasersSpy,
        getTags: getTagsSpy
    }
}).default;

describe('tag section middleware', () => {
    const req = {
        query: {
            tag: tagSection
        },
        app: {
            locals: {
                config: {
                    site: {
                        host: siteMockHost
                    },
                    services: {
                        remote: {
                            listings: listingsServiceMockUrl,
                            tag: tagServiceMockUrl
                        }
                    }
                }
            }
        }
    };
    const res = {};
    const next = () => {};

    describe(`when receiving data`, () => {
        describe(`and tag query is not defined`, () => {
            before(() => {
                req.query = {};
            });

            after(() => {
                req.query.tag = tagSection;
            });

            it('should not call service urls', done => {
                tagSectionMiddleware(req, res, next)
                    .then(() => {
                        expect(getTagsSpy.called).to.be.false;
                        expect(getLatestTeasersSpy.called).to.be.false;

                        done();
                    })
                    .catch(done);
            });
        });

        describe(`and tag section query is defined`, () => {
            it('should return all modules in the desired structure', done => {
                tagSectionMiddleware(req, res, next)
                    .then(() => {
                        expect(res.body).to.deep.equal(expectedBody);
                        done();
                    })
                    .catch(done);
            });

            it('should use the required config values for content service urls for the request', done => {
                tagSectionMiddleware(req, res, next)
                    .then(() => {
                        const tagName = `${tagSection}`;
                        const getTagSpyFirstCall = getTagsSpy.getCall(0);
                        const getLatestTeasersSpyFirstCall = getLatestTeasersSpy.getCall(0);

                        expect(getTagSpyFirstCall.args[0]).to.equal(tagName);

                        expect(getLatestTeasersSpyFirstCall.args[0]).to.equal(6);
                        expect(getLatestTeasersSpyFirstCall.args[1]).to.equal(0);
                        expect(getLatestTeasersSpyFirstCall.args[2]).to.equal(tagFilter);

                        done();
                    })
                    .catch(done);
            });
        });
    });
});

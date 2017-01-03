import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import listingsStubData from '../../../../stubs/listings-luxury-home';
import tagStubData from '../../../../stubs/tag-luxury-home';

const makeRequestStub = sinon.stub();
makeRequestStub.resolves(tagStubData);
const getLatestTeasersStub = () => listingsStubData;
const parseEntitiesStub = sinon.stub();

parseEntitiesStub.onFirstCall().returns(listingsStubData.data.slice(11));
parseEntitiesStub.onSecondCall().returns(listingsStubData.data.slice(0, 11));

const makeRequestSpy = sinon.spy(makeRequestStub);
const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);

const listingsServiceMockUrl = 'http://listingsUrl.com';
const tagServiceMockUrl = 'http://tagUrl.com';
const siteMockHost = 'http://siteHost.com';

const tagSection = 'luxury-home';

const currentPath = `/tags/${tagSection}`;
const nextPath = `/tags/${tagSection}?pageNo=2`;
const expectedList = {
    listName: tagSection,
    params: {
        pageNo: 1,
        filterValue: tagSection,
        filterProperty: 'tagsDetails/urlName'
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

const expectedTagData = {
    title: tagStubData.data[0].displayName,
    urlName: tagStubData.data[0].urlName,
    nodeType: "TagSection",
    dateCreated: tagStubData.data[0].createdAt //"2016-02-16T23:15:11.480Z"
};

const expectedBody = {
    entity: expectedTagData,
    items: listingsStubData.data.slice(0, 11),
    list: expectedList
};

const tagSectionMiddleware = proxyquire('../../../../app/server/bff/middleware/tag', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntities: parseEntitiesStub
    },
    '../api/listing': {
        getLatestTeasers: getLatestTeasersSpy
    }
});

describe('tag section middleware', () => {
    const req = {
        query: {
            tag: tagSection
        },
        app: {
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
    };
    const res = {};
    const next = ()=>{};

    describe(`when receiving data`, () => {

        describe(`and tag query is not defined`, () => {
            before(()=>{
                req.query = {};
            });

            after(()=>{
                req.query.tag = tagSection;
            });

            it('should not call service urls', (done)=> {
                tagSectionMiddleware(req, res, next).then(() => {
                    expect(makeRequestSpy.called).to.be.false;
                    expect(getLatestTeasersSpy.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and tag section query is defined`, () => {

            beforeEach(()=> {
                parseEntitiesStub.reset();
            });

            it('should use the required config values for content service urls for the request', (done)=> {
                tagSectionMiddleware(req, res, next).then(() => {
                    const tagServiceUrl = `${tagServiceMockUrl}/tags/?urlName=${tagSection}`;
                    const makeRequestSpyFirstCall = makeRequestSpy.getCall(0);
                    const getLatestTeasersSpyFirstCall = getLatestTeasersSpy.getCall(0);

                    expect(makeRequestSpyFirstCall.args[0]).to.equal(tagServiceUrl);

                    expect(getLatestTeasersSpyFirstCall.args[0]).to.equal(20);
                    expect(getLatestTeasersSpyFirstCall.args[1]).to.equal(0);
                    expect(getLatestTeasersSpyFirstCall.args[2]).to.equal(tagSection);
                    expect(getLatestTeasersSpyFirstCall.args[3]).to.equal('tagsDetails/urlName');

                    done();
                }).catch(done);
            });

            it('should return all modules in the desired structure', (done)=> {

                tagSectionMiddleware(req, res, next).then(() => {
                    expect(res.body).to.deep.equal(expectedBody);
                    done();
                }).catch(done);
            });
        });
    });

});

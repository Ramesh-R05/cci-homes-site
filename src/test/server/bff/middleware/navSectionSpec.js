import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-interiors';
import listingsStubData from '../../../../stubs/listings-food-Homes-navigation-Interiors';
import galleryStubData from '../../../../stubs/listings-gallery';

const makeRequestStub = () => ({navigationTags: entityStubData.navigationTags});
const getLatestTeasersStub = () => listingsStubData;
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

parseEntityStub.returns(entityStubData);
parseEntitiesStub.onFirstCall().returns(listingsStubData.data.slice(12));
parseEntitiesStub.onSecondCall().returns(listingsStubData.data.slice(0, 12));
parseEntitiesStub.onThirdCall().returns(galleryStubData.data);

const makeRequestSpy = sinon.spy(makeRequestStub);
const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);

const entityServiceMockUrl = 'http://entitiesUrl.com';
const listingsServiceMockUrl = 'http://listingsUrl.com';
const siteMockHost = 'http://siteHost.com';

const navSection = 'interiors';

const previousPath = `/${navSection}`;
const currentPath = `/${navSection}`;
const nextPath = `/${navSection}?pageNo=2`;
const expectedList = {
    listName: navSection,
    params: {
        pageNo: 1,
        filterValue: entityStubData.navigationTags[0],
        filterProperty: 'tags'
    },
    items: [
        listingsStubData.data.slice(12)
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
}

const expectedBody = {
    entity: entityStubData,
    items: listingsStubData.data.slice(0, 12),
    list: expectedList,
    galleries: galleryStubData.data
};

const navSectionMiddleware = proxyquire('../../../../app/server/bff/middleware/navSection', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    },
    '../api/listing': {
        getLatestTeasers: getLatestTeasersSpy
    }
});

describe('navigation section middleware', () => {
    const req = {
        query: {
            navSection: navSection
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

        describe(`and navSection query is not defined`, () => {
            before(()=>{
                req.query = {};
            });

            after(()=>{
                req.query.navSection = navSection;
            });

            it('should not call service urls', (done)=> {
                navSectionMiddleware(req, res, next).then(() => {
                    expect(makeRequestSpy.called).to.be.false;
                    expect(getLatestTeasersSpy.called).to.be.false;

                    done();
                }).catch(done);
            });

        });

        describe(`and navigation section query is defined`, () => {

            beforeEach(()=> {
                parseEntitiesStub.reset();
            });

            it('should use the required config values for content service urls for the request', (done)=> {
                navSectionMiddleware(req, res, next).then(() => {
                    const entityServiceUrl = `${entityServiceMockUrl}/section/${req.query.navSection}`;
                    const galleryServiceUrl = `${listingsServiceMockUrl}/teasers?$select=*&$filter=nodeTypeAlias eq 'Gallery' and tags eq '${entityStubData.navigationTags[0]}'&$orderby=pageDateCreated desc&$top=5`;

                    expect(makeRequestSpy.firstCall.calledWith(entityServiceUrl)).to.be.true;
                    expect(makeRequestSpy.secondCall.calledWith(galleryServiceUrl)).to.be.true;
                    expect(getLatestTeasersSpy.firstCall.calledWith(21, 0, entityStubData.navigationTags[0], 'tags')).to.be.true;

                    done();
                }).catch(done);
            });

            it('should return all modules in the desired structure', (done)=> {

                navSectionMiddleware(req, res, next).then(() => {
                    expect(res.body).to.deep.equal(expectedBody);
                    done();
                }).catch(done);
            });
        });
    });

});

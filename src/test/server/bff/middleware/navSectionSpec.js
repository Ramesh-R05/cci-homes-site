import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-interiors';
import listingsStubData from '../../../../stubs/listings-food-Homes-navigation-Interiors';
import galleryStubData from '../../../../stubs/listings-gallery';
import heroStubData from '../../../../stubs/module-interiorshero';

const makeRequestStub = () => entityStubData;
const getLatestTeasersStub = () => listingsStubData;
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

const navigationTag = (entityStubData.tagsDetails || []).find((tag) => {
    return tag.name.includes('Homes navigation')
});
entityStubData.kingtag = (navigationTag && navigationTag.urlName) || '';

parseEntityStub.returns(entityStubData);
parseEntitiesStub.onFirstCall().returns(listingsStubData.data.slice(0, 11));
parseEntitiesStub.onSecondCall().returns(galleryStubData.data);

const makeRequestSpy = sinon.spy(makeRequestStub);
const getLatestTeasersSpy = sinon.spy(getLatestTeasersStub);

const entityServiceMockUrl = 'http://entitiesUrl.com';
const listingsServiceMockUrl = 'http://listingsUrl.com';
const siteMockHost = 'http://siteHost.com';

const navSection = 'interiors';
const navSectionFilter = `tagsDetails/fullName eq '${navigationTag.fullName}'`;

const expectedBody = {
    entity: entityStubData,
    items: listingsStubData.data.slice(0, 11),
    list: {
        params: {
            listName: navSection,
            basePath: `/${navSection}`,
            offset: 6,
            pageNo: 1,
            pageSize: 12,
            filter: navSectionFilter
        }
    },
    "section": {
        "id": entityStubData.id,
        "name": entityStubData.nodeName,
        "urlName": entityStubData.urlName
    },
    galleries: galleryStubData.data,
    hero: heroStubData.moduleManualContent.data[0]
};

const navSectionMiddleware = proxyquire('../../../../app/server/bff/middleware/navSection', {
    '../../makeRequest': makeRequestSpy,
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    },
    '../api/listing': getLatestTeasersSpy
});

describe('navigation section middleware', () => {
    const req = {
        query: {
            navSection: navSection
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
                    const galleryServiceUrl = `${listingsServiceMockUrl}/teasers?$select=*&$filter=nodeTypeAlias eq 'Gallery' and ${navSectionFilter}&$orderby=pageDateCreated desc&$top=5`;

                    const makeRequestSpyFirstCall = makeRequestSpy.getCall(0);
                    const makeRequestSpySecondCall = makeRequestSpy.getCall(1);
                    const getLatestTeasersSpyFirstCall = getLatestTeasersSpy.getCall(0);

                    expect(makeRequestSpyFirstCall.args[0]).to.equal(entityServiceUrl);
                    expect(makeRequestSpySecondCall.args[0]).to.equal(galleryServiceUrl);

                    expect(getLatestTeasersSpyFirstCall.args[0]).to.equal(6);
                    expect(getLatestTeasersSpyFirstCall.args[1]).to.equal(0);
                    expect(getLatestTeasersSpyFirstCall.args[2]).to.equal(navSectionFilter);

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

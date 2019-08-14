import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-interiors';
import alltagsectionsData from '../../../../stubs/entity-alltagsections';
import listingsStubData from '../../../../stubs/listings-food-Homes-navigation-Interiors';
import galleryStubData from '../../../../stubs/listings-gallery';
import heroStubData from '../../../../stubs/module-interiorshero';

const getEntityStub = sinon.stub();
const getModulesStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();
const tagToQueryStub = sinon.stub();

const navigationTag = (entityStubData.tagsDetails || []).find(tag => {
    return tag.name.includes('Homes navigation');
});
entityStubData.kingtag = (navigationTag && navigationTag.urlName) || '';

getLatestTeasersStub.returns(listingsStubData);
parseEntityStub.returns(entityStubData);
parseEntitiesStub.onFirstCall().returns(listingsStubData.data.slice(0, 11));
parseEntitiesStub.onSecondCall().returns(galleryStubData.data);

const entityServiceMockUrl = 'http://entitiesUrl.com';
const listingsServiceMockUrl = 'http://listingsUrl.com';
const siteMockHost = 'http://siteHost.com';

const navSection = 'interiors';
const navSectionFilter = `tagsDetails/fullName eq 'food_Homes_navigation_Interiors' and tagsDetails/fullName%20ne%20%27food_Homes_navigation_renovating,food_Building_Building_style_Cottage%27`;

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
    section: {
        id: entityStubData.id,
        name: entityStubData.nodeName,
        urlName: entityStubData.urlName
    },
    galleries: galleryStubData.data,
    hero: heroStubData.moduleManualContent.data[0]
};

function resetStubsAndSpies() {
    getEntityStub.reset();
    getModulesStub.reset();
    getLatestTeasersStub.reset();
}

const navSectionMiddleware = proxyquire('../../../../app/server/bff/middleware/navSection', {
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    },
    '../helper/tagToQuery': tagToQueryStub,
    '../api': {
        getLatestTeasers: getLatestTeasersStub,
        getEntity: getEntityStub,
        getModules: getModulesStub
    }
}).default;

describe('navigation section middleware', () => {
    const req = {
        query: {
            navSection
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
    const res = { body: {} };
    const next = () => {};
    const tag = navSectionFilter;
    describe(`when receiving data`, () => {
        describe(`and navSection query is not defined`, () => {
            before(() => {
                req.query = {};
                getEntityStub.withArgs(`section/${navSection}`).returns(entityStubData);
                getEntityStub.withArgs('alltagsections').returns(alltagsectionsData);
                getLatestTeasersStub
                    .withArgs(`teasers?$select=*&$filter=nodeTypeAlias eq 'Gallery' and ${tag}&$orderby=pageDateCreated desc&$top=5`)
                    .returns(listingsStubData);
                tagToQueryStub.returns(tag);
            });

            after(() => {
                resetStubsAndSpies();
            });

            it('should not call service urls', done => {
                navSectionMiddleware(req, res, next)
                    .then(() => {
                        expect(getEntityStub.called).to.be.false;
                        expect(getLatestTeasersStub.called).to.be.false;
                        expect(getModulesStub.called).to.be.false;

                        done();
                    })
                    .catch(done);
            });
        });

        describe(`and navigation section query is defined`, () => {
            before(() => {
                req.query = { navSection };
                getEntityStub.withArgs(`section/${navSection}`).returns(entityStubData);
                getEntityStub.withArgs('alltagsections').returns(alltagsectionsData);
                getLatestTeasersStub.withArgs(5, 0, `nodeTypeAlias eq 'Gallery' and ${tag}`).returns(listingsStubData);
                tagToQueryStub.returns(tag);
            });

            after(() => {
                resetStubsAndSpies();
            });
            it('should return all modules in the desired structure', done => {
                navSectionMiddleware(req, res, next)
                    .then(() => {
                        expect(res.body).to.deep.equal(expectedBody);
                        done();
                    })
                    .catch(done);
            });

            it('should use the required config values for content service urls for the request', done => {
                navSectionMiddleware(req, res, next)
                    .then(() => {
                        const entityServiceUrl = `section/${req.query.navSection}`;
                        const alltagsectionsServiceUrl = 'alltagsections';
                        const galleryServiceUrl = `nodeTypeAlias eq 'Gallery' and ${navSectionFilter}`;

                        const getEntityStubFirstCall = getEntityStub.getCall(0);
                        const getEntityStubSecondCall = getEntityStub.getCall(1);
                        const getLatestTeasersStubFirstCall = getLatestTeasersStub.getCall(0);
                        const getLatestTeasersStubSecondCall = getLatestTeasersStub.getCall(1);

                        expect(getEntityStubFirstCall.args[0]).to.equal(entityServiceUrl);
                        expect(getEntityStubSecondCall.args[0]).to.equal(alltagsectionsServiceUrl);

                        expect(getLatestTeasersStubFirstCall.args[0]).to.equal(6);
                        expect(getLatestTeasersStubFirstCall.args[1]).to.equal(0);
                        expect(getLatestTeasersStubFirstCall.args[2]).to.equal(navSectionFilter);
                        expect(getLatestTeasersStubSecondCall.args[0]).to.equal(5);
                        expect(getLatestTeasersStubSecondCall.args[1]).to.equal(0);
                        expect(getLatestTeasersStubSecondCall.args[2]).to.equal(galleryServiceUrl);

                        done();
                    })
                    .catch(done);
            });
        });
    });
});

import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
import entityStubData from '../../../../stubs/entity-belle';
import heroStubData from '../../../../stubs/module-bellehero';
import itemsStubData from '../../../../stubs/listings-belle';
import siteBrands from '../../../../app/config/siteBrands';

const getEntityStub = sinon.stub();
const getModulesStub = sinon.stub();
const getLatestTeasersStub = sinon.stub();
const parseEntityStub = sinon.stub();
const parseEntitiesStub = sinon.stub();

let heroStubDataWrapper = {
    totalCount: 1,
    data: [heroStubData]
};

const entityServiceMockUrl = 'http://entitiesUrl.com';
const moduleServiceMockUrl = 'http://moduleUrl.com';

getLatestTeasersStub.returns({ data: {} });

parseEntityStub.onFirstCall().returns(entityStubData);
parseEntityStub.onSecondCall().returns(heroStubData);
parseEntitiesStub.returns(itemsStubData);

getEntityStub.returns(entityStubData);
getModulesStub.returns(heroStubDataWrapper);

const brand = 'belle';
const brandFilter = `source eq %27${entityStubData.articleSource}%27 and nodeTypeAlias ne %27ListingGallery%27`;
const expectedBody = {
    entity: entityStubData,
    hero: heroStubData,
    items: itemsStubData,
    list: {
        params: {
            listName: brand,
            basePath: `/${brand}`,
            offset: 6,
            pageNo: 1,
            pageSize: 12,
            filter: brandFilter
        }
    }
};

const brandMiddleware = proxyquire('../../../../app/server/bff/middleware/brand', {
    '../helper/parseEntity': {
        parseEntity: parseEntityStub,
        parseEntities: parseEntitiesStub
    },
    '../api': {
        getEntity: getEntityStub,
        getLatestTeasers: getLatestTeasersStub,
        getModules: getModulesStub
    }
}).default;

describe('brand middleware', () => {
    const req = {
        query: {
            brand: 'belle'
        },
        app: {
            locals: {
                config: {
                    brands: {
                        site: siteBrands
                    },
                    services: {
                        remote: {
                            entity: entityServiceMockUrl,
                            module: moduleServiceMockUrl
                        }
                    }
                }
            }
        }
    };
    const res = {};
    const next = () => {};
    const expectedBrand = siteBrands.find(item => item.title === entityStubData.articleSource);
    const expectedHeroModuleName = `${expectedBrand.id}hero`;

    describe('when receiving data', () => {
        describe('and brand query is not defined', () => {
            let brand = req.query;

            before(() => {
                req.query = {};
            });

            after(() => {
                req.query = brand;
            });

            it('should not call service urls', done => {
                brandMiddleware(req, res, next)
                    .then(() => {
                        sinon.assert.notCalled(getEntityStub);
                        sinon.assert.notCalled(getModulesStub);
                        sinon.assert.notCalled(getLatestTeasersStub);

                        done();
                    })
                    .catch(done);
            });
        });

        describe('and brand query is defined', () => {
            it('should return all modules in the desired structure', done => {
                brandMiddleware(req, res, next)
                    .then(() => {
                        expect(res.body).to.deep.equal(expectedBody);
                        done();
                    })
                    .catch(done);
            });

            it('should use the required config values for content service urls for the request', done => {
                before(() => {
                    heroStubDataWrapper = {
                        totalCount: 1,
                        data: [heroStubData]
                    };
                });

                brandMiddleware(req, res, next)
                    .then(() => {
                        const getEntityFirstCall = getEntityStub.getCall(0);
                        const getModulesFirstCall = getModulesStub.getCall(1);
                        const getLatestTeasersStubFirstCall = getLatestTeasersStub.getCall(0);

                        expect(getEntityFirstCall.args[0]).to.equal(`section/${req.query.brand}`);
                        expect(getModulesFirstCall.args[0]).to.deep.equal([`${expectedHeroModuleName}`]);
                        expect(getLatestTeasersStubFirstCall.args[0]).to.equal(6);
                        expect(getLatestTeasersStubFirstCall.args[1]).to.equal(0);
                        expect(getLatestTeasersStubFirstCall.args[2]).to.equal(brandFilter);

                        sinon.assert.calledWith(parseEntityStub, sinon.match.has('brand', expectedBrand.id));

                        done();
                    })
                    .catch(done);
            });

            describe('when module response is empty', () => {
                const nextSpy = sinon.spy();

                before(() => {
                    heroStubDataWrapper = {};
                });

                it('should not be an error', done => {
                    brandMiddleware(req, res, nextSpy)
                        .then(() => {
                            expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                            done();
                        })
                        .catch(done);
                });
            });

            describe('when there is no hero module', () => {
                const nextSpy = sinon.spy();

                before(() => {
                    heroStubDataWrapper = {
                        totalCount: 0,
                        data: []
                    };
                });

                it('should not throw an error)', done => {
                    brandMiddleware(req, res, nextSpy)
                        .then(() => {
                            expect(nextSpy.args[0][0]).not.to.be.instanceOf(Error);
                            done();
                        })
                        .catch(done);
                });
            });
        });
    });
});

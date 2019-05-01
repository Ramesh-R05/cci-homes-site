import proxyquire, { noCallThru } from 'proxyquire';
import { locationFilterTagNames, baseQuery, defaultSortByRules } from '../../../../app/server/bff/middleware/listingsForCategory';
import MiddlewareTestFactory from '../../../utils/middlewareTestFactory';
import listingsMock from '../../../mock/listingsForCategory';
import { categoryFilterData, locationFilterData, sortByFilterData } from '../../../mock/listingFilterData';
import tagsMock from '../../../mock/tagsPost';
import listingCategoriesMock from '../../../mock/listingCategories';

noCallThru();

const getLatestTeasersStub = sinon.stub();
const getTagListFromNamesStub = sinon.stub();
const sortListingsByRuleStub = sinon.stub();
const getFilterDataStub = sinon.stub();
const parseEntitesStub = sinon.stub();
const constructListingFilterStringStub = sinon.stub();

const listingsForCategory = proxyquire('../../../../app/server/bff/middleware/listingsForCategory', {
    '../api/listing': getLatestTeasersStub,
    '../api/tag': getTagListFromNamesStub,
    '../helper/sortListingsByRule': sortListingsByRuleStub,
    '../helper/getFilterData': getFilterDataStub,
    '../helper/constructListingFilterString': constructListingFilterStringStub,
    '../helper/parseEntity': { parseEntities: parseEntitesStub }
}).default;

const MiddlewareTestWrapper = new MiddlewareTestFactory(listingsForCategory);

describe('listingsForCategory middleware', () => {
    describe('when category is present in the request query', () => {
        describe('and location is also present in the request query', () => {
            describe('and sortBy is also present in the request query', () => {
                describe(`and sortBy is 'A-Z'`, () => {
                    let testArgs;
                    let callMiddleware;
                    let result;

                    before(async () => {
                        [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                            req: {
                                query: { category: 'furniture-and-interiors', location: 'tasmania', sortBy: 'A-Z' }
                            },
                            res: { body: { listingCategories: listingCategoriesMock } }
                        });

                        const filterString = `${baseQuery} and tagsDetails/urlName eq '${testArgs.req.query.category}' and tagsDetails/urlName eq '${
                            testArgs.req.query.location
                        }'`;

                        constructListingFilterStringStub
                            .withArgs(baseQuery, testArgs.req.query.category, testArgs.req.query.location, testArgs.req.query.includeOnlineResults)
                            .returns(filterString);
                        getLatestTeasersStub.withArgs(100, 0, filterString).resolves(listingsMock);

                        getTagListFromNamesStub.withArgs(locationFilterTagNames).resolves(tagsMock);
                        sortListingsByRuleStub.withArgs(testArgs.req.query.sortBy, listingsMock.data).returnsArg(1);
                        parseEntitesStub.withArgs(listingsMock.data).returnsArg(0);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.category, testArgs.res.body.listingCategories.items)
                            .returns([testArgs.req.query.category, categoryFilterData]);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.location, tagsMock.data)
                            .returns([testArgs.req.query.location, locationFilterData]);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.sortBy, defaultSortByRules)
                            .returns([testArgs.req.query.sortBy, sortByFilterData]);

                        result = await callMiddleware();
                    });

                    after(() => {
                        getLatestTeasersStub.reset();
                        getTagListFromNamesStub.reset();
                        sortListingsByRuleStub.reset();
                        testArgs.next.reset();
                    });

                    it('adds an entity to the response body with the correct data for listingItems, listingFilters and nodetype', () => {
                        expect(result.res).to.deep.eq({
                            body: {
                                ...testArgs.res.body,
                                entity: {
                                    listingItems: listingsMock.data,
                                    nodeType: 'ListingsByCategory',
                                    url: `/directory/${testArgs.req.query.category}`,
                                    urlName: `${testArgs.req.query.category} listings`,
                                    pageTitle: `${testArgs.req.query.category} listings`,
                                    listingFilters: {
                                        categories: categoryFilterData,
                                        locations: locationFilterData,
                                        sortBy: sortByFilterData
                                    },
                                    activeFilters: {
                                        category: testArgs.req.query.category,
                                        location: testArgs.req.query.location,
                                        sortBy: testArgs.req.query.sortBy
                                    }
                                }
                            }
                        });
                    });

                    it('calls the next middleware', () => {
                        expect(testArgs.next).to.be.called;
                    });
                });

                describe(`and sortBy is 'recently-added'`, () => {
                    let testArgs;
                    let callMiddleware;
                    let result;

                    before(async () => {
                        [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                            req: {
                                query: {
                                    category: 'furniture-and-interiors',
                                    location: 'tasmania',
                                    sortBy: 'recently-added'
                                }
                            },
                            res: { body: { listingCategories: listingCategoriesMock } }
                        });

                        const filterString = `${baseQuery} and tagsDetails/urlName eq '${testArgs.req.query.category}' and tagsDetails/urlName eq '${
                            testArgs.req.query.location
                        }'`;

                        constructListingFilterStringStub
                            .withArgs(baseQuery, testArgs.req.query.category, testArgs.req.query.location, testArgs.req.query.includeOnlineResults)
                            .returns(filterString);
                        getLatestTeasersStub.withArgs(100, 0, filterString).resolves(listingsMock);

                        getTagListFromNamesStub.withArgs(locationFilterTagNames).resolves(tagsMock);

                        sortListingsByRuleStub.withArgs(testArgs.req.query.sortBy, listingsMock.data).returnsArg(1);
                        parseEntitesStub.withArgs(listingsMock.data).returnsArg(0);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.category, testArgs.res.body.listingCategories.items)
                            .returns([testArgs.req.query.category, categoryFilterData]);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.location, tagsMock.data)
                            .returns([testArgs.req.query.location, locationFilterData]);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.sortBy, defaultSortByRules)
                            .returns([testArgs.req.query.sortBy, sortByFilterData]);

                        result = await callMiddleware();
                    });

                    after(() => {
                        getLatestTeasersStub.reset();
                        getTagListFromNamesStub.reset();
                        sortListingsByRuleStub.reset();
                        testArgs.next.reset();
                    });

                    it('adds an entity to the response body with the correct data for listingItems, listingFilters and nodetype', () => {
                        expect(result.res).to.deep.eq({
                            body: {
                                ...testArgs.res.body,
                                entity: {
                                    listingItems: listingsMock.data,
                                    nodeType: 'ListingsByCategory',
                                    url: `/directory/${testArgs.req.query.category}`,
                                    urlName: `${testArgs.req.query.category} listings`,
                                    pageTitle: `${testArgs.req.query.category} listings`,
                                    listingFilters: {
                                        categories: categoryFilterData,
                                        locations: locationFilterData,
                                        sortBy: sortByFilterData
                                    },
                                    activeFilters: {
                                        category: testArgs.req.query.category,
                                        location: testArgs.req.query.location,
                                        sortBy: testArgs.req.query.sortBy
                                    }
                                }
                            }
                        });
                    });

                    it('calls the next middleware', () => {
                        expect(testArgs.next).to.be.called;
                    });
                });

                describe(`and sortBy is 'recently-updated'`, () => {
                    let testArgs;
                    let callMiddleware;
                    let result;

                    before(async () => {
                        [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                            req: {
                                query: {
                                    category: 'furniture-and-interiors',
                                    location: 'tasmania',
                                    sortBy: 'recently-updated'
                                }
                            },
                            res: { body: { listingCategories: listingCategoriesMock } }
                        });

                        const filterString = `${baseQuery} and tagsDetails/urlName eq '${testArgs.req.query.category}' and tagsDetails/urlName eq '${
                            testArgs.req.query.location
                        }'`;

                        constructListingFilterStringStub
                            .withArgs(baseQuery, testArgs.req.query.category, testArgs.req.query.location, testArgs.req.query.includeOnlineResults)
                            .returns(filterString);
                        getLatestTeasersStub.withArgs(100, 0, filterString).resolves(listingsMock);

                        getTagListFromNamesStub.withArgs(locationFilterTagNames).resolves(tagsMock);

                        sortListingsByRuleStub.withArgs(testArgs.req.query.sortBy, listingsMock.data).returnsArg(1);
                        parseEntitesStub.withArgs(listingsMock.data).returnsArg(0);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.category, testArgs.res.body.listingCategories.items)
                            .returns([testArgs.req.query.category, categoryFilterData]);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.location, tagsMock.data)
                            .returns([testArgs.req.query.location, locationFilterData]);

                        getFilterDataStub
                            .withArgs(testArgs.req.query.sortBy, defaultSortByRules)
                            .returns([testArgs.req.query.sortBy, sortByFilterData]);

                        result = await callMiddleware();
                    });

                    after(() => {
                        getLatestTeasersStub.reset();
                        getTagListFromNamesStub.reset();
                        sortListingsByRuleStub.reset();
                        testArgs.next.reset();
                    });

                    it('adds an entity to the response body with the correct data for listingItems, listingFilters and nodetype', () => {
                        expect(result.res).to.deep.eq({
                            body: {
                                ...testArgs.res.body,
                                entity: {
                                    listingItems: listingsMock.data,
                                    nodeType: 'ListingsByCategory',
                                    url: `/directory/${testArgs.req.query.category}`,
                                    urlName: `${testArgs.req.query.category} listings`,
                                    pageTitle: `${testArgs.req.query.category} listings`,
                                    listingFilters: {
                                        categories: categoryFilterData,
                                        locations: locationFilterData,
                                        sortBy: sortByFilterData
                                    },
                                    activeFilters: {
                                        category: testArgs.req.query.category,
                                        location: testArgs.req.query.location,
                                        sortBy: testArgs.req.query.sortBy
                                    }
                                }
                            }
                        });
                    });

                    it('calls the next middleware', () => {
                        expect(testArgs.next).to.be.called;
                    });
                });
            });
            describe('and sortBy is not present in the request query', () => {
                let testArgs;
                let callMiddleware;
                let result;

                before(async () => {
                    [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                        req: {
                            query: { category: 'furniture-and-interiors', location: 'location_australianstate_tasmania' }
                        },
                        res: { body: { listingCategories: listingCategoriesMock } }
                    });

                    const filterString = `${baseQuery} and tagsDetails/urlName eq '${testArgs.req.query.category}' and tagsDetails/urlName eq '${
                        testArgs.req.query.location
                    }'`;

                    constructListingFilterStringStub
                        .withArgs(baseQuery, testArgs.req.query.category, testArgs.req.query.location, testArgs.req.query.includeOnlineResults)
                        .returns(filterString);
                    getLatestTeasersStub.withArgs(100, 0, filterString).resolves(listingsMock);

                    getTagListFromNamesStub.withArgs(locationFilterTagNames).resolves(tagsMock);

                    sortListingsByRuleStub.withArgs(undefined, listingsMock.data).returnsArg(1);
                    parseEntitesStub.withArgs(listingsMock.data).returnsArg(0);

                    getFilterDataStub
                        .withArgs(testArgs.req.query.category, testArgs.res.body.listingCategories.items)
                        .returns([testArgs.req.query.category, categoryFilterData]);

                    getFilterDataStub.withArgs(testArgs.req.query.location, tagsMock.data).returns([testArgs.req.query.location, locationFilterData]);

                    getFilterDataStub.withArgs(testArgs.req.query.sortBy, defaultSortByRules).returns(['', sortByFilterData]);

                    result = await callMiddleware();
                });

                after(() => {
                    getLatestTeasersStub.reset();
                    getTagListFromNamesStub.reset();
                    sortListingsByRuleStub.reset();
                    testArgs.next.reset();
                });

                it('adds an entity to the response body with the correct data for listingItems, listingFilters and nodetype', () => {
                    expect(result.res).to.deep.eq({
                        body: {
                            ...testArgs.res.body,
                            entity: {
                                listingItems: listingsMock.data,
                                nodeType: 'ListingsByCategory',
                                url: `/directory/${testArgs.req.query.category}`,
                                urlName: `${testArgs.req.query.category} listings`,
                                pageTitle: `${testArgs.req.query.category} listings`,
                                listingFilters: {
                                    categories: categoryFilterData,
                                    locations: locationFilterData,
                                    sortBy: sortByFilterData
                                },
                                activeFilters: {
                                    category: testArgs.req.query.category,
                                    location: testArgs.req.query.location,
                                    sortBy: ''
                                }
                            }
                        }
                    });
                });

                it('calls the next middleware', () => {
                    expect(testArgs.next).to.be.called;
                });
            });
        });

        describe('and there is data for the category returned by the listing service call', () => {
            let testArgs;
            let callMiddleware;
            let result;

            before(async () => {
                [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                    req: { query: { category: 'furniture-and-interiors' } },
                    res: { body: { listingCategories: listingCategoriesMock } }
                });

                const filterString = `${baseQuery} and tagsDetails/urlName eq '${testArgs.req.query.category}'`;

                constructListingFilterStringStub
                    .withArgs(baseQuery, testArgs.req.query.category, testArgs.req.query.location, testArgs.req.query.includeOnlineResults)
                    .returns(filterString);
                getLatestTeasersStub.withArgs(100, 0, filterString).resolves(listingsMock);

                getTagListFromNamesStub.withArgs(locationFilterTagNames).resolves(tagsMock);
                sortListingsByRuleStub.withArgs(undefined, listingsMock.data).returnsArg(1);
                parseEntitesStub.withArgs(listingsMock.data).returnsArg(0);

                getFilterDataStub
                    .withArgs(testArgs.req.query.category, testArgs.res.body.listingCategories.items)
                    .returns([testArgs.req.query.category, categoryFilterData]);

                getFilterDataStub.withArgs(testArgs.req.query.location, tagsMock.data).returns(['', locationFilterData]);

                getFilterDataStub.withArgs(testArgs.req.query.sortBy, defaultSortByRules).returns(['', sortByFilterData]);

                result = await callMiddleware();
            });

            after(() => {
                getLatestTeasersStub.reset();
                getTagListFromNamesStub.reset();
                testArgs.next.reset();
            });

            it('adds an entity to the response body with the correct data for listingItems and nodetype', () => {
                expect(result.res).to.deep.eq({
                    body: {
                        ...result.res.body,
                        entity: {
                            listingItems: listingsMock.data,
                            nodeType: 'ListingsByCategory',
                            url: `/directory/${testArgs.req.query.category}`,
                            urlName: `${testArgs.req.query.category} listings`,
                            pageTitle: `${testArgs.req.query.category} listings`,
                            listingFilters: {
                                categories: categoryFilterData,
                                locations: locationFilterData,
                                sortBy: sortByFilterData
                            },
                            activeFilters: {
                                category: testArgs.req.query.category,
                                location: '',
                                sortBy: ''
                            }
                        }
                    }
                });
            });

            it('calls the next middleware', () => {
                expect(testArgs.next).to.be.called;
            });
        });

        describe('and an error is thrown by the listing service call or the tag service call', () => {
            let testArgs;
            let mockError;
            let callMiddleware;

            before(async () => {
                [testArgs, callMiddleware] = await MiddlewareTestWrapper({ req: { query: { category: 'furniture-and-interiors' } } });
                mockError = new Error('something went wrong');
                getLatestTeasersStub.throws(mockError);

                await callMiddleware();
            });

            after(() => {
                getLatestTeasersStub.reset();
            });

            afterEach(() => {
                testArgs.next.reset();
            });

            it('calls the next middleware with the thrown error object', () => {
                expect(testArgs.next).to.be.calledWith(mockError);
            });
        });
    });
});

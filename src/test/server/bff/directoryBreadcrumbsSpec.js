import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const articleMiddleware = proxyquire('../../../app/server/bff/directoryBreadcrumbs', {}).default;

describe('Directory Bread Crumbs Middleware', () => {
    describe('Given a node type of ListingsByCategory', () => {
        let req, res, next;

        before(() => {
            req = {};
            res = {
                body: {
                    entity: {
                        nodeType: 'ListingsByCategory',
                        activeFilters: {
                            category: 'url-1'
                        }
                    },
                    listingCategories: {
                        items: [
                            {
                                urlName: 'url-1',
                                displayName: 'name-1'
                            },
                            {
                                urlName: 'url-2',
                                displayName: 'name-2'
                            },
                            {
                                urlName: 'url-3',
                                displayName: 'name-3'
                            }
                        ]
                    }
                }
            };
            next = () => {};
            articleMiddleware(req, res, next);
        });

        it('should alter resp such that it has an appropriate breadcrumbs value', () => {
            expect(res).to.deep.equal({
                body: {
                    entity: {
                        nodeType: 'ListingsByCategory',
                        activeFilters: {
                            category: 'url-1'
                        },
                        breadcrumbs: [
                            {
                                title: 'directory',
                                url: '/directory'
                            },
                            {
                                title: 'name-1',
                                url: '/directory'
                            }
                        ]
                    },
                    listingCategories: {
                        items: [
                            {
                                urlName: 'url-1',
                                displayName: 'name-1'
                            },
                            {
                                urlName: 'url-2',
                                displayName: 'name-2'
                            },
                            {
                                urlName: 'url-3',
                                displayName: 'name-3'
                            }
                        ]
                    }
                }
            });
        });
    });

    describe('Given a node type of ListingsByCategory', () => {
        let req, res, next;

        before(() => {
            req = {};
            res = {
                body: {
                    entity: {
                        nodeType: 'StandardListing',
                        tagsDetails: [
                            {
                                urlName: 'url-1',
                                displayName: 'name-1',
                                name: 'name-1'
                            },
                            {
                                urlName: 'url-2',
                                displayName: 'name-2',
                                name: 'name-2-listing:category'
                            },
                            {
                                urlName: 'url-3',
                                displayName: 'name-3',
                                name: 'name-3'
                            }
                        ]
                    }
                }
            };
            next = () => {};
            articleMiddleware(req, res, next);
        });

        it('should alter resp such that it has an appropriate breadcrumbs value', () => {
            expect(res).to.deep.equal({
                body: {
                    entity: {
                        nodeType: 'StandardListing',
                        tagsDetails: [
                            {
                                urlName: 'url-1',
                                displayName: 'name-1',
                                name: 'name-1'
                            },
                            {
                                urlName: 'url-2',
                                displayName: 'name-2',
                                name: 'name-2-listing:category'
                            },
                            {
                                urlName: 'url-3',
                                displayName: 'name-3',
                                name: 'name-3'
                            }
                        ],
                        breadcrumbs: [
                            {
                                title: 'directory',
                                url: '/directory'
                            },
                            {
                                title: 'name-2',
                                url: '/url-2'
                            }
                        ]
                    }
                }
            });
        });
    });
});

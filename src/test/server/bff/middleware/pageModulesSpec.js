import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

let getModulesStub = () => {};
const parseEntityStub = () => {};
let parseEntitiesStub = () => {};
const getThemeModuleForQueryStub = () => 'hometheme';

const pageModulesMiddleware = proxyquire('../../../../app/server/bff/middleware/pageModules', {
    '../helper/parseEntity': {
        parseEntity: (...args) => parseEntityStub(...args),
        parseEntities: (...args) => parseEntitiesStub(...args)
    },
    '../helper/getThemeModuleForQuery': getThemeModuleForQueryStub,
    '../api/module': () => getModulesStub(),
    '../../../../logger': { error() {} }
});

describe('PageModules middleware', () => {
    let res = {};
    const module = [];
    let req = {};
    let next;

    describe('when the response is valid', () => {
        before(() => {
            next = sinon.spy();
            getModulesStub = sinon.stub().resolves({ headernavigation: module });
        });

        after(() => {
            req = {};
            res = {};
        });

        it('should set `req.data.headernavigation` to equal the response', done => {
            pageModulesMiddleware(req, res, next)
                .then(() => {
                    expect(req.data).to.deep.eq({ headernavigation: module });
                    expect(next).to.be.called;
                    done();
                })
                .catch(done);
        });
    });

    describe('processing module data', () => {
        describe('when data contains `headernavigation`', () => {
            const headernavigation = ['Nav item 1', 'Nav Item 2'];
            before(() => {
                req = {
                    data: {
                        headernavigation
                    }
                };
                res = {};

                next = sinon.spy();
                parseEntitiesStub = sinon.stub().returns(headernavigation);
                getModulesStub = sinon.stub().resolves({ headernavigation });
            });

            after(() => {
                res = {};
                req = {};
            });

            it('should set `res.body.headerNavigation`', done => {
                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(parseEntitiesStub).to.have.been.calledWith(headernavigation, { contentTitle: 'name' });
                        expect(res.body.headerNavigation).to.deep.equal({ items: headernavigation });
                        done();
                    })
                    .catch(done);
            });
            describe('when an item has more than 1 tag', () => {
                let mockModuleContent;
                let req;
                let res;

                before(() => {
                    req = {
                        data: {
                            headernavigation
                        }
                    };
                    res = {};

                    mockModuleContent = [
                        {
                            tagsDetails: [
                                {
                                    displayName: 'testTag foo 1',
                                    urlName: 'test tag foo qux'
                                }
                            ]
                        },
                        {
                            tagsDetails: [
                                {
                                    displayName: 'couches',
                                    urlName: '/couches'
                                },
                                {
                                    displayName: 'driveways',
                                    urlName: '/driveways'
                                },
                                {
                                    displayName: 'homes',
                                    urlName: '/homes'
                                },
                                {
                                    displayName: 'kitchen',
                                    urlName: '/kitchen'
                                }
                            ]
                        }
                    ];
                    next = sinon.spy();
                    parseEntitiesStub = sinon.stub().returns(mockModuleContent);
                    getModulesStub = sinon.stub().resolves({ headernavigation });
                });

                after(() => {
                    res = {};
                    req = {};
                });

                it('adds a subsections key to res.body.headerNavigation', done => {
                    const expectedResult = [
                        mockModuleContent[0],
                        {
                            ...mockModuleContent[1],
                            subsections: [
                                {
                                    contentTitle: 'couches',
                                    url: '/couches'
                                },
                                {
                                    contentTitle: 'driveways',
                                    url: '/driveways'
                                },
                                {
                                    contentTitle: 'homes',
                                    url: '/homes'
                                },
                                {
                                    contentTitle: 'kitchen',
                                    url: '/kitchen'
                                }
                            ]
                        }
                    ];

                    pageModulesMiddleware(req, res, next)
                        .then(() => {
                            expect(parseEntitiesStub).to.have.been.calledWith(headernavigation, { contentTitle: 'name' });
                            expect(res.body.headerNavigation).to.deep.equal({ items: expectedResult });
                            done();
                        })
                        .catch(done);
                });
            });
        });
        describe('when data contains `hamburgernavigation`', () => {
            const homeRoute = { name: 'Home', url: '/' };
            const hamburgernavigation = ['Nav item 1', 'Nav Item 2'];

            before(() => {
                req = {
                    data: {
                        hamburgernavigation
                    },
                    query: {
                        url: '/'
                    }
                };
                res = {};
                next = sinon.spy();
                parseEntitiesStub = sinon.stub().returns(hamburgernavigation);
                getModulesStub = sinon.stub().resolves({ hamburgernavigation });
            });

            after(() => {
                res = {};
                req = {};
            });

            it('should set `res.body.hamburgernavigation`', done => {
                const expectedItems = [homeRoute, ...hamburgernavigation];
                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(parseEntitiesStub).to.have.been.calledWith(hamburgernavigation, { contentTitle: 'name' });
                        expect(res.body.hamburgerNavigation).to.deep.equal({ items: expectedItems });
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });

            it('should prepend the home route to the hamburgernavigation items', done => {
                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(parseEntitiesStub).to.have.been.calledWith(hamburgernavigation, { contentTitle: 'name' });
                        expect(res.body.hamburgerNavigation.items[0]).to.deep.equal(homeRoute);
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });
        });

        describe('when there is a theme module', () => {
            const hometheme = { name: 'homeTheme' };

            before(() => {
                req = {
                    data: {
                        hometheme
                    }
                };
                res = {};
                next = sinon.spy();
                getModulesStub = sinon.stub().resolves({ hometheme });
            });

            after(() => {
                res = {};
                req = {};
            });

            it('sets a theme property on the response body', done => {
                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(res.body.theme).to.deep.equal(hometheme);
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });
        });

        describe('when getModules response is empty', () => {
            before(() => {
                next = sinon.spy();
                getModulesStub = sinon.stub().resolves({});
                parseEntitiesStub = sinon.stub();
            });

            after(() => {
                res = {};
                req = {};
            });

            it('should not add any new properties to `res.body`', done => {
                const expected = {
                    body: {}
                };

                pageModulesMiddleware(req, res, next)
                    .then(() => {
                        expect(parseEntitiesStub).to.have.not.be.called;
                        expect(res).to.deep.equal(expected);
                        expect(next).to.be.called;
                        done();
                    })
                    .catch(done);
            });
        });
    });
});

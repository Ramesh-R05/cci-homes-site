import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
import itemsStubData from '../../../../stubs/listings-food-Homes-navigation-DIY';

const getLatestTeasersStub = sinon.stub();
const parseEntitiesStub = sinon.stub().returns(itemsStubData);

const expectedBody = {
    entity: {
        nodeType: 'HomesArticle',
        tags: [
            'food:Garden/Outdoor:Garden style:Tropical garden',
            'food:Garden/Outdoor:Garden style:Coastal garden',
            'food:Homes navigation:DIY',
            'food:Topic:In focus'
        ]
    },
    leftHandSide: { items: itemsStubData }
};

const articleMiddleware = proxyquire('../../../../app/server/bff/middleware/article', {
    '../helper/parseEntity': {
        parseEntities: parseEntitiesStub
    },
    '../api': {
        getLatestTeasers: getLatestTeasersStub
    }
}).default;

function resetStubsAndSpies() {
    getLatestTeasersStub.reset();
}

const getMockEntity = () => ({
    nodeType: 'HomesArticle',
    tags: [
        'food:Garden/Outdoor:Garden style:Tropical garden',
        'food:Garden/Outdoor:Garden style:Coastal garden',
        'food:Homes navigation:DIY & Craft',
        'food:Topic:In focus'
    ]
});

describe('article middleware', () => {
    const req = {};
    const next = () => {};
    const navQueryTag = 'diy-and-craft';

    describe('when there is an entity', () => {
        describe('and entity is of nodetype homes article', () => {
            describe('and entity has tags', () => {
                describe(`when tags are of type navigation`, () => {
                    let res;

                    beforeEach(() => {
                        res = {
                            body: {
                                entity: {
                                    ...getMockEntity()
                                },
                                leftHandSide: { items: itemsStubData }
                            }
                        };
                    });

                    afterEach(() => {
                        resetStubsAndSpies();
                    });

                    it('should get the 20 latest homes articles matching the navigation tag', done => {
                        articleMiddleware(req, res, next)
                            .then(() => {
                                expect(getLatestTeasersStub.firstCall.calledWith(20, 0, `tagsDetails/urlName eq %27${navQueryTag}%27`)).to.be.true;
                                done();
                            })
                            .catch(done);
                    });
                    it('should set the left hand side data using the tags from the entity', done => {
                        articleMiddleware(req, res, next)
                            .then(() => {
                                expect(res.body.leftHandSide).to.deep.equal(expectedBody.leftHandSide);
                                done();
                            })
                            .catch(done);
                    });
                });
                describe('when tags are not of type navigation', () => {
                    let res;

                    before(() => {
                        res = {
                            body: {
                                entity: {
                                    ...getMockEntity(),
                                    tags: ['food:Topic:In focus']
                                }
                            }
                        };
                    });

                    after(() => {
                        resetStubsAndSpies();
                    });

                    it('should get the 20 latest homes articles or galleries', done => {
                        articleMiddleware(req, res, next)
                            .then(() => {
                                expect(
                                    getLatestTeasersStub.firstCall.calledWith(
                                        20,
                                        0,
                                        `nodeTypeAlias eq %27HomesArticle%27 or nodeTypeAlias eq %27Gallery%27`
                                    )
                                ).to.be.true;
                                done();
                            })
                            .catch(done);
                    });
                });
            });
            describe('and entity has no tags', () => {
                let res = {};

                before(() => {
                    res = {
                        body: {
                            entity: {
                                ...getMockEntity(),
                                tags: []
                            }
                        }
                    };
                });

                after(() => {
                    resetStubsAndSpies();
                });

                it('should get the 20 latest homes articles or galleries', done => {
                    articleMiddleware(req, res, next)
                        .then(() => {
                            expect(
                                getLatestTeasersStub.firstCall.calledWith(
                                    20,
                                    0,
                                    `nodeTypeAlias eq %27HomesArticle%27 or nodeTypeAlias eq %27Gallery%27`
                                )
                            ).to.be.true;
                            done();
                        })
                        .catch(done);
                });
            });
        });

        describe('and entity is of of another nodetype', () => {
            let res = {};

            before(() => {
                res = {
                    body: {
                        entity: {
                            ...getMockEntity(),
                            nodeType: 'Something',
                            tags: ['food:Topic:In focus']
                        }
                    }
                };
            });

            after(() => {
                resetStubsAndSpies();
            });

            it('should not get the latest teasers', done => {
                articleMiddleware(req, res, next)
                    .then(() => {
                        expect(getLatestTeasersStub.called).to.be.false;
                        done();
                    })
                    .catch(done);
            });
        });
    });
});

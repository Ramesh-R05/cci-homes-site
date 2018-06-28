import proxyquire, { noCallThru } from 'proxyquire';

noCallThru();

let makeRequestStub = (args) => {};

const remoteListingUrl = 'http://remoteSearchUrl.com/api';
const configStub = {
    services: { remote: { search: remoteListingUrl } }
};

const getSearchResults = proxyquire('../../../../app/server/bff/api/search', {
    '../../makeRequest': args => makeRequestStub(args),
    '../../../config': configStub,
    '../../../../logger': { error() {} }
});

describe('SearchAPI', () => {
    describe('#getSearchResults()', () => {
        const searchData = {
            total: 8,
            results: [
                {
                    id: 'GT-2224',
                    title: 'Recipes of China: Jiangsu’s Squirrel-shaped Mandarin Fish',
                    dateCreated: '2018-02-20T22:42:47.00Z',
                    imageAltText: 'Recipes of China: Jiangsu’s Squirrel-shaped Mandarin Fish',
                    imageCaption: 'Recipes of China: Jiangsu’s Squirrel-shaped Mandarin Fish',
                    imageUrl: '/api/asset?url=http%3A%2F%2Fdev.assets.cougar.bauer-media.net.au%2Fs3%2Fdigital-cougar-assets-dev%2FGt%2F2018%2F02%2F20%2F1446%2FRecipes-of-China-Squirrel-shaped-Mandarin-Fish-from-Jiangsu-top---Copy.jpg',
                    nodeType: 'Recipe',
                    summary: 'Healthy chicken meal',
                    url: '/recipes/healthy-recipes/jiangsus-squirrel-shaped-mandarin-fish-1-2224',
                    parentName: 'Healthy Recipes',
                    parentUrl: '/recipes/healthy-recipes',
                    tagsDetails: [
                        {
                            name: 'food:Dish type:Soup',
                            urlName: 'soup',
                            fullName: 'food_Dish_type_Soup',
                            displayName: 'Soup'
                        },
                        {
                            name: 'celebrities:celebrity:Kate Fisher',
                            urlName: 'kate-fisher',
                            fullName: 'celebrities_celebrity_kate_fisher',
                            displayName: 'Kate Fisher'
                        },
                        {
                            name: 'film:actor:Amanda Seyfried',
                            urlName: 'amanda-seyfried',
                            fullName: 'film_actor_Amanda_Seyfried',
                            displayName: 'Amanda Seyfried'
                        },
                        {
                            name: 'food:Cuisine:Chinese',
                            urlName: 'chinese',
                            fullName: 'food_Cuisine_Chinese',
                            displayName: 'Chinese'
                        }
                    ]
                }, {
                    id: 'GT-2224',
                    title: 'Recipes of China: Jiangsu’s Squirrel-shaped Mandarin Fish',
                    dateCreated: '2018-02-20T22:42:47.00Z',
                    imageAltText: 'Recipes of China: Jiangsu’s Squirrel-shaped Mandarin Fish',
                    imageCaption: 'Recipes of China: Jiangsu’s Squirrel-shaped Mandarin Fish',
                    imageUrl: '/api/asset?url=http%3A%2F%2Fdev.assets.cougar.bauer-media.net.au%2Fs3%2Fdigital-cougar-assets-dev%2FGt%2F2018%2F02%2F20%2F1446%2FRecipes-of-China-Squirrel-shaped-Mandarin-Fish-from-Jiangsu-top---Copy.jpg',
                    nodeType: 'Recipe',
                    summary: 'Healthy chicken meal',
                    url: '/recipes/healthy-recipes/jiangsus-squirrel-shaped-mandarin-fish-1-2224',
                    parentName: 'Healthy Recipes',
                    parentUrl: '/recipes/healthy-recipes',
                    tagsDetails: [
                        {
                            name: 'food:Dish type:Soup',
                            urlName: 'soup',
                            fullName: 'food_Dish_type_Soup',
                            displayName: 'Soup'
                        },
                        {
                            name: 'celebrities:celebrity:Kate Fisher',
                            urlName: 'kate-fisher',
                            fullName: 'celebrities_celebrity_kate_fisher',
                            displayName: 'Kate Fisher'
                        },
                        {
                            name: 'film:actor:Amanda Seyfried',
                            urlName: 'amanda-seyfried',
                            fullName: 'film_actor_Amanda_Seyfried',
                            displayName: 'Amanda Seyfried'
                        },
                        {
                            name: 'food:Cuisine:Chinese',
                            urlName: 'chinese',
                            fullName: 'food_Cuisine_Chinese',
                            displayName: 'Chinese'
                        }
                    ]
                }
            ]
        };

        let size = 2;
        let from = 0;
        let query = 'chicken';
        let searchQuery;

        beforeEach(() => {
            makeRequestStub = sinon.stub().resolves(searchData);
        });

        describe('when the getSearchResults method is called', () => {
            describe('and the query contains size, from and query values', () => {
                before(() => {
                    searchQuery = `?q=${query}&size=${size}&from=${from}`;
                });

                it(`should call makeRequest with ${remoteListingUrl}/${searchQuery}`, (done) => {
                    getSearchResults(size, from, query).then(() => {
                        expect(makeRequestStub).to.be.calledWith(`${remoteListingUrl}/${searchQuery}`);
                        done();
                    }).catch(done);
                });
            });

            describe('and the query is empty', () => {
                before(() => {
                    searchQuery = `?q=&size=${size}&from=${from}`;
                });

                it(`should call makeRequest with the default query `, (done) => {
                    getSearchResults(size, from, '').then((value) => {
                        expect(makeRequestStub).to.be.calledWith(`${remoteListingUrl}/${searchQuery}`);
                        done();
                    }).catch(done);
                });
            });

            describe('and the search remote returns a list in the response', () => {
                it(`should return the search data`, (done) => {
                    getSearchResults(size, from, query).then((value) => {
                        expect(value).to.deep.eq(searchData);
                        done();
                    }).catch(done);
                });
            });

            describe('and the search returns an error response', () => {
                const rejectedResponse = {
                    total: 0,
                    results: []
                };

                beforeEach(() => {
                    makeRequestStub = sinon.stub().rejects(rejectedResponse);
                });

                it('should return an empty array object', (done) => {
                    getSearchResults(size, from, query).then((value) => {
                        expect(value).to.deep.eq(rejectedResponse);
                        done();
                    }).catch(done);
                });
            });
        });
    });
});

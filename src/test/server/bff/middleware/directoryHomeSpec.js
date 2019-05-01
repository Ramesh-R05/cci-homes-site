import MiddlewareTestFactory from '../../../utils/middlewareTestFactory';
import DirectoryHome from '../../../../app/server/bff/middleware/directoryHome';
import listingCategoriesMock from '../../../mock/listingCategories';

const MiddlewareTestWrapper = new MiddlewareTestFactory(DirectoryHome);

describe('DirectoryHome middleware', () => {
    describe('when category is present in request query', () => {
        let testArgs;
        let callMiddleware;
        let result;

        before(async () => {
            [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                req: { query: { category: 'furniture-and-interiors' } },
                res: { body: {} }
            });
            result = await callMiddleware();
        });

        it('does not modify the response or request objects', () => {
            expect(result).to.deep.eq({
                res: testArgs.res,
                req: testArgs.req
            });
        });

        it('calls next middleware', () => {
            expect(testArgs.next).to.be.called;
        });
    });
    describe('when category is not present in request query', () => {
        let testArgs;
        let callMiddleware;
        let result;

        before(async () => {
            [testArgs, callMiddleware] = await MiddlewareTestWrapper({
                req: { query: {} },
                res: {
                    body: {
                        listingCategories: {
                            items: listingCategoriesMock
                        }
                    }
                }
            });
            result = await callMiddleware();
        });

        it('adds the entity with nodeType title, and listingCategories to the response object', () => {
            expect(result.res).to.deep.eq({
                body: {
                    ...testArgs.res.body,
                    entity: {
                        nodeType: 'DirectoryHome',
                        title: 'Directory',
                        url: '/directory',
                        tagsDetails: [
                            {
                                name: 'food:Homes navigation:Directory',
                                urlName: 'directory',
                                fullName: 'food_Homes_navigation_directory',
                                displayName: 'Directory'
                            }
                        ],
                        categories: testArgs.res.body.listingCategories.items
                    }
                }
            });
        });

        it('does not modify the request object', () => {
            expect(result.req).to.deep.eq(testArgs.req);
        });

        it('calls next middleware', () => {
            expect(testArgs.next).to.be.called;
        });
    });
});

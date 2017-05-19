import get from 'lodash/object/get';
import headerMetaMiddleware from '../../../../app/server/bff/middleware/headerMeta';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

describe('HeaderMeta middleware', () => {
    let currentEnv;
    const configStub = { site: { prodDomain: 'www.homestolove.com.au' } };
    const config = { ...configStub, gtm: { masthead: 'dolly' } };
    let res = {};
    let req = { app: { locals: { config } } };
    const baseEntityInput = {
        nodeName: 'node name',
        pageCanonicalUrl: 'http://example.com/',
        gtmGroupingCategory: 'grouping category',
        pageHrefLang: 'page href lang'
    };
    const baseHeaderMetaDataOutput = {
        pageName: baseEntityInput.nodeName,
        canonicalUrl: baseEntityInput.pageCanonicalUrl,
        GroupingCategory: baseEntityInput.gtmGroupingCategory,
        hrefLang: baseEntityInput.pageHrefLang
    };
    let next;

    afterEach(() => {
        process.env.NODE_ENV = currentEnv;
    });

    beforeEach(() => {
        currentEnv = get(process, 'env.NODE_ENV');
        next = sinon.spy();
    });

    describe(`when there is no NODE_ENV set and is not on prod domain` , () => {

        beforeEach(() => {
            process.env.NODE_ENV = '';
            res = { body: {} };
            req.query = { hostname: 'dev.url.com' };
        });

        describe('and there is an entity object', () => {
            describe('that contains the summary and title', () => {
                const title = 'Title';
                const summary = 'Summary';

                beforeEach(() => {
                    res.body.entity = {
                        ...baseEntityInput,
                        summary, title
                    };
                    headerMetaMiddleware(req, res, next);
                });

                it(`should set the response body to contain 'headerMetaData' and updated entity object`, () => {
                    const expectedPageMetaDescription = `${title}, ${summary}`;
                    expect(res.body).to.deep.eq({
                        entity: {
                            ...baseEntityInput,
                            summary,
                            title,
                            pageTitle: title,
                            pageMetaDescription: expectedPageMetaDescription
                        },
                        headerMetaData: {
                            ...baseHeaderMetaDataOutput,
                            googleTagManagerEnvironment: 'development',
                            googleTagManagerMasthead: config.gtm.masthead,
                            robots: 'NOINDEX,NOFOLLOW',
                            title: title,
                            pageDescription: expectedPageMetaDescription
                        }
                    });
                });

                it(`should have called next`, () => {
                    expect(next).to.have.been.called;
                });
            });
        });

        describe('that contains required fields', () => {
            const title = 'Title';
            const pageTitle = 'SEO TITLE';
            const summary = 'Summary';
            const pageMetaDescription = 'SEO DESCRIPTION';

            beforeEach(() => {
                res.body.entity = {
                    ...baseEntityInput,
                    summary, title, pageTitle, pageMetaDescription
                };
                headerMetaMiddleware(req, res, next);
            });

            it(`should set the req data object to contain 'headerMetaData' and updated entity object`, () => {
                expect(res.body).to.deep.eq({
                    entity: {
                        ...baseEntityInput,
                        summary,
                        title,
                        pageTitle,
                        pageMetaDescription
                    },
                    headerMetaData: {
                        ...baseHeaderMetaDataOutput,
                        googleTagManagerEnvironment: 'development',
                        googleTagManagerMasthead: config.gtm.masthead,
                        robots: 'NOINDEX,NOFOLLOW',
                        pageDescription: pageMetaDescription,
                        title: pageTitle
                    }
                });
            });

            it(`should have called next`, () => {
                expect(next).to.have.been.called;
            });
        });
    });

    describe(`when NODE_ENV equals to 'production' and is not on prod domain` , () => {
        const pageMetaDescription = "page meta desc";
        const pageTitle = "a page title";

        beforeEach(() => {
            process.env.NODE_ENV = 'production';
            res = { body: { entity: {
                ...baseEntityInput,
                pageMetaDescription, pageTitle
            } } };
            req.query = { hostname: 'prelive.url.com' };
            headerMetaMiddleware(req, res, next);
        });

        it(`should set the req data object to contain 'headerMetaData' object`, () => {
            expect(res.body).to.deep.eq({
                entity: {
                    ...baseEntityInput,
                    pageMetaDescription, pageTitle
                },
                headerMetaData: {
                    ...baseHeaderMetaDataOutput,
                    googleTagManagerEnvironment: 'production',
                    googleTagManagerMasthead: config.gtm.masthead,
                    robots: 'NOINDEX,NOFOLLOW',
                    pageDescription: pageMetaDescription,
                    title: pageTitle
                }
            });
        });

        it(`should have called next`, () => {
            expect(next).to.have.been.called;
        });
    });

    describe(`when NODE_ENV equals to 'production' and is on prod domain` , () => {
        const pageMetaDescription = "page meta desc";
        const pageTitle = "a page title";

        describe(`and is not the preview site` , () => {
            beforeEach(() => {
                process.env.NODE_ENV = 'production';
                res = { body: { entity: {
                    ...baseEntityInput,
                    pageMetaDescription, pageTitle
                } } };
                req.query = { hostname: configStub.site.prodDomain };
                headerMetaMiddleware(req, res, next);
            });

            it(`should set the req data object to contain 'headerMetaData' object`, () => {
                expect(res.body).to.deep.eq({
                    entity: {
                        ...baseEntityInput,
                        pageMetaDescription, pageTitle
                    },
                    headerMetaData: {
                        ...baseHeaderMetaDataOutput,
                        googleTagManagerEnvironment: 'production',
                        googleTagManagerMasthead: config.gtm.masthead,
                        robots: 'INDEX,FOLLOW',
                        pageDescription: pageMetaDescription,
                        title: pageTitle
                    }
                });
            });

            it(`should have called next`, () => {
                expect(next).to.have.been.called;
            });
        });

        describe(`and is the preview site` , () => {
            beforeEach(() => {
                process.env.NODE_ENV = 'production';
                req.query = { hostname: configStub.site.prodDomain, preview: 'preview' };
                headerMetaMiddleware(req, res, next);
            });

            it(`should set the robots to NOINDEX,NOFOLLOW`, () => {
                expect(res.body.headerMetaData.robots).to.eq('NOINDEX,NOFOLLOW');
            });

            it(`should have called next`, () => {
                expect(next).to.have.been.called;
            });
        });
    });
});

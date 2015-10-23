import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';
import breakpoints from '../../../app/breakpoints';
import _ from 'lodash';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const AdStub = Context.createStubComponent();
const NativeAdStub = Context.createStubComponent();
const HeaderStub = Context.createStubComponent();
const FooterStub = Context.createStubComponent();
const ContentBody = Context.createStubComponent();
const RecommendationsStub = Context.createStubComponent();
const RelatedContentComponentStub = Context.createStubComponent();
const SchemaArticleStub = Context.createStubComponentWithChildren();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};

const Article = proxyquire('../../../app/components/article/article', {
    'react': React,
    'react/addons': React,
    './header': HeaderStub,
    './footer': FooterStub,
    '@bxm/recommendations/lib/components/recommendations': RecommendationsStub,
    '@bxm/article/lib/components/schema/article': SchemaArticleStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/nativeAd': NativeAdStub,
    '@bxm/ui/lib/markdown/components/contentBody': ContentBody,
    '@bxm/ui/lib/to-love/stores/staticConfigurationStore': staticConfigurationStoreStub,
    './relatedContent': RelatedContentComponentStub
});

describe(`Article Component`, () => {
    const imageUrl = 'http://www.imageUrl.com/image.jpg';
    const dateCreated = 'today';
    const articleClassName = `article`;
    const title = articleMock.title;
    const contentBody = articleMock.body;
    const contentBodyClass = `article__body article__body--top-border`;
    const source = articleMock.source;
    const summary = articleMock.summary;
    const tags = articleMock.tags;
    const adKeywords = ['Garden planner', 'Outdoor', 'Garden'];
    const className = `test-article`;
    const classThemeName = `theme-australian_house_and_garden`;
    const allowedThemeClasses = ['theme-australian_house_and_garden', 'theme-real_living', 'theme-homes_', 'theme-belle'];
    const authorProfiles = articleMock.authorProfiles;
    const heroItem = {
        imageUrl: articleMock.imageUrl,
        imageAltText: articleMock.imageAltText,
        imageCaption: articleMock.imageCaption
    };

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: { foo: `bar` }
    };

    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        let topAdSub;
        let bottomAdSub;
        let nativeAdSub;
        let headerSub;
        let contentBodySub;
        let footerSub;
        let schemaArticleStub;
        let recommendationsStub;

        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Article, {
                authorProfiles, className, contentBody, dateCreated, imageUrl, heroItem, source, summary, tags, title
            }, [contextConfigStub]);

            const adSubs = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            topAdSub = adSubs[0];
            bottomAdSub = adSubs[1];
            nativeAdSub = TestUtils.findRenderedComponentWithType(reactModule, NativeAdStub);
            headerSub = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            contentBodySub = TestUtils.findRenderedComponentWithType(reactModule, ContentBody);
            footerSub = TestUtils.findRenderedComponentWithType(reactModule, FooterStub);
            schemaArticleStub = TestUtils.findRenderedComponentWithType(reactModule, SchemaArticleStub);
            recommendationsStub = TestUtils.findRenderedComponentWithType(reactModule, RecommendationsStub);
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(articleClassName);
        });

        it(`should render the component with class "${className}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(className);
        });

        it(`should render the component with class theme "${classThemeName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(classThemeName);
        });

        it(`should render the component with class theme in this list : "${allowedThemeClasses}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            const intersect = _.intersection(classNames, allowedThemeClasses);
            expect(intersect.length).to.eq(1);
        });

        it(`should render the key article sub-components on the page`, () => {
            expect(topAdSub).to.exist;
            expect(nativeAdSub).to.exist;
            expect(headerSub).to.exist;
            expect(contentBodySub).to.exist;
            expect(footerSub).to.exist;
            expect(schemaArticleStub).to.exist;
            expect(recommendationsStub).to.exist;
        });

        describe(`Top ad sub-component`, () => {
            const className = 'ad--article-top';
            const displayFor = ['medium', 'large', 'xlarge'];
            const sizes = {
                small: 'banner',
                banner: 'banner',
                leaderboard: 'leaderboard',
                railBanner: 'banner',
                railLeaderboard: 'leaderboard',
                xlarge: ['billboard', 'leaderboard']
            };
            const targets = {
                brand: source,
                keyword: adKeywords,
                position: 1,
                kingtag: 'Outdoor'
            };

            it(`should have className "${className}"`, () => {
                expect(topAdSub.props.className).to.eq(className);
            });

            it(`should have displayFor array`, () => {
                expect(topAdSub.props.displayFor).to.eql(displayFor);
            });

            it(`should have sizes object`, () => {
                expect(topAdSub.props.sizes).to.eql(sizes);
            });

            it(`should have targets object "${targets}"`, () => {
                expect(topAdSub.props.targets).to.eql(targets);
            });
        });

        describe(`Bottom ad sub-component`, () => {
            const className = 'ad--article-beneath-recommendations';
            const displayFor = ['small', 'medium', 'large', 'xlarge'];
            const sizes = {
                small: 'banner',
                banner: 'banner',
                leaderboard: 'leaderboard',
                railBanner: 'banner',
                railLeaderboard: 'leaderboard',
                xlarge: ['billboard', 'leaderboard']
            };
            const targets = {
                brand: source,
                keyword: adKeywords,
                position: 2,
                kingtag: 'Outdoor'
            };

            it(`should have className "${className}"`, () => {
                expect(bottomAdSub.props.className).to.eq(className);
            });

            it(`should have displayFor array`, () => {
                expect(bottomAdSub.props.displayFor).to.eql(displayFor);
            });

            it(`should have sizes object`, () => {
                expect(bottomAdSub.props.sizes).to.eql(sizes);
            });

            it(`should have targets obj "${targets}"`, () => {
                expect(bottomAdSub.props.targets).to.eql(targets);
            });
        });

        describe(`Native ad sub-component`, () => {
            const displayFor = ['medium', 'large', 'xlarge'];

            it(`should have displayFor array`, () => {
                expect(nativeAdSub.props.displayFor).to.eql(displayFor);
            });
        });

        describe(`SchemaArticle sub-component`, () => {
            it(`should have image "${imageUrl}"`, () => {
                expect(schemaArticleStub.props.image).to.eq(imageUrl);
            });

            it(`should have datePublished "${dateCreated}"`, () => {
                expect(schemaArticleStub.props.datePublished).to.eq(dateCreated);
            });

            it(`should have publisher "${source}"`, () => {
                expect(schemaArticleStub.props.publisher).to.eq(source);
            });

        });

        describe(`Header sub-component`, () => {
            it(`should have heroItem object`, () => {
                expect(headerSub.props.heroItem).to.eq(heroItem);
            });

            it(`should have summary "${summary}"`, () => {
                expect(headerSub.props.summary).to.eq(summary);
            });

            it(`should have title "${title}"`, () => {
                expect(headerSub.props.title).to.eq(title);
            });
        });

        describe(`ContentBody sub-component`, () => {
            it(`should have body array`, () => {
                expect(contentBodySub.props.body).to.eq(contentBody);
            });

            it(`should have breakpoints object`, () => {
                expect(contentBodySub.props.breakpoints).to.eq(breakpoints);
            });

            it(`should have class "${contentBodyClass}"`, () => {
                expect(contentBodySub.props.className).to.eq(contentBodyClass);
            });

            it(`should get the context config"`, () => {
                expect(contentBodySub.props.config).to.deep.eq({ foo: `bar` });
            });

            it(`should pass the relatedContentComponent prop`, () => {
                expect(contentBodySub.props.relatedContentComponent).to.eq(RelatedContentComponentStub);
            });
        });

        describe(`Footer sub-component`, () => {
            it(`should have authorProfiles object`, () => {
                expect(footerSub.props.authorProfiles).to.eq(authorProfiles);
            });

            it(`should have source "${source}"`, () => {
                expect(footerSub.props.source).to.eq(source);
            });

            it(`should have tags array`, () => {
                expect(footerSub.props.tags).to.eq(tags);
            });
        });
    });

    describe(`when passing no props`, () => {
        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Article, {});
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(articleClassName);
        });
        it(`should not render the component with a theme class"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            const intersect = _.intersection(classNames, allowedThemeClasses);
            expect(intersect.length).to.eq(0);
        });
    });
});

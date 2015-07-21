import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const AdStub = Context.createStubComponent();
const NativeAdStub = Context.createStubComponent();
const ArticleTitleStub = Context.createStubComponent();
const ArticleSummaryStub = Context.createStubComponent();
const ArticleHeroStub = Context.createStubComponent();
const ArticleSocialShareBlockStub = Context.createStubComponentWithChildren();
const config = {
    get: () => {},
    isFeatureEnabled: () => {},
    gigya: {
        apiKey: 'abcd1324'
    }
};

const Header = proxyquire('../../../app/components/article/header', {
    'react': React,
    'react/addons': React,
    './hero': ArticleHeroStub,
    '@bxm/ad/src/google/components/ad': AdStub,
    '@bxm/ad/src/google/components/nativeAd': NativeAdStub,
    '@bxm/article/lib/components/header/title': ArticleTitleStub,
    '@bxm/article/lib/components/header/summary': ArticleSummaryStub,
    '@bxm/config': {
        load: () => { return config }
    },
    '@bxm/ui/lib/social/components/SocialShareBlock': ArticleSocialShareBlockStub
});

describe(`Article Header Component`, () => {
    const articleClassName = `article__header`;
    const title = articleMock.title;
    const summary = articleMock.summary;
    const source = articleMock.source;
    const targets = { brand: source};
    const heroItem = {
        imageUrl: articleMock.imageUrl,
        imageAltText: articleMock.imageAltText,
        imageCaption: articleMock.imageCaption
    };
    const url = articleMock.url;
    const hostUrl = 'http://www.testurl.com';
    const pageId = articleMock.id;

    let reactModule;

    let socialShareBlockEnableStub;
    let socialShareBlockHost;
    let gigyaApiKey;

    before(function() {
        socialShareBlockEnableStub = sinon.stub(config, 'isFeatureEnabled');
        socialShareBlockHost = sinon.stub(config, 'get');
    });

    after(function() {
        socialShareBlockEnableStub.restore();
    });

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        let titleStub;
        let summaryStub;
        let adStub;
        let nativeAdStub;
        let heroStub;
        let socialShareBlockStub;

        describe('when socialShareBlock is disabled', function() {
            before(function () {
                socialShareBlockEnableStub.withArgs('socialShareBlock').returns(false);
                reactModule = Context.mountComponent(Header, {
                    title, heroItem, summary, url, pageId
                });
                titleStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleTitleStub);
                summaryStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleSummaryStub);
                adStub = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
                heroStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleHeroStub);
                socialShareBlockStub = TestUtils.scryRenderedComponentsWithType(reactModule, ArticleSocialShareBlockStub);
            });

            it(`should render the key header components on the page`, () => {
                expect(socialShareBlockStub.length).eq(0);
            });
        });

        describe('when socialShareBlock is enabled', function() {
            before(function () {
                socialShareBlockEnableStub.withArgs('socialShareBlock').returns(true);
                socialShareBlockHost.returns( hostUrl );
                reactModule = Context.mountComponent(Header, {
                    title, heroItem, summary, url, pageId
                });
                socialShareBlockStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleSocialShareBlockStub);
            });

            it(`should render the key header components on the page`, () => {
                expect(socialShareBlockStub).to.exist;
            });

            describe(`SocialShareBlock sub component`, () => {
                const className = 'social-share-block';
                const tweetBody = 'Renting shouldn’t mean sacrificing personality | HOMES TO LOVE {shortURL} #homestoloveau ';
                const nodeId = articleMock.id;
                const fullUrl = hostUrl + url;

                it(`should have classname "${className}"`, () => {
                    const classNames = socialShareBlockStub.props.className.split(/\s+/);
                    expect(classNames).to.contain(className);
                });

                it(`should have title "${title}"`, () => {
                    expect(socialShareBlockStub.props).to.have.property('title', title);
                });

                it(`should have summary "${summary}"`, () => {
                    expect(socialShareBlockStub.props).to.have.property('description', summary);
                });

                it(`should have nodyId "${nodeId}"`, () => {
                    expect(socialShareBlockStub.props).to.have.property('nodeId', nodeId);
                });

                it(`should have tweetBody "${tweetBody}"`, () => {
                    expect(socialShareBlockStub.props).to.have.property('tweetBody', tweetBody);
                });

                it(`should have imageUrl "${heroItem.imageUrl}"`, () => {
                    expect(socialShareBlockStub.props).to.have.property('imageUrl', heroItem.imageUrl);
                });

                it(`should have url "${fullUrl}"`, () => {
                    expect(socialShareBlockStub.props).to.have.property('url', fullUrl);
                });
            });
        });

        describe('Sub components', () => {
            before(`rendering component`, () => {
                reactModule = Context.mountComponent(Header, {
                    title, heroItem, summary, url, pageId, source
                });

                titleStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleTitleStub);
                summaryStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleSummaryStub);
                adStub = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
                nativeAdStub = TestUtils.findRenderedComponentWithType(reactModule, NativeAdStub);
                heroStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleHeroStub);
            });

            it(`should render the component with class "${articleClassName}"`, () => {
                const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
                expect(classNames).to.contain(articleClassName);
            });

            it(`should render the key header components on the page`, () => {
                expect(titleStub).to.exist;
                expect(summaryStub).to.exist;
                expect(adStub).to.exist;
                expect(nativeAdStub).to.exist;
                expect(heroStub).to.exist;
            });

            describe(`Ad sub-component`, () => {
                const className = 'ad--beneath-short-teaser';
                const displayFor = 'small';
                const sizes = 'banner';

                it(`should have className "${className}"`, () => {
                    expect(adStub.props).to.have.property('className', className);
                });

                it(`should have displayFor "${displayFor}"`, () => {
                    expect(adStub.props).to.have.property('displayFor', displayFor);
                });

                it(`should have sizes "${sizes}"`, () => {
                    expect(adStub.props).to.have.property('sizes', sizes);
                });

                it(`should have targets object "${targets}"`, () => {
                    expect(adStub.props.targets).to.eql(targets);
                });
            });

            describe(`Native Ad sub-component`, () => {
                const displayFor = 'small';

                it(`should be displayed for small viewports only`, () => {
                    expect(nativeAdStub.props).to.have.property('displayFor', displayFor);
                });
            });
        });
    });

    describe(`when passing no props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Header, {});
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(React.findDOMNode(reactModule)).to.exist;
            expect(classNames).to.contain(articleClassName);
        });
    });
});

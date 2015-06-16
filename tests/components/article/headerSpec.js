import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const AdStub = Context.createStubComponent();
const ArticleTitleStub = Context.createStubComponent();
const ArticleSummaryStub = Context.createStubComponent();
const ArticleHeroStub = Context.createStubComponent();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Header = proxyquire('../../../app/components/article/header', {
    'react': React,
    'react/addons': React,
    './hero': ArticleHeroStub,
    '@bxm/ad/src/google/components/ad': AdStub,
    '@bxm/article/lib/components/header/title': ArticleTitleStub,
    '@bxm/article/lib/components/header/summary': ArticleSummaryStub
});

describe(`Article Header Component`, () => {
    const articleClassName = `article__header`;
    const title = articleMock.title;
    const summary = articleMock.summary;
    const heroItem = {
        imageUrl: articleMock.imageUrl,
        imageAltText: articleMock.imageAltText,
        imageCaption: articleMock.imageCaption
    };

    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        let titleStub;
        let summaryStub;
        let adStub;
        let heroStub;

        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Header, {
                title, heroItem, summary
            });

            titleStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleTitleStub);
            summaryStub = TestUtils.findRenderedComponentWithType(reactModule, ArticleSummaryStub);
            adStub = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
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

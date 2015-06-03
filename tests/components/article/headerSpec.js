import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const ArticleTitleStub = Context.createStubComponent({className: 'article__title'});
const ArticleSummaryStub = Context.createStubComponent({className: 'article__summary'});
const ArticleHeroImageStub = Context.createStubComponent({className: 'article__hero'});
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Header = proxyquire('../../../app/components/article/header', {
    'react': React,
    'react/addons': React,
    '@bxm/article/lib/components/header/title': ArticleTitleStub,
    '@bxm/article/lib/components/header/summary': ArticleSummaryStub,
    '@bxm/article/lib/components/hero/image': ArticleHeroImageStub,
    '@bxm/ui/lib/to-love/stores/staticConfigurationStore': staticConfigurationStoreStub
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
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Header, {
                title, heroItem, summary
            });
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;
            expect(classNames.indexOf(articleClassName)).to.be.greaterThan(-1);
        });

        it(`should render the key header components on the page`, () => {
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleTitleStub)).to.exist;
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleSummaryStub)).to.exist;
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleHeroImageStub)).to.exist;
        });
    });

    describe(`when passing no props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Header, {});
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;

            expect(React.findDOMNode(reactModule)).to.exist;
            expect(classNames.indexOf(articleClassName)).to.be.greaterThan(-1);
        });
    });
});

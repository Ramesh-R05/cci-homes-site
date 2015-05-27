import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const ArticleHeaderStub = Context.createStubComponent();
const ArticleFooterStub = Context.createStubComponent();
const ContentBody = Context.createStubComponent();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Article = proxyquire('../../../app/components/article/article', {
    'react': React,
    'react/addons': React,
    './header': ArticleHeaderStub,
    './footer': ArticleFooterStub,
    '@bxm/ui/lib/markdown/components/contentBody': ContentBody,
    '@bxm/ui/lib/to-love/stores/staticConfigurationStore': staticConfigurationStoreStub
});

describe(`Article Component`, () => {
    const articleClassName = `article`;
    const title = articleMock.title;
    const contentBody = articleMock.body;
    const source = articleMock.source;
    const summary = articleMock.summary;
    const tags = articleMock.articleTags;
    const className = `test-article`;
    const credits = {
        writer: articleMock.writer,
        photographer: articleMock.photographer,
        stylist: articleMock.stylist,
        experter: articleMock.experter
    };
    const heroItem = {
        imageUrl: articleMock.imageUrl,
        imageAltText: articleMock.imageAltText,
        imageCaption: articleMock.imageCaption
    };

    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Article, {
                title, contentBody, source, className, heroItem, summary, credits, tags
            });
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;
            expect(classNames.indexOf(articleClassName)).to.be.greaterThan(-1);
        });

        it(`should render the component with class "${className}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;
            expect(classNames.indexOf(className)).to.be.greaterThan(-1);
        });

        it(`should render the key article components on the page`, () => {
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleHeaderStub)).to.exist;
            expect(TestUtils.findRenderedComponentWithType(reactModule, ContentBody)).to.exist;
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleFooterStub)).to.exist;
        });
    });

    describe(`when passing no props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Article, {});
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;

            expect(React.findDOMNode(reactModule)).to.exist;
            expect(classNames.indexOf(articleClassName)).to.be.greaterThan(-1);
        });
    });
});

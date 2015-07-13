import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const ArticleCreditsStub = Context.createStubComponent();
const ArticleSourceStub = Context.createStubComponent();
const ArticleTagsStub = Context.createStubComponent();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Footer = proxyquire('../../../app/components/article/footer', {
    'react': React,
    'react/addons': React,
    './credits': ArticleCreditsStub,
    './source': ArticleSourceStub,
    './tags': ArticleTagsStub
});

describe(`Article Footer Component`, () => {
    const articleClassName = `article__footer`;
    const source = articleMock.source;
    const summary = articleMock.summary;
    const tags = articleMock.articleTags;
    const credits = {
        writer: articleMock.writer,
        photographer: articleMock.photographer,
        stylist: articleMock.stylist,
        experter: articleMock.experter
    };

    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Footer, {
                source, tags, credits
            });
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;
            expect(classNames.indexOf(articleClassName)).to.be.greaterThan(-1);
        });

        it(`should render the key header components on the page`, () => {
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleCreditsStub)).to.exist;
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleSourceStub)).to.exist;
            expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleTagsStub)).to.exist;
        });
    });

    describe(`when passing no props`, () => {
        beforeEach(`rendering component`, () => {
            reactModule = Context.mountComponent(Footer, {});
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className;

            expect(React.findDOMNode(reactModule)).to.exist;
            expect(classNames.indexOf(articleClassName)).to.be.greaterThan(-1);
        });
    });
});

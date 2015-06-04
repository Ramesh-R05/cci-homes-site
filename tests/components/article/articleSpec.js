import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';
import breakpoints from '../../../app/breakpoints';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const HeaderStub = Context.createStubComponent();
const FooterStub = Context.createStubComponent();
const ContentBody = Context.createStubComponent();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Article = proxyquire('../../../app/components/article/article', {
    'react': React,
    'react/addons': React,
    './header': HeaderStub,
    './footer': FooterStub,
    '@bxm/ui/lib/markdown/components/contentBody': ContentBody,
    '@bxm/ui/lib/to-love/stores/staticConfigurationStore': staticConfigurationStoreStub
});

describe(`Article Component`, () => {
    const articleClassName = `article`;
    const title = articleMock.title;
    const contentBody = articleMock.body;
    const contentBodyClass = `article__body article__body--top-border`;
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
        let headerSub;
        let contentBodySub;
        let footerSub;

        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Article, {
                className, contentBody, credits, heroItem, source, summary, tags, title
            });

            headerSub = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            contentBodySub = TestUtils.findRenderedComponentWithType(reactModule, ContentBody);
            footerSub = TestUtils.findRenderedComponentWithType(reactModule, FooterStub);
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(articleClassName);
        });

        it(`should render the component with class "${className}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(className);
        });

        it(`should render the key article sub-components on the page`, () => {
            expect(headerSub).to.exist;
            expect(contentBodySub).to.exist;
            expect(footerSub).to.exist;
        });

        it(`should render the Header sub-component with a heroItem object`, () => {
            expect(headerSub.props.heroItem).to.eq(heroItem);
        });

        it(`should render the Header sub-component with summary "${summary}"`, () => {
            expect(headerSub.props.summary).to.eq(summary);
        });

        it(`should render the Header sub-component with title "${title}"`, () => {
            expect(headerSub.props.title).to.eq(title);
        });

        it(`should render the ContentBody sub-component with a body array`, () => {
            expect(contentBodySub.props.body).to.eq(contentBody);
        });

        it(`should render the ContentBody sub-component with a breakpoints object`, () => {
            expect(contentBodySub.props.breakpoints).to.eq(breakpoints);
        });

        it(`should render the ContentBody sub-component with class "${contentBodyClass}"`, () => {
            expect(contentBodySub.props.className).to.eq(contentBodyClass);
        });

        it(`should render the Footer sub-component with a credits object`, () => {
            expect(footerSub.props.credits).to.eq(credits);
        });

        it(`should render the Footer sub-component with source "${source}"`, () => {
            expect(footerSub.props.source).to.eq(source);
        });

        it(`should render the Footer sub-component with a tags array`, () => {
            expect(footerSub.props.tags).to.eq(tags);
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
    });
});

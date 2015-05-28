import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const ArticleStub = Context.createStubComponent();
const FeedStub = Context.createStubComponent();
const ArticleSection = proxyquire('../../../app/components/article/section', {
    'react': React,
    'react/addons': React,
    './article': ArticleStub,
    '../feed/feed': FeedStub
});

let EntityStoreStub = {
    getTitle() {
        return articleMock.title;
    },
    getContent() {
        return articleMock;
    }

};

Context.addStore('EntityStore', EntityStoreStub);

describe(`ArticleSection Component`, () => {
    const sectionClassName = `article-section`;

    let reactModule;

    afterEach(Context.cleanup);

    before(`rendering component`, () => {
        reactModule = Context.mountComponent(ArticleSection);
    });

    it(`should render the Article Section with class "${sectionClassName}"`, () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName)).to.exist;
    });

    it(`should render the Article component on the page`, () => {
        expect(TestUtils.findRenderedComponentWithType(reactModule, ArticleStub)).to.exist;
    });

    it(`should render the Article Feed on the page`, () => {
        expect(TestUtils.findRenderedComponentWithType(reactModule, FeedStub)).to.exist;
    });
});

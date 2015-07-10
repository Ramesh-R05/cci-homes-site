import {betterMockComponentContext} from '@bxm/flux';
import {articles as homeArticlesMock} from '../../mock/articles';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const SectionFeatured = Context.createStubComponentWithChildren();
const InFocusStub = Context.createStubComponentWithChildren();
const Home = proxyquire('../../../app/components/home/home', {
    'react': React,
    './sectionFeatured': SectionFeatured,
    '../inFocus/inFocus': InFocusStub
});

const inFocusArticlesMock = homeArticlesMock.slice(0, 5);

Context.addStore('HomeArticles', {
    getItems() {
        return homeArticlesMock;
    }
});
Context.addStore('InFocusArticles', {
    getItems() {
        return inFocusArticlesMock;
    }
});

describe('Home', () => {
    let reactModule;
    let inFocus;
    let sectionFeatured;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Home);
        inFocus = TestUtils.findRenderedComponentWithType(reactModule, InFocusStub);
        sectionFeatured = TestUtils.findRenderedComponentWithType(reactModule, SectionFeatured);
    });

    it(`should pass down the articles to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.articles).to.deep.equal(homeArticlesMock);
    });

    it(`should pass down the in focus articles to the InFocus component`, () => {
        expect(inFocus.props.articles).to.deep.equal(inFocusArticlesMock);
    });
});

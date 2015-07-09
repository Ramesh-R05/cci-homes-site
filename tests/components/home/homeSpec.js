import {betterMockComponentContext} from '@bxm/flux';
import {articles as featuredArticlesMock} from '../../mock/articles';
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

const inFocusArticlesMock = featuredArticlesMock.slice(0, 5);

Context.addStore('FeaturedArticles', {
    getItems() {
        return featuredArticlesMock;
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

    it(`should pass down the featured articles to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.articles).to.deep.equal(featuredArticlesMock);
    });

    it(`should pass down the in focus articles to the InFocus component`, () => {
        expect(inFocus.props.articles).to.deep.equal(inFocusArticlesMock);
    });
});

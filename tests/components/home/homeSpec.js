import {betterMockComponentContext} from '@bxm/flux';
import {entity, articles as homeArticlesMock} from '../../mock/articles';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const SectionFeatured = Context.createStubComponentWithChildren();
const InFocusStub = Context.createStubComponentWithChildren();
const FooterStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();
const RecommendationsStub = Context.createStubComponent();

const Home = proxyquire('../../../app/components/home/home', {
    'react': React,
    './sectionFeatured': SectionFeatured,
    '../inFocus/inFocus': InFocusStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/recommendations/lib/components/recommendations': RecommendationsStub
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

Context.addStore('EntityStore', {
    getContent() {
        return entity;
    }
});

describe('Home', () => {
    let reactModule;
    let inFocus;
    let sectionFeatured;
    let ad;
    let recommendations;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Home);
        inFocus = TestUtils.findRenderedComponentWithType(reactModule, InFocusStub);
        sectionFeatured = TestUtils.findRenderedComponentWithType(reactModule, SectionFeatured);
        ad = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
        recommendations = TestUtils.findRenderedComponentWithType(reactModule, RecommendationsStub);
    });

    it(`should pass down the articles to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.articles).to.deep.equal(homeArticlesMock);
    });

    it(`should pass down the in focus articles to the InFocus component`, () => {
        expect(inFocus.props.articles).to.deep.equal(inFocusArticlesMock);
    });

    it(`should render the Ad component with correct position and sizes`, () => {
        expect(ad).to.exist;
        expect(ad.props.targets).to.deep.equal({position: 3});
        expect(ad.props.sizes).to.deep.equal({
            small: 'banner',
            leaderboard: 'leaderboard',
            billboard: ['billboard', 'leaderboard']
        });
    });

    it(`should render the Recommendations component`, () => {
        expect(recommendations).to.exist;
    });

    it(`should pass down the correct props to the Recommendations component`, () => {
        expect(recommendations.props.nodeType).to.equal('Homepage');
        expect(recommendations.props.nodeId).to.equal('HOMES-1158');
    });

    describe(`Bottom banner/leaderboard/billboard ad`, () => {
        it(`should display either a banner, leaderboard or a billboard ad`, () => {
            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };
            expect(ad.props.sizes).to.deep.equal(expectedSizes);
        });

        it(`should be targeted with position 2`, () => {
            expect(ad.props.targets).to.deep.equal({position: 3});
        });
    });

    describe(`side menu behavior`, () => {
        let domNode;

        before(() => {
            reactModule = Context.mountComponent(Home);
            domNode = React.findDOMNode(reactModule);
        });

        it(`should have class name "side-menu-slider"`, () => {
            expect(domNode).to.have.className('side-menu-slider');
        });

        it(`should default to closed state`, () => {
            expect(domNode).not.to.have.className('side-menu-slider--side-menu-open');
        });

        it(`should open when isSideMenuOpen is true`, () => {
            reactModule = Context.mountComponent(Home, {isSideMenuOpen: true});
            domNode = React.findDOMNode(reactModule);
            // reactModule.setProps({ isSideMenuOpen: true });
            expect(domNode).to.have.className('side-menu-slider--side-menu-open');
        });
    });

});

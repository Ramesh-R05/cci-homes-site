import {betterMockComponentContext} from '@bxm/flux';
import {items as gogMock} from '../../mock/galleryOfGalleries';
import exposeProps from '../../test-util/exposeProps';
import {entity, articles as homeArticlesMock} from '../../mock/articles';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const SectionFeatured = Context.createStubComponentWithChildren();
const InFocusStub = Context.createStubComponentWithChildren();
const FooterStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();
const RecommendationsStub = Context.createStubComponent();

const Home = proxyquire('../../../app/components/home/home', {
    'react': React,
    '../../actions/facetedModule': {
        getPage: () => {}
    },
    './sectionFeatured': SectionFeatured,
    '../inFocus/inFocus': InFocusStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/recommendations/lib/components/recommendations': RecommendationsStub
});

const inFocusArticlesMock = homeArticlesMock.slice(0, 5);

Context.addStore('GalleryOfGalleriesStore', {
    getItems() {
        return gogMock;
    }
});

Context.addStore('AppStore', {
    getContent() {
        return entity;
    },

    getItems() {
        return homeArticlesMock;
    },

    getModuleItems() {
        return inFocusArticlesMock;
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

    it(`should pass down the gallery of galleries to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.galleries).to.deep.equal(gogMock);
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
            domNode = ReactDOM.findDOMNode(reactModule).getAttribute('class');
        });

        it(`should have class name "side-menu-slider"`, () => {
            expect(domNode).to.contain('side-menu-slider');
        });

        it(`should default to closed state`, () => {
            expect(domNode).to.not.contain('side-menu-slider--side-menu-open');
        });

        it(`should open when isSideMenuOpen is true`, () => {
            reactModule = Context.mountComponent(Home, {isSideMenuOpen: true});
            domNode = ReactDOM.findDOMNode(reactModule).getAttribute('class');
            // reactModule.setProps({ isSideMenuOpen: true });
            expect(domNode).to.contain('side-menu-slider--side-menu-open');
        });
    });

});

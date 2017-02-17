import {betterMockComponentContext} from '@bxm/flux';
import heroMock from '../../mock/article';
import {entity, articles as homeArticlesMock} from '../../mock/articles';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const SectionFeatured = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();

const Home = proxyquire('../../../app/components/home/home', {
    'react': React,
    './sectionFeatured': SectionFeatured,
    '@bxm/ad/lib/google/components/ad': AdStub
});

Context.addStore('PageStore', {
    getContent() {
        return entity;
    },

    getHeroItem() {
        return heroMock;
    },

    getItems() {
        return homeArticlesMock;
    },

    getList: () => homeArticlesMock,
    getListNextParams: () => {}
});

describe('Home', () => {
    let reactModule;
    let sectionFeatured;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Home);
        sectionFeatured = TestUtils.findRenderedComponentWithType(reactModule, SectionFeatured);
    });

    it(`should pass down the hero teaser to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.hero).to.deep.equal(heroMock);
    });

    it(`should pass down the articles to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.articles).to.deep.equal(homeArticlesMock);
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

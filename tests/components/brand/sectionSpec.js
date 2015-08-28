import {betterMockComponentContext} from '@bxm/flux';
import {entity, request, articles as articlesMock} from '../../mock/articles';
import exposeProps from '../../test-util/exposeProps';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const HeaderStub = Context.createStubComponent();
const GroupStub = Context.createStubComponent();
const FeaturedStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const RecommendationsStub = Context.createStubComponent();

const Section = proxyquire('../../../app/components/brand/section', {
    'react': React,
    '../../actions/facetedModule': {
        getPage: () => {}
    },
    './header': HeaderStub,
    './articleGroup': GroupStub,
    './featured': FeaturedStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/recommendations/lib/components/recommendations': RecommendationsStub
});
let brandArticlesStore = articlesMock;

Context.addStore('BrandSectionStore', {
    getItems() {
        return brandArticlesStore;
    },
    getConfiguration() {
        return null;
    },
    getIsLoading() {
        return false;
    },
    getPaging() {
        return {};
    },
    getCurrentPage() {
        return 0;
    }
});

Context.addStore('EntityStore', {
    getContent() {
        let content = {...entity};
        content.urlName = 'belle';
        content.title = 'Belle';
        return content;
    }
});

describe(`Brand Section`, () => {
    let reactModule;

    afterEach(Context.cleanup);

    describe(`Without sideMenu prop and 12 articles`, () => {
        const sectionClassName = 'container';
        let section;
        let header;
        let group;
        let featured;
        let ads;
        let recommendations;

        before(() => {
            brandArticlesStore = articlesMock.slice(0, 12);
            reactModule = Context.mountComponent(Section, {});
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
            header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            featured = TestUtils.findRenderedComponentWithType(reactModule, FeaturedStub);
            group = TestUtils.findRenderedComponentWithType(reactModule, GroupStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            recommendations = TestUtils.findRenderedComponentWithType(reactModule, RecommendationsStub);
        });

        it(`should render the Section component on the page`, () => {
            expect(React.findDOMNode(section)).to.exist;
        });

        // Recommendations
        it(`should render Recommendations component`, () => {
            expect(recommendations).to.exist;
        });

        it(`should pass down the correct props to the Recommendations component`, () => {
            expect(recommendations.props.nodeType).to.equal('Homepage');
            expect(recommendations.props.nodeId).to.equal('HOMES-1158');
        });

        // Header
        it(`should pass down the brand to the Heading component as Belle`, () => {
            expect(header.props.brand).to.equal('Belle');
        });

        it(`should pass down the brand logo to the Heading component as ${Section.brands.belle.logo}`, () => {
            expect(header.props.logo).to.equal(Section.brands.belle.logo);
        });

        // Featured articles
        it(`should pass down the featured articles to the featured component`, () => {
            expect(featured.props.articles).to.deep.equal(articlesMock.slice(0, 5));
        });

        it(`should pass down the brand and brandConfig`, () => {
            expect(featured.props.brand).to.equal('Belle');
            expect(featured.props.brandConfig).to.deep.equal(Section.brands.belle);
        });

        // Group Articles
        it(`should pass down the other articles to the group component`, () => {
            expect(group.props.articles).to.deep.equal(articlesMock.slice(5, 12));
        });

        // Ads
        describe(`Ads`, () => {
            const numberOfAds = 2;
            it(`should have ${numberOfAds} AdStubs`, () => {
                expect(ads.length).to.eq(numberOfAds);
            });

            it(`should have the relevant props for the 1st ad`, () => {
                const size = {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                const targets = { position: 2 };
                expect(ads[0].props.sizes).to.deep.equal(size);
                expect(ads[0].props.targets).to.deep.equal(targets);
            });

            it(`should have the relevant props for the 2nd ad`, () => {
                const size = {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                const targets = { position: 3 };
                expect(ads[1].props.sizes).to.deep.equal(size);
                expect(ads[1].props.targets).to.deep.equal(targets);
            });
        });

    });

    describe(`Without sideMenu prop and 13 articles`, () => {
        let groups;

        before(() => {
            brandArticlesStore = articlesMock.slice(0, 13);
            reactModule = Context.mountComponent(Section, {});
            groups = TestUtils.scryRenderedComponentsWithType(reactModule, GroupStub);
        });

        // Group Articles
        it(`should render 2 group components`, () => {
            expect(groups.length).to.equal(2);
        });

        it(`should pass down the other articles to the 2 group components`, () => {
            expect(groups[0].props.articles).to.deep.equal(articlesMock.slice(5, 12));
            expect(groups[1].props.articles).to.deep.equal(articlesMock.slice(12, 13));
        });
    });

    describe(`side menu behavior`, () => {
        let domNode;

        before(() => {
            reactModule = Context.mountComponent(exposeProps(Section), {});
            domNode = React.findDOMNode(reactModule);
        });

        it(`should have class name "side-menu-slider"`, () => {
            expect(domNode).to.have.className('side-menu-slider');
        });

        it(`should default to closed state`, () => {
            expect(domNode).not.to.have.className('side-menu-slider--side-menu-open');
        });

        it(`should open when isSideMenuOpen is true`, () => {
            reactModule.setProps({ isSideMenuOpen: true });
            expect(domNode).to.have.className('side-menu-slider--side-menu-open');
        });
    });
});


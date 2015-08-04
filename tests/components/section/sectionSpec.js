import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';
import exposeProps from '../../test-util/exposeProps';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const HeaderStub = Context.createStubComponentWithChildren();
const GroupStub = Context.createStubComponentWithChildren();
const InFocusStub = Context.createStubComponentWithChildren();
const GroupRepeatableStub = Context.createStubComponentWithChildren();
const HeroStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const LoadMoreStub = Context.createStubComponentWithChildren();
const config = {
    get: () => {},
    isFeatureEnabled: () => {},
    pagination: {
        nbFirstPageItems: 20,
        nbLoadMoreItems: 18
    }
};

const Section = proxyquire('../../../app/components/section/section', {
    'react': React,
    '../../actions/facetedModule': {
        getPage: () => {}
    },
    './header': HeaderStub,
    './group': GroupStub,
    '../inFocus/inFocus': InFocusStub,
    './groupRepeatable': GroupRepeatableStub,
    './hero': HeroStub,
    '../loadMore/loadMore': LoadMoreStub,
    '@bxm/config': {
        load: () => { return config }
    },
    '@bxm/ad/lib/google/components/ad': AdStub
});

const featuredArticles = articlesMock.slice(1, 4);
const navigationTags = ['Test'];

Context.addStore('TaggedArticlesStore', {
    getItems() {
        return articlesMock;
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
    getNavigationTags() {
        return navigationTags;
    }
});

describe(`Section`, () => {
    let reactModule;
    let loadMoreEnableStub;
    let paginationConfig;

    before(() => {
        loadMoreEnableStub = sinon.stub(config, 'isFeatureEnabled');
        paginationConfig = sinon.stub(config, 'get');
    });

    after(function() {
        loadMoreEnableStub.restore();
    });

    afterEach(Context.cleanup);

    describe(`With Load More Disabled`, () => {

        let loadMore;

        before(() => {
            loadMoreEnableStub.withArgs('loadMoreBtn').returns(false);
            reactModule = Context.mountComponent(Section);
            loadMore = TestUtils.scryRenderedComponentsWithType(reactModule, LoadMoreStub);
        });

        it(`LoadMore button shouldn't exist`, () => {
            expect(loadMore.length).to.be.eq(0);
        });
    });

    describe(`With Load More enabled`, () => {
        const sectionClassName = 'container';
        let section;
        let header;
        let inFocus;
        let groups;
        let groupRepeatable;
        let hero;
        let ads;
        let loadMore;

        before(() => {
            loadMoreEnableStub.withArgs('loadMoreBtn').returns(true);
            reactModule = Context.mountComponent(Section);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
            header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            hero = TestUtils.findRenderedComponentWithType(reactModule, HeroStub);
            inFocus = TestUtils.findRenderedComponentWithType(reactModule, InFocusStub);
            groups = TestUtils.scryRenderedComponentsWithType(reactModule, GroupStub);
            groupRepeatable = TestUtils.findRenderedComponentWithType(reactModule, GroupRepeatableStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            loadMore = TestUtils.scryRenderedComponentsWithType(reactModule, LoadMoreStub);
        });

        it(`should render the Section component on the page`, () => {
            expect(React.findDOMNode(section)).to.exist;
        });

        it(`should pass down the tags prop to the Heading component as ${navigationTags}`, () => {
            expect(header.props.tags).to.deep.equal(navigationTags);
        });

        // Hero
        it(`should pass down the firstHero prop to the Hero component`, () => {
            expect(hero.props.firstHero).to.deep.equal(articlesMock.slice(0, 1)[0]);
        });

        it(`should pass down the secondHero prop to the Hero component`, () => {
            expect(hero.props.secondHero).to.deep.equal(articlesMock.slice(4, 5)[0]);
        });

        // Featured articles
        it(`should pass down the features articles to the inFocus component`, () => {
            expect(inFocus.props.articles).to.deep.equal(featuredArticles);
        });

        describe(`First group of articles`, () => {
            const expectedFirstGroupModifier = '3-items';
            it(`should pass down the ${expectedFirstGroupModifier} modifier to the first group of articles`, () => {
                expect(groups[0].props.modifier).to.equal(expectedFirstGroupModifier);
            });

            it(`should pass down the next 3 articles to the second group of articles`, () => {
                expect(groups[0].props.articles).to.deep.equal(articlesMock.slice(4, 7));
            });
        });

        describe(`Second group of articles`, () => {
            const expectedSecondGroupModifier = '6-or-4-items';
            const expectedSecondGroupClass = 'hidden-for-large-only';
            const expectedSecondGroupTeaserModifier = 'img-top';
            it(`should pass down the ${expectedSecondGroupModifier} modifier to the second group of articles`, () => {
                expect(groups[1].props.modifier).to.equal(expectedSecondGroupModifier);
            });

            it(`should pass down the ${expectedSecondGroupClass} className to the second group of articles`, () => {
                expect(groups[1].props.className).to.equal(expectedSecondGroupClass);
            });

            it(`should pass down the ${expectedSecondGroupTeaserModifier} teaser modifier to the second group of articles`, () => {
                expect(groups[1].props.teaserModifier).to.equal(expectedSecondGroupTeaserModifier);
            });

            it(`should pass down the next 4 articles to the second group of articles`, () => {
                expect(groups[1].props.articles).to.deep.equal(articlesMock.slice(7, 11));
            });
        });

        describe(`Third group of articles`, () => {
            const expectedThirdGroupModifier = '6-or-4-items';
            const expectedThirdGroupClass = 'visible-for-large-only';
            const expectedThirdGroupTeaserModifier = 'img-top';
            it(`should pass down the ${expectedThirdGroupModifier} modifier to the second group of articles`, () => {
                expect(groups[2].props.modifier).to.equal(expectedThirdGroupModifier);
            });

            it(`should pass down the ${expectedThirdGroupClass} className to the second group of articles`, () => {
                expect(groups[2].props.className).to.equal(expectedThirdGroupClass);
            });

            it(`should pass down the ${expectedThirdGroupTeaserModifier} teaser modifier to the second group of articles`, () => {
                expect(groups[2].props.teaserModifier).to.equal(expectedThirdGroupTeaserModifier);
            });

            it(`should pass down the next 6 articles to the second group of articles`, () => {
                expect(groups[2].props.articles).to.deep.equal(articlesMock.slice(5, 11));
            });
        });

        describe(`Repeatable group of articles`, () => {
            it(`should pass down the remaining articles to the repeatable group`, () => {
                expect(groupRepeatable.props.articles).to.deep.equal(articlesMock.slice(11, articlesMock.length));
            });
        });

        describe(`Number of AdStubs`, () => {
            const numberOfAds = 4;
            it(`should have ${numberOfAds} AdStubs`, () => {
                expect(ads.length).to.eq(numberOfAds);
            });
        });

        describe(`Top banner/leaderboard/billboard ad`, () => {
            const expectedClassname = 'ad--section-top-leaderboard';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[0].props.className).to.equal(expectedClassname);
            });

            it(`should have the correct sizes prop`, () => {
                const expectedSizes = {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                expect(ads[0].props.sizes).to.deep.equal(expectedSizes);
            });
        });

        describe(`Top mrec ad (hidden on xlarge viewport)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[1].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = 'mrec';
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[1].props.sizes).to.equal(expectedSizes);
            });

            const expectedDisplayFor = ['small', 'medium', 'large'];
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[1].props.displayFor).to.deep.equal(expectedDisplayFor);
            });
        });

        describe(`Top mrec ad (visible only on xlarge viewport)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[2].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = ['double-mrec', 'mrec'];
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[2].props.sizes).to.deep.equal(expectedSizes);
            });

            const expectedDisplayFor = ['xlarge'];
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[2].props.displayFor).to.deep.equal(expectedDisplayFor);
            });
        });

        describe(`Bottom banner/leaderboard/billboard ad before the Network section`, () => {
            const expectedClassname = 'ad--section-bottom-leaderboard';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[3].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[3].props.sizes).to.deep.equal(expectedSizes);
            });

            const targets = {position: 3};
            it(`should have the targets props equal to ${targets}`, () => {
                expect(ads[3].props.targets).to.deep.equal(targets);
            });
        });

    });

    describe(`side menu behavior`, () => {
        let domNode;

        before(() => {
            reactModule = Context.mountComponent(exposeProps(Section));
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


import {betterMockComponentContext} from '@bxm/flux';
import {entity, articles as articlesMock} from '../../mock/articles';
import exposeProps from '../../test-util/exposeProps';
import cloneDeep from 'lodash/lang/cloneDeep';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

// ----------------------------------------------------------------------------- Stubbed components

const proxyquire = require('proxyquire').noCallThru();
const HeaderStub = Context.createStubComponentWithChildren();
const GroupStub = Context.createStubComponentWithChildren();
const InFocusStub = Context.createStubComponentWithChildren();
const GroupRepeatableStub = Context.createStubComponentWithChildren();
const HeroStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const LoadMoreStub = Context.createStubComponentWithChildren();
const RecommendationsStub = Context.createStubComponent();

const Section = proxyquire('../../../app/components/section/section', {
    'react': React,
    './header': HeaderStub,
    './group': GroupStub,
    '../inFocus/inFocus': InFocusStub,
    './groupRepeatable': GroupRepeatableStub,
    './hero': HeroStub,
    '../loadMore/loadMore': LoadMoreStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/recommendations/lib/components/recommendations': RecommendationsStub
});

// ----------------------------------------------------------------------------- Mocked data, context and props

const featuredArticles = articlesMock.slice(1, 4);
const navigationTags = ['Test'];
const contextConfigStub = {key: 'config', type: '', value: {isFeatureEnabled: () => false}};
const defaultProps = {
    articles: articlesMock,
    content: {
        nodeType: 'Homepage',
        id: 'HOMES-1158',
        title: 'Section Heading',
        tagsDetails: [
            { displayName: 'Test' }
        ]
    },
    isSideMenuOpen: false,
};

// ----------------------------------------------------------------------------- tests

describe(`Section`, () => {
    let reactModule;

    afterEach(Context.cleanup);

    describe(`With Load More Disabled`, () => {
        let loadMore;

        before(() => {
            reactModule = Context.mountComponent(Section, defaultProps, [contextConfigStub]);
            loadMore = TestUtils.scryRenderedComponentsWithType(reactModule, LoadMoreStub);
        });

        it(`LoadMore button shouldn't exist`, () => {
            expect(loadMore.length).to.eq(0);
        });
    });

    describe(`With Load More enabled`, () => {
        const sectionClassName = 'section-landing';
        const contextConfigStubEnabled = {key: 'config', type: '', value: {isFeatureEnabled: () => true}};
        let section;
        let header;
        let inFocus;
        let groups;
        let groupRepeatable;
        let hero;
        let ads;
        let loadMore;
        let recommendations;

        before(() => {
            reactModule = Context.mountComponent(Section, defaultProps, [contextConfigStubEnabled]);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
            header = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            hero = TestUtils.findRenderedComponentWithType(reactModule, HeroStub);
            inFocus = TestUtils.findRenderedComponentWithType(reactModule, InFocusStub);
            groups = TestUtils.scryRenderedComponentsWithType(reactModule, GroupStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            recommendations = TestUtils.findRenderedComponentWithType(reactModule, RecommendationsStub);
        });

        it(`should render the Section component on the page`, () => {
            expect(ReactDOM.findDOMNode(section)).to.exist;
        });

        it(`should render Recommendations component`, () => {
            expect(recommendations).to.exist;
        });

        it(`should pass down the correct props to the Recommendations component`, () => {
            expect(recommendations.props.nodeType).to.equal('Homepage');
            expect(recommendations.props.nodeId).to.equal('HOMES-1158');
        });

        it(`should pass down the title prop to the Heading component`, () => {
            expect(header.props.title).to.deep.equal(defaultProps.content.title);
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
            it(`should pass down the ${expectedFirstGroupModifier} modifier`, () => {
                expect(groups[0].props.modifier).to.equal(expectedFirstGroupModifier);
            });

            it(`should pass down the next 3 articles`, () => {
                expect(groups[0].props.articles).to.deep.equal(articlesMock.slice(4, 7));
            });

            it(`should pass down the polarAd settings`, () => {
                expect(groups[0].props.polarAd).to.deep.equal({
                    label: 'section_teaser_1',
                    index: 1
                });
            });
        });

        describe(`Second group of articles`, () => {
            const expectedSecondGroupModifier = '6-or-4-items';
            const expectedSecondGroupClass = 'hidden-for-large-only';
            const expectedSecondGroupTeaserModifier = 'img-top';
            it(`should pass down the ${expectedSecondGroupModifier} modifier`, () => {
                expect(groups[1].props.modifier).to.equal(expectedSecondGroupModifier);
            });

            it(`should pass down the ${expectedSecondGroupClass} className`, () => {
                expect(groups[1].props.className).to.equal(expectedSecondGroupClass);
            });

            it(`should pass down the ${expectedSecondGroupTeaserModifier} teaser modifier`, () => {
                expect(groups[1].props.teaserModifier).to.equal(expectedSecondGroupTeaserModifier);
            });

            it(`should pass down the next 4 articles`, () => {
                expect(groups[1].props.articles).to.deep.equal(articlesMock.slice(7, 11));
            });
        });

        describe(`Third group of articles`, () => {
            const expectedThirdGroupModifier = '6-or-4-items';
            const expectedThirdGroupClass = 'visible-for-large-only';
            const expectedThirdGroupTeaserModifier = 'img-top';
            it(`should pass down the ${expectedThirdGroupModifier} modifier`, () => {
                expect(groups[2].props.modifier).to.equal(expectedThirdGroupModifier);
            });

            it(`should pass down the ${expectedThirdGroupClass} className`, () => {
                expect(groups[2].props.className).to.equal(expectedThirdGroupClass);
            });

            it(`should pass down the ${expectedThirdGroupTeaserModifier} teaser modifier`, () => {
                expect(groups[2].props.teaserModifier).to.equal(expectedThirdGroupTeaserModifier);
            });

            it(`should pass down the next 6 articles`, () => {
                expect(groups[2].props.articles).to.deep.equal(articlesMock.slice(5, 11));
            });

            it(`should pass down the polarAd settings`, () => {
                expect(groups[2].props.polarAd).to.deep.equal({
                    label: 'section_teaser_1',
                    index: 0
                });
            });
        });

        describe(`Number of AdStubs`, () => {
            const numberOfAds = 5;
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

        describe(`Middle banner/leaderboard/billboard ad before the Inline Gallery`, () => {
            const expectedClassname = 'ad--section-middle-leaderboard';
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

            const targets = {position: 2, kingtag: 'Test'};
            it(`should have the targets props equal to ${targets}`, () => {
                expect(ads[3].props.targets).to.deep.equal(targets);
            });
        });

        describe(`Bottom banner/leaderboard/billboard ad before the Network section`, () => {
            const expectedClassname = 'ad--section-bottom-leaderboard';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[4].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[4].props.sizes).to.deep.equal(expectedSizes);
            });

            const targets = {position: 3, kingtag: 'Test'};
            it(`should have the targets props equal to ${targets}`, () => {
                expect(ads[4].props.targets).to.deep.equal(targets);
            });
        });

    });

    describe(`with the side menu closed`, () => {
        before(() => {
            reactModule = Context.mountComponent(Section, defaultProps, [contextConfigStub]);
        });

        const expectedClassName = "side-menu-slider";
        it(`should have class name "${expectedClassName}"`, () => {
            const section = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, expectedClassName);
            expect(section).to.have.length(1);
        });

        const expectedOpenClassName = "side-menu-slider--side-menu-open";
        it(`should default to closed state`, () => {
            const section = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, expectedOpenClassName);
            expect(section).to.have.length(0);
        });
    });

    describe(`with the side menu opened`, () => {
        const customProps = cloneDeep(defaultProps);
        customProps.isSideMenuOpen = true;

        before(() => {
            reactModule = Context.mountComponent(Section, customProps, [contextConfigStub]);
        });

        const expectedOpenClassName = "side-menu-slider--side-menu-open";
        it(`should open when isSideMenuOpen is true`, () => {
            const section = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, expectedOpenClassName);
            expect(section).to.have.length(1);
        });
    });

});

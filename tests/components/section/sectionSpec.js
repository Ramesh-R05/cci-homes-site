import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const GroupStub = Context.createStubComponentWithChildren();
const GroupFeaturedStub = Context.createStubComponentWithChildren();
const GroupRepeatableStub = Context.createStubComponentWithChildren();
const HeroStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const Section = proxyquire('../../../app/components/section/section', {
    'react': React,
    '../../actions/facetedModule': {
        getPage: function(){

        }
    },
    './group': GroupStub,
    './groupFeatured': GroupFeaturedStub,
    './groupRepeatable': GroupRepeatableStub,
    './hero': HeroStub,
    '@bxm/ad/src/google/components/ad': AdStub
});

const featuredArticles = articlesMock.slice(1, 4);

Context.addStore('TaggedArticlesStore', {
    getItems() {
        return articlesMock;
    },
    getConfiguration(){
        return null;
    }
});

describe(`Section`, () => {
    const sectionClassName = 'container';
    let reactModule;
    let section;
    let groupFeatured;
    let groups;
    let groupRepeatable;
    let hero;
    let Ads;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Section);
        section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
        hero = TestUtils.findRenderedComponentWithType(reactModule, HeroStub);
        groupFeatured = TestUtils.findRenderedComponentWithType(reactModule, GroupFeaturedStub);
        groups = TestUtils.scryRenderedComponentsWithType(reactModule, GroupStub);
        groupRepeatable = TestUtils.findRenderedComponentWithType(reactModule, GroupRepeatableStub);
        Ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
    });

    it(`should render the Section component on the page`, () => {
        expect(React.findDOMNode(section)).to.exist;
    });

    // Hero Section
    it(`should pass firstHero properly`, () => {
        expect(hero.props.firstHero).to.deep.equal(articlesMock.slice(0, 1)[0]);
    });

    it(`should pass second properly`, () => {
        expect(hero.props.secondHero).to.deep.equal(articlesMock.slice(4, 5)[0]);
    });

    // Featured articles
    it(`should pass down the features articles to the groupFeatured component`, () => {
        expect(groupFeatured.props.articles).to.deep.equal(featuredArticles);
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

    describe(`Top banner/leaderboard/billboard ad`, () => {
        const expectedClassname = 'ad--section-top-leaderboard';
        it(`should have the classname prop equal to ${expectedClassname}`, () => {
            expect(Ads[0].props.className).to.equal(expectedClassname);
        });

        it(`should have the correct sizes prop`, () => {
            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };
            expect(Ads[0].props.sizes).to.deep.equal(expectedSizes);
        });
    });

    describe(`Top mrec ad (hidden on xlarge viewport)`, () => {
        const expectedClassname = 'ad--section-mrec';
        it(`should have the classname prop equal to ${expectedClassname}`, () => {
            expect(Ads[1].props.className).to.equal(expectedClassname);
        });

        const expectedSizes = 'mrec';
        it(`should have the sizes prop equal to ${expectedSizes}`, () => {
            expect(Ads[1].props.sizes).to.equal(expectedSizes);
        });

        const expectedDisplayFor = ['small', 'medium', 'large'];
        it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
            expect(Ads[1].props.displayFor).to.deep.equal(expectedDisplayFor);
        });
    });

    describe(`Top mrec ad (visible only on xlarge viewport)`, () => {
        const expectedClassname = 'ad--section-mrec';
        it(`should have the classname prop equal to ${expectedClassname}`, () => {
            expect(Ads[2].props.className).to.equal(expectedClassname);
        });

        const expectedSizes = ['double-mrec', 'mrec'];
        it(`should have the sizes prop equal to ${expectedSizes}`, () => {
            expect(Ads[2].props.sizes).to.deep.equal(expectedSizes);
        });

        const expectedDisplayFor = 'xlarge';
        it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
            expect(Ads[2].props.displayFor).to.equal(expectedDisplayFor);
        });
    });

    describe(`Middle banner/leaderboard/billboard ad (visibile on small/medium/xlarge viewports)`, () => {
        const expectedClassname = 'ad--section-middle-leaderboard';
        it(`should have the classname prop equal to ${expectedClassname}`, () => {
            expect(Ads[3].props.className).to.equal(expectedClassname);
        });

        it(`should have the correct sizes prop`, () => {
            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };
            expect(Ads[3].props.sizes).to.deep.equal(expectedSizes);
        });

        const expectedTargets = { position: 2 };
        it(`should have the target prop equal to ${expectedTargets}`, () => {
            expect(Ads[3].props.targets).to.deep.equal(expectedTargets);
        });
    });

    describe(`Middle banner/leaderboard/billboard ad (visibile on xlarge viewports)`, () => {
        const expectedClassname = 'ad--section-middle-leaderboard';
        it(`should have the classname prop equal to ${expectedClassname}`, () => {
            expect(Ads[4].props.className).to.equal(expectedClassname);
        });

        it(`should have the correct sizes prop`, () => {
            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };
            expect(Ads[4].props.sizes).to.deep.equal(expectedSizes);
        });

        const expectedTargets = { position: 2 };
        it(`should have the target prop equal to ${expectedTargets}`, () => {
            expect(Ads[4].props.targets).to.deep.equal(expectedTargets);
        });
    });
});

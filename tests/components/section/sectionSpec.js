import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const GroupStub = Context.createStubComponentWithChildren();
const GroupFeaturedStub = Context.createStubComponentWithChildren();
const GroupRepeatableStub = Context.createStubComponentWithChildren();
const SectionHeroStub = Context.createStubComponentWithChildren();
const Section = proxyquire('../../../app/components/section/section', {
    'react': React,
    '../../actions/facetedModule': {
        getPage: function(){

        }
    },
    '../teaser/teaser': TeaserStub,
    './group': GroupStub,
    './groupFeatured': GroupFeaturedStub,
    './groupRepeatable': GroupRepeatableStub,
    './sectionHero': SectionHeroStub
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
    let GroupFeatured;
    let Groups;
    let GroupRepeatable;
    let SectionHero;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Section);
        section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
        SectionHero = TestUtils.findRenderedComponentWithType(reactModule, SectionHeroStub);
        GroupFeatured = TestUtils.findRenderedComponentWithType(reactModule, GroupFeaturedStub);
        Groups = TestUtils.scryRenderedComponentsWithType(reactModule, GroupStub);
        GroupRepeatable = TestUtils.findRenderedComponentWithType(reactModule, GroupRepeatableStub);
    });

    it(`should render the Section component on the page`, () => {
        expect(React.findDOMNode(section)).to.exist;
    });

    // Hero Section
    it(`should pass firstHero properly`, () => {
        expect(SectionHero.props.firstHero).to.deep.equal(articlesMock.slice(0, 1)[0]);
    });

    it(`should pass second properly`, () => {
        expect(SectionHero.props.secondHero).to.deep.equal(articlesMock.slice(4, 5)[0]);
    });

    // Featured articles
    it(`should pass down the features articles to the GroupFeatured component`, () => {
        expect(GroupFeatured.props.articles).to.deep.equal(featuredArticles);
    });

    describe(`First group of articles`, () => {
        const expectedFirstGroupModifier = '3-items';
        it(`should pass down the ${expectedFirstGroupModifier} modifier to the first group of articles`, () => {
            expect(Groups[0].props.modifier).to.equal(expectedFirstGroupModifier);
        });

        it(`should pass down the next 3 articles to the second group of articles`, () => {
            expect(Groups[0].props.articles).to.deep.equal(articlesMock.slice(4, 7));
        });
    });

    describe(`Second group of articles`, () => {
        const expectedSecondGroupModifier = '6-or-4-items';
        const expectedSecondGroupClass = 'hidden-for-large-only';
        const expectedSecondGroupTeaserModifier = 'img-top';
        it(`should pass down the ${expectedSecondGroupModifier} modifier to the second group of articles`, () => {
            expect(Groups[1].props.modifier).to.equal(expectedSecondGroupModifier);
        });

        it(`should pass down the ${expectedSecondGroupClass} className to the second group of articles`, () => {
            expect(Groups[1].props.className).to.equal(expectedSecondGroupClass);
        });

        it(`should pass down the ${expectedSecondGroupTeaserModifier} teaser modifier to the second group of articles`, () => {
            expect(Groups[1].props.teaserModifier).to.equal(expectedSecondGroupTeaserModifier);
        });

        it(`should pass down the next 4 articles to the second group of articles`, () => {
            expect(Groups[1].props.articles).to.deep.equal(articlesMock.slice(7, 11));
        });
    });

    describe(`Third group of articles`, () => {
        const expectedThirdGroupModifier = '6-or-4-items';
        const expectedThirdGroupClass = 'visible-for-large-only';
        const expectedThirdGroupTeaserModifier = 'img-top';
        it(`should pass down the ${expectedThirdGroupModifier} modifier to the second group of articles`, () => {
            expect(Groups[2].props.modifier).to.equal(expectedThirdGroupModifier);
        });

        it(`should pass down the ${expectedThirdGroupClass} className to the second group of articles`, () => {
            expect(Groups[2].props.className).to.equal(expectedThirdGroupClass);
        });

        it(`should pass down the ${expectedThirdGroupTeaserModifier} teaser modifier to the second group of articles`, () => {
            expect(Groups[2].props.teaserModifier).to.equal(expectedThirdGroupTeaserModifier);
        });

        it(`should pass down the next 6 articles to the second group of articles`, () => {
            expect(Groups[2].props.articles).to.deep.equal(articlesMock.slice(5, 11));
        });
    });

    describe(`repeatable group of articles`, () => {
        it(`should pass down the remaining articles to the repeatable group`, () => {
            expect(GroupRepeatable.props.articles).to.deep.equal(articlesMock.slice(11, articlesMock.length));
        });
    });
});

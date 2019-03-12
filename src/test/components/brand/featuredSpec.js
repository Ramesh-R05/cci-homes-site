import { betterMockComponentContext } from '@bxm/flux';
import heroMock from '../../mock/article';
import { articles as articlesMock } from '../../mock/articles';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const StickyStub = Context.createStubComponentWithChildren();
const SocialAndSubscribeLinksStub = Context.createStubComponent();
const Featured = proxyquire('../../../app/components/brand/featured', {
    react: React,
    '../teaser/teaser': TeaserStub,
    '@bxm/behaviour/lib/components/sticky': StickyStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../socialAndSubscribeLinks': SocialAndSubscribeLinksStub
});

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        get() {
            return localData;
        }
    }
};

describe('Brand Featured', () => {
    let reactModule, hero, teasers, polarTeasers, ads;
    const sectionClass = `brand-section`;
    const brand = 'Real Living';
    const brandConfig = { social: {} };
    const polarTargetsStub = [{ index: 0 }, { index: 5 }];

    describe('with all props', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured hero={heroMock} articles={articlesMock} brand={brand} brandConfig={brandConfig} polarTargets={polarTargetsStub} />
            );
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            hero = teasers.shift();
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        it(`should render the component with the class section`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
            expect(ReactDOM.findDOMNode(reactModule).className).to.contain(sectionClass);
        });

        const expectedNumTeasers = 6;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        it(`should render the hero as the 1st hero teaser`, () => {
            const heroProps = {
                ...heroMock,
                modifier: 'hero',
                gtmClass: 'gtm-hero-brand',
                sizes: 'home-hero',
                className: 'brand-section__hero-teaser columns small-12'
            };
            expect(hero.props).to.deep.equal(heroProps);
        });

        const componentData = {
            modifier: 'img-top',
            sizes: 'brand-list',
            gtmClass: 'gtm-topteaserlist-brand'
        };

        it(`should render the 1st article as the 1st teaser with polar index of 0`, () => {
            const teaserProps = {
                ...articlesMock[0],
                ...componentData,
                polar: { index: 0 },
                className: 'brand-section__grid-item brand-section__grid-teaser columns small-12 medium-6 brand-section__polar-teaser'
            };

            expect(teasers[0].props).to.deep.equal(teaserProps);
        });

        it(`should render the 2nd article as the 2nd teaser`, () => {
            const teaserProps = {
                ...articlesMock[1],
                ...componentData,
                polar: false,
                className: 'brand-section__grid-item brand-section__grid-teaser columns small-12 medium-6'
            };
            expect(teasers[1].props).to.deep.equal(teaserProps);
        });

        it(`should render the 3rd article as the 3rd teaser`, () => {
            const teaserProps = {
                ...articlesMock[2],
                ...componentData,
                polar: false,
                className: 'brand-section__grid-item brand-section__grid-teaser columns small-12 medium-6'
            };

            expect(teasers[2].props).to.deep.equal(teaserProps);
        });

        it(`should render the 4th article as the 4th teaser`, () => {
            const teaserProps = {
                ...articlesMock[3],
                ...componentData,
                polar: false,
                className: 'brand-section__grid-item brand-section__grid-teaser columns small-12 medium-6'
            };
            expect(teasers[3].props).to.deep.equal(teaserProps);
        });

        it(`should render the 5th article as the 5th teaser`, () => {
            const teaserProps = {
                ...articlesMock[4],
                ...componentData,
                polar: false,
                className: 'brand-section__grid-item brand-section__grid-teaser columns small-12 medium-6'
            };

            expect(teasers[4].props).to.deep.equal(teaserProps);
        });

        it(`should render the 6th article as the 6nd teaser with polar index 5`, () => {
            const teaserProps = {
                ...articlesMock[5],
                ...componentData,
                polar: { index: 5 },
                className: 'brand-section__grid-item brand-section__grid-teaser columns small-12 medium-6 brand-section__polar-teaser'
            };
            expect(teasers[5].props).to.deep.equal(teaserProps);
        });

        const expectedNumAds = 3;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });
    });

    describe('without the hero prop as an undefined', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured hero={undefined} articles={articlesMock} brand={brand} brandConfig={brandConfig} polarTargets={polarTargetsStub} />
            );
        });

        it('should still be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without the hero prop as an empty object', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured hero={{}} articles={articlesMock} brand={brand} brandConfig={brandConfig} polarTargets={polarTargetsStub} />
            );
        });

        it('should still be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without the hero prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured articles={articlesMock} brand={brand} brandConfig={brandConfig} polarTargets={polarTargetsStub} />
            );
        });

        it('should still be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without the articles prop as an empty array', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured hero={heroMock} articles={[]} brand={brand} brandConfig={brandConfig} polarTargets={polarTargetsStub} />
            );
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured brand={brand} brandConfig={brandConfig} polarTargets={polarTargetsStub} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without brand prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured hero={heroMock} articles={articlesMock} brandConfig={brandConfig} polarTargets={polarTargetsStub} />
            );
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without brandConfig prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured hero={heroMock} articles={articlesMock} brand={brand} polarTargets={polarTargetsStub} />
            );
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without polarTargets prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured hero={heroMock} articles={articlesMock} brand={brand} />);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        const expectedNumTeasers = 7;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });
    });
});

import {betterMockComponentContext} from '@bxm/flux';
import heroMock from '../../mock/article';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const StickyStub = Context.createStubComponentWithChildren();
const Featured = proxyquire('../../../app/components/brand/featured', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '@bxm/behaviour/lib/components/sticky': StickyStub,
    '@bxm/ad/lib/google/components/ad': AdStub
});

describe('Brand Featured', () => {
    let reactModule, hero, teasers, ads;
    const sectionClass = `brand-section`;
    const brand = 'Real Living';
    const brandConfig = {social: {}};

    describe('with all props', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured hero={heroMock} articles={articlesMock} brand={brand} brandConfig={brandConfig} />
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
            const componentData = heroMock;
            componentData.modifier = 'hero';
            componentData.sizes = 'home-hero';
            expect(hero.props).to.deep.equal(componentData);
        });

        it(`should render the 1st article as the 1st teaser`, () => {
            const componentData = articlesMock[0];
            componentData.modifier = 'img-top';
            componentData.sizes = 'brand-list';
            expect(teasers[0].props).to.deep.equal(componentData);
        });

        it(`should render the 2nd article as the 2nd teaser`, () => {
            const componentData = articlesMock[1];
            componentData.modifier = 'img-top';
            componentData.sizes = 'brand-list';
            expect(teasers[1].props).to.deep.equal(componentData);
        });

        it(`should render the 3rd article as the 3rd teaser`, () => {
            const componentData = articlesMock[2];
            componentData.modifier = 'img-top';
            componentData.sizes = 'brand-list';
            expect(teasers[2].props).to.deep.equal(componentData);
        });

        it(`should render the 4th article as the 4th teaser`, () => {
            const componentData = articlesMock[3];
            componentData.modifier = 'img-top';
            componentData.sizes = 'brand-list';
            expect(teasers[3].props).to.deep.equal(componentData);
        });

        it(`should render the 5th article as the 5th teaser`, () => {
            const componentData = articlesMock[4];
            componentData.modifier = 'img-top';
            componentData.sizes = 'brand-list';
            expect(teasers[4].props).to.deep.equal(componentData);
        });

        it(`should render the 6th article as the 6th teaser`, () => {
            const componentData = articlesMock[5];
            componentData.modifier = 'img-top';
            componentData.sizes = 'brand-list';
            expect(teasers[5].props).to.deep.equal(componentData);
        });

        const expectedNumAds = 3;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });
    });

    describe('without the hero prop as an undefined', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured hero={undefined} articles={articlesMock} brand={brand} brandConfig={brandConfig} />);
        });

        it('should still be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without the hero prop as an empty object', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured hero={{}} articles={articlesMock} brand={brand} brandConfig={brandConfig} />);
        });

        it('should still be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without the hero prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured articles={articlesMock} brand={brand} brandConfig={brandConfig} />);
        });

        it('should still be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without the articles prop as an empty array', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured hero={heroMock} articles={[]} brand={brand} brandConfig={brandConfig} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured brand={brand} brandConfig={brandConfig} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without brand prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured hero={heroMock} articles={articlesMock} brandConfig={brandConfig} />);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

    describe('without brandConfig prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured hero={heroMock} articles={articlesMock} brand={brand} />);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });
    });

});

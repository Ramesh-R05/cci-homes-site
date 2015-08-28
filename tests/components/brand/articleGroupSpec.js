import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const ArticleGroup = proxyquire('../../../app/components/brand/articleGroup', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub
});

describe('Brand ArticleGroup', () => {
    const expectedNumTeasers = 7;

    describe(`with ${expectedNumTeasers} articles`, () => {
        let reactModule;
        let teasers;
        let ads;
        const sectionClass = `brand-section`;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <ArticleGroup articles={articlesMock.slice(0, 7)} />
            );
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        it(`should render the component with the class section`, () => {
            expect(React.findDOMNode(reactModule)).to.exist;
            expect(React.findDOMNode(reactModule).className).to.contain(sectionClass);
        });

        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        it(`should render the 1st article as the 1st teaser`, () => {
            const componentData = articlesMock[0];
            componentData.modifier = 'img-left';
            expect(teasers[0].props).to.deep.equal(componentData);
        });

        it(`should render the 2nd article as the 2nd teaser`, () => {
            const componentData = articlesMock[1];
            componentData.modifier = 'img-left';
            expect(teasers[1].props).to.deep.equal(componentData);
        });

        it(`should render the 3rd article as the first teaser`, () => {
            const componentData = articlesMock[2];
            componentData.modifier = 'img-left';
            expect(teasers[2].props).to.deep.equal(componentData);
        });

        it(`should render the 4th article as the 4th teaser`, () => {
            const componentData = articlesMock[3];
            componentData.modifier = 'img-top';
            componentData.sizes = 'large';
            expect(teasers[3].props).to.deep.equal(componentData);
        });

        it(`should render the 5th article as the 5th teaser`, () => {
            const componentData = articlesMock[4];
            componentData.modifier = 'img-top';
            componentData.sizes = 'large';
            expect(teasers[4].props).to.deep.equal(componentData);
        });

        it(`should render the 6th article as the 6th teaser`, () => {
            const componentData = articlesMock[5];
            componentData.modifier = 'img-top';
            componentData.sizes = 'large';
            expect(teasers[5].props).to.deep.equal(componentData);
        });

        it(`should render the 7th article as the 7th teaser`, () => {
            const componentData = articlesMock[6];
            componentData.modifier = 'img-top';
            componentData.sizes = 'large';
            expect(teasers[6].props).to.deep.equal(componentData);
        });

        const expectedNumAds = 1;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });
    });

    describe('without the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<ArticleGroup articles={[]} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<ArticleGroup />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

});

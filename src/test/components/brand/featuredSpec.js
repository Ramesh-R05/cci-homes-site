import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const SubscribeStub  = Context.createStubComponent();
const SocialStub   = Context.createStubComponent();
const Featured = proxyquire('../../../app/components/brand/featured', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    './subscribe': SubscribeStub,
    './social': SocialStub,
    '@bxm/ad/lib/google/components/ad': AdStub
});

describe('Brand Featured', () => {
    let reactModule;
    let teasers;
    let ads;
    let subscribes;
    let social;
    const sectionClass = `brand-section`;
    const brand = 'Real Living';
    const brandConfig = {social: {}, subscribe: {image: 'http://image.com', link: 'http://link.com'}};

    describe('with all props', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Featured articles={articlesMock} brand={brand} brandConfig={brandConfig} />
            );
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            subscribes = TestUtils.scryRenderedComponentsWithType(reactModule, SubscribeStub);
            social = TestUtils.scryRenderedComponentsWithType(reactModule, SocialStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        it(`should render the component with the class section`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
            expect(ReactDOM.findDOMNode(reactModule).className).to.contain(sectionClass);
        });

        const expectedNumTeasers = 5;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        it(`should render the social component with relevant props`, () => {
            expect(social[0].props).to.deep.equal({
                brand, social: brandConfig.social
            });
        });

        const expectedNumSubscribes = 2;
        it(`should render ${expectedNumSubscribes} subscribe components`, () => {
            expect(subscribes.length).to.equal(expectedNumSubscribes);
        });

        it(`should render the 1st subscribe component with relevant props`, () => {
            expect(subscribes[0].props).to.deep.equal({
                className: `show-for-xlarge-up`,
                image: brandConfig.subscribe.image,
                link: brandConfig.subscribe.link
            });
        });

        it(`should render the 2nd subscribe component with relevant props`, () => {
            expect(subscribes[1].props).to.deep.equal({
                className: `hide-for-xlarge-up`,
                image: brandConfig.subscribe.image,
                link: brandConfig.subscribe.link
            });
        });

        it(`should render the 1st article as the 1st hero teaser`, () => {
            const componentData = articlesMock[0];
            componentData.modifier = 'hero';
            componentData.sizes = 'home-hero';
            expect(teasers[0].props).to.deep.equal(componentData);
        });

        it(`should render the 2nd article as the 2nd teaser`, () => {
            const componentData = articlesMock[1];
            componentData.modifier = 'img-top';
            componentData.sizes = 'large';
            expect(teasers[1].props).to.deep.equal(componentData);
        });

        it(`should render the 3rd article as the first teaser`, () => {
            const componentData = articlesMock[2];
            componentData.modifier = 'img-top';
            componentData.sizes = 'large';
            expect(teasers[2].props).to.deep.equal(componentData);
        });

        it(`should render the 4th article as the 4th teaser`, () => {
            const componentData = articlesMock[3];
            componentData.modifier = 'img-top';
            componentData.sizes = 'large';
            expect(teasers[3].props).to.deep.equal(componentData);
        });

        const expectedNumAds = 1;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });
    });

    describe('without the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured articles={[]} brand={brand} brandConfig={brandConfig} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured brand={brand} brandConfig={brandConfig} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without brand prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured articles={articlesMock} brandConfig={brandConfig} />);
            social = TestUtils.scryRenderedComponentsWithType(reactModule, SocialStub);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the social component with relevant props`, () => {
            expect(social[0].props).to.deep.equal({
                brand: undefined, social: brandConfig.social
            });
        });
    });

    describe('without brandConfig prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Featured articles={articlesMock} brand={brand} />);
            subscribes = TestUtils.scryRenderedComponentsWithType(reactModule, SubscribeStub);
            social = TestUtils.scryRenderedComponentsWithType(reactModule, SocialStub);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the social component with relevant props`, () => {
            expect(social[0].props).to.deep.equal({
                brand, social: undefined
            });
        });

        it(`should render the 1st subscribe component with relevant props`, () => {
            expect(subscribes[0].props).to.deep.equal({
                className: `show-for-xlarge-up`,
                image: '',
                link: ''
            });
        });

        it(`should render the 2nd subscribe component with relevant props`, () => {
            expect(subscribes[1].props).to.deep.equal({
                className: `hide-for-xlarge-up`,
                image: '',
                link: ''
            });
        });
    });

});

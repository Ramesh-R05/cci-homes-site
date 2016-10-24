import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const AdStub = Context.createStubComponent();
const Header = proxyquire('../../../app/components/brand/header', {
    'react': React,
    '@bxm/ad/lib/google/components/ad': AdStub
});

describe('Brand Header', () => {
    let reactModule;
    let logo;
    let logoImage;
    let ads;
    const brand = 'Belle';
    const logoUrl = 'http://image.com';

    describe('with all prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Header brand={brand} logo={logoUrl} />
            );
            logo = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'brand__logo');
            logoImage = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'img');
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render 1 brand logo`, () => {
            expect(logo.length).to.equal(1);
        });

        it(`should render the logo using the logo prop`, () => {
            expect(logoImage[0].props.src).to.equal(logoUrl);
        });

        it(`should render the logo using the brand as the alt attribute`, () => {
            expect(logoImage[0].props.alt).to.equal(brand);
        });

        const expectedNumAds = 1;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });
    });

    describe('without the logo prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without an empty logo prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header logo="" />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

});
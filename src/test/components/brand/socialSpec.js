import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const SocialIconStub = Context.createStubComponent();
const Social = proxyquire('../../../app/components/brand/social', {
    'react': React,
    './socialIcon': SocialIconStub
});

describe('Brand Social', () => {
    let reactModule;
    let icons;
    let followText;
    const brand = 'belle';
    let social = {
        facebook: 'http://fb.com',
        instagram: 'http://insta.com',
        twitter: 'http://twitter.com',
        pinterest: 'http://pinterest.com'
    };

    describe('with all props', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Social brand={brand} social={social} />
            );
            icons = TestUtils.scryRenderedComponentsWithType(reactModule, SocialIconStub);
            followText = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'p');
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it(`should render the text 'Follow ${brand}'`, () => {
            expect(ReactDOM.findDOMNode(followText).textContent).to.equal(`Follow ${brand}`);
        });

        const expectedNumIcons = 4;
        it(`should render ${expectedNumIcons} social icons`, () => {
            expect(icons.length).to.equal(expectedNumIcons);
        });

        it(`should pass the correct data to the 1st social icon`, () => {
            expect(icons[0].props.name).to.equal('facebook');
            expect(icons[0].props.url).to.equal(social.facebook);
        });

        it(`should pass the correct data to the 2nd social icon`, () => {
            expect(icons[1].props.name).to.equal('instagram');
            expect(icons[1].props.url).to.equal(social.instagram);
        });

        it(`should pass the correct data to the 3rd social icon`, () => {
            expect(icons[2].props.name).to.equal('twitter');
            expect(icons[2].props.url).to.equal(social.twitter);
        });

        it(`should pass the correct data to the 4th social icon`, () => {
            expect(icons[3].props.name).to.equal('pinterest');
            expect(icons[3].props.url).to.equal(social.pinterest);
        });
    });

    describe('with only 2 social icon in social prop', () => {
        before(() => {
            delete social.facebook;
            delete social.twitter;

            reactModule = TestUtils.renderIntoDocument(
                <Social brand={brand} social={social} />
            );
            icons = TestUtils.scryRenderedComponentsWithType(reactModule, SocialIconStub);
        });

        const expectedNumIcons = 2;
        it(`should render ${expectedNumIcons} social icons`, () => {
            expect(icons.length).to.equal(expectedNumIcons);
        });

        it(`should pass the correct data to the 1st social icon`, () => {
            expect(icons[0].props.name).to.equal('instagram');
            expect(icons[0].props.url).to.equal(social.instagram);
        });

        it(`should pass the correct data to the 2nd social icon`, () => {
            expect(icons[1].props.name).to.equal('pinterest');
            expect(icons[1].props.url).to.equal(social.pinterest);
        });
    });

    describe('without social prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Social brand={brand} />);
            icons = TestUtils.scryRenderedComponentsWithType(reactModule, SocialIconStub);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        const expectedNumIcons = 0;
        it(`should render ${expectedNumIcons} social icons`, () => {
            expect(icons.length).to.equal(expectedNumIcons);
        });
    });

    describe('without brand prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Social social={social} />);
        });

        it(`should render the component`, () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

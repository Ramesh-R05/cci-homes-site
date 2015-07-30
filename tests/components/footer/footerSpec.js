import {betterMockComponentContext} from '@bxm/flux';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const FooterSocialLinksStub = Context.createStubComponentWithChildren();
const FooterNetworkInfoStub = Context.createStubComponentWithChildren();
const FooterNavigationStub = Context.createStubComponentWithChildren();
const FooterMagShopStub = Context.createStubComponentWithChildren();
const FooterNewsletterStub = Context.createStubComponent();

const Footer = proxyquire('../../../app/components/footer/footer', {
    'react': React,
    './footerMagShop': FooterMagShopStub,
    './footerNavigation': FooterNavigationStub,
    './footerNetworkInfo': FooterNetworkInfoStub,
    '../newsletter/newsletter': FooterNewsletterStub,
    './footerSocialLinks': FooterSocialLinksStub
});

describe(`Footer`, () => {
    let reactModule;
    let footerCopyright;
    let footerMagShop;
    let footerNavigation;
    let footerNetworkInfo;
    let footerNewsletter;
    let footerSocialLinks;

    before(() => {
        reactModule = Context.mountComponent(Footer);
        footerMagShop = TestUtils.findRenderedComponentWithType(reactModule, FooterMagShopStub);
        footerNavigation = TestUtils.findRenderedComponentWithType(reactModule, FooterNavigationStub);
        footerNetworkInfo = TestUtils.findRenderedComponentWithType(reactModule, FooterNetworkInfoStub);
        footerNewsletter = TestUtils.findRenderedComponentWithType(reactModule, FooterNewsletterStub);
        footerSocialLinks = TestUtils.findRenderedComponentWithType(reactModule, FooterSocialLinksStub);
    });

    it(`should render the FooterMagShop Component`, () => {
        expect(footerMagShop).to.exist;
    });

    it(`should render the FooterNavigation Component`, () => {
        expect(footerNavigation).to.exist;
    });

    it(`should render the FooterNetworkInfo Component`, () => {
        expect(footerNetworkInfo).to.exist;
    });

    it(`should render the FooterNewsletter Component`, () => {
        expect(footerNewsletter).to.exist;
    });

    it(`should render the FooterSocialLinks Component`, () => {
        expect(footerSocialLinks).to.exist;
    });

});

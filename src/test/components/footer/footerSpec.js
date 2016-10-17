import {betterMockComponentContext} from '@bxm/flux';
import localeData from '../../mock/config';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const FooterSocialLinksStub = Context.createStubComponentWithChildren();
const FooterNetworkInfoStub = Context.createStubComponentWithChildren();
const FooterNavigationStub = Context.createStubComponentWithChildren();
const MagShopStub = Context.createStubComponentWithChildren();
const FooterNewsletterStub = Context.createStubComponent();
const BackToTopStub = Context.createStubComponent();

const Footer = proxyquire('../../../app/components/footer/footer', {
    'react': React,
    '../magshop/magshop': MagShopStub,
    './footerNavigation': FooterNavigationStub,
    './footerNetworkInfo': FooterNetworkInfoStub,
    '@bxm/newsletter/lib/components/newsletter': FooterNewsletterStub,
    './footerSocialLinks': FooterSocialLinksStub,
    '@bxm/ui/lib/back-to-top/backToTop': BackToTopStub
});

describe(`Footer`, () => {
    let reactModule;
    let magshop;
    let footerNavigation;
    let footerNetworkInfo;
    let footerNewsletter;
    let footerSocialLinks;
    let backToTop;

    describe('with default props', () => {
        before(() => {
            reactModule = Context.mountComponent(Footer, {
                config: localeData
            });
            magshop = TestUtils.findRenderedComponentWithType(reactModule, MagShopStub);
            footerNavigation = TestUtils.findRenderedComponentWithType(reactModule, FooterNavigationStub);
            footerNetworkInfo = TestUtils.findRenderedComponentWithType(reactModule, FooterNetworkInfoStub);
            footerNewsletter = TestUtils.findRenderedComponentWithType(reactModule, FooterNewsletterStub);
            footerSocialLinks = TestUtils.findRenderedComponentWithType(reactModule, FooterSocialLinksStub);
            backToTop = TestUtils.findRenderedComponentWithType(reactModule, BackToTopStub);
        });

        it(`should render the MagShop Component`, () => {
            expect(magshop).to.exist;
        });

        it(`should set the MagShop 'content' props to correct config`, () => {
            expect(magshop.props.content).to.deep.equal(localeData.magShop);
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

        const expectedIframeUrl = `${localeData.newsletterIframeUrl}!wnfooter`;
        it(`should set FooterNewsletter 'url' prop to ${expectedIframeUrl}`, () => {
            expect(footerNewsletter.props.url).to.equal(expectedIframeUrl);
        });

        it(`should render the FooterSocialLinks Component`, () => {
            expect(footerSocialLinks).to.exist;
        });

        const expectedBackToTopClassName = 'button';
        it(`should render the BackToTop with the classname prop equal to '${expectedBackToTopClassName} `, () => {
            expect(backToTop.props.className).to.equal(expectedBackToTopClassName);
        });
    });

    describe('with a modifier prop', () => {
        const modifier = 'article';
        let footer;

        before(() => {
            reactModule = Context.mountComponent(Footer, {
                config: localeData,
                modifier: modifier
            });
            footer = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'footer');
        });

        const expectedModifierClassName = `footer--${modifier}`;
        it(`should render footer with the ${expectedModifierClassName} class`, () => {
            expect(ReactDOM.findDOMNode(footer).getAttribute('class')).to.contain(expectedModifierClassName);
        });
    });

    describe('with an iframeKey prop', () => {
        const iframeKey = 'article';

        before(() => {
            reactModule = Context.mountComponent(Footer, {
                config: localeData,
                iframeKey: iframeKey
            });
            footerNewsletter = TestUtils.findRenderedComponentWithType(reactModule, FooterNewsletterStub);
        });

        const expectedIframeUrl = `${localeData.newsletterIframeUrl}!${iframeKey}`;
        it(`should set FooterNewsletter 'url' prop to ${expectedIframeUrl}`, () => {
            expect(footerNewsletter.props.url).to.equal(expectedIframeUrl);
        });
    });
});

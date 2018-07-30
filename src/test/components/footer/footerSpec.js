import { betterMockComponentContext } from '@bxm/flux';
import brandsMock from '../../mock/brands';
import { localeData } from '../../mock/config';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const config = {
    get: () => {}
};

const FooterSocialContainerStub = Context.createStubComponentWithChildren();
const FooterBrandLinksStub = Context.createStubComponentWithChildren();
const FooterNavigationStub = Context.createStubComponentWithChildren();
const BackToTopStub = Context.createStubComponent();

const Footer = proxyquire('../../../app/components/footer/footer', {
    react: React,
    '../social/socialContainer': FooterSocialContainerStub,
    './footerBrandLinks': FooterBrandLinksStub,
    './footerNavigation': FooterNavigationStub,
    '@bxm/ui/lib/back-to-top/backToTop': BackToTopStub
});

describe(`Footer`, () => {
    let reactModule;
    let footerSocialContainer;
    let footerBrandLinks;
    let footerNavigation;
    let backToTop;
    let data;

    const footerDataStub = brandsMock;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            brands: {
                footer: footerDataStub
            }
        }
    };

    before(() => {
        data = sinon.stub(config, 'get').returns(localeData);
    });

    after(() => {
        data.restore();
    });

    describe('with default props', () => {
        before(() => {
            reactModule = Context.mountComponent(Footer, {}, [contextConfigStub]);
            footerSocialContainer = TestUtils.findRenderedComponentWithType(reactModule, FooterSocialContainerStub);
            footerBrandLinks = TestUtils.findRenderedComponentWithType(reactModule, FooterBrandLinksStub);
            footerNavigation = TestUtils.findRenderedComponentWithType(reactModule, FooterNavigationStub);
            backToTop = TestUtils.findRenderedComponentWithType(reactModule, BackToTopStub);
        });

        it(`should render the FooterSocialContainer Component`, () => {
            expect(footerSocialContainer).to.exist;
        });

        it(`should render the FooterNetworkInfo Component`, () => {
            expect(footerBrandLinks).to.exist;
        });

        it(`should set the FooterLogos footerBrands prop to correct data`, () => {
            expect(footerBrandLinks.props.footerBrands).to.deep.equal(footerDataStub);
        });

        it(`should render the FooterNavigation Component`, () => {
            expect(footerNavigation).to.exist;
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
            reactModule = Context.mountComponent(
                Footer,
                {
                    config: localeData,
                    modifier: modifier
                },
                [contextConfigStub]
            );
            footer = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'footer');
        });

        const expectedModifierClassName = `footer--${modifier}`;
        it(`should render footer with the ${expectedModifierClassName} class`, () => {
            expect(ReactDOM.findDOMNode(footer).getAttribute('class')).to.contain(expectedModifierClassName);
        });
    });

    describe('with footer wrapper element', () => {
        let footer;

        before(() => {
            reactModule = Context.mountComponent(Footer, {}, [contextConfigStub]);
            footer = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'footer');
        });

        const expectedFooterWrapperClassName = 'footer__wrapper';
        it(`should render footer wrapper with the ${expectedFooterWrapperClassName} class`, () => {
            expect(ReactDOM.findDOMNode(footer).parentNode.getAttribute('class')).to.contain(expectedFooterWrapperClassName);
        });
    });
});

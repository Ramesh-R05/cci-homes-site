import { betterMockComponentContext } from '@bxm/flux';
import brandsMock from '../../mock/brands';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const proxyquire = require('proxyquire').noCallThru();
const InlineSVGStub = Context.createStubComponent();

const FooterBrandLinks = proxyquire('../../../app/components/footer/footerBrandLinks', {
    react: React,
    'react-inlinesvg': InlineSVGStub
});

describe(`FooterBrandLinks`, () => {
    let reactModule;
    let links;
    const footerDataStub = brandsMock;
    const testProps = {
        footerBrands: footerDataStub,
        className: 'footer__logos-list'
    };
    const trackClickSpy = { push: sinon.spy() };

    before(() => {
        window.dataLayer = trackClickSpy;
        reactModule = Context.mountComponent(FooterBrandLinks, testProps);
        links = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
    });

    it('should render correct number of links accounting for each brand', () => {
        expect(links.length).to.eq(4);
    });

    it('should open each link in the same window', () => {
        links.forEach(link => {
            expect(ReactDOM.findDOMNode(link).getAttribute('target')).to.be.null;
        });
    });

    describe(`GTM Classnames correct`, () => {
        it('should have link set with common GTM className', () => {
            links.forEach(link => {
                expect(link.props.className).to.contain('gtm-footer-brand');
            });
        });
    });
});

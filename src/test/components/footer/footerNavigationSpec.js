import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();

const FooterNavigation = proxyquire('../../../app/components/footer/footerNavigation', {
    'react': React
});

const expectedAnchorsCount = 3;

describe(`FooterNavigation`, () => {
    let reactModule;
    let anchors;

    before(() => {
        reactModule = Context.mountComponent(FooterNavigation);
        anchors = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, `a`);
    });

    it(`should render the FooterNavigation Component`, () => {
        expect(ReactDOM.findDOMNode(reactModule)).to.exist;
    });

    it(`should render ${expectedAnchorsCount} Anchors`, () => {
        expect(anchors.length).to.eq(expectedAnchorsCount);
    });

    it('should have link that is set with the correct GTM className of for Privacy Policy', () => {
        expect(anchors[0].props.className).to.contain('gtm-footer-privacy');
    });

    it('should have link that is set with the correct GTM className of for Advertise', () => {
        expect(anchors[1].props.className).to.contain('gtm-footer-advertising');
    });

    it('should have link that is set with the correct GTM className of for Terms of Use', () => {
        expect(anchors[2].props.className).to.contain('gtm-footer-terms');
    });

    it('should open Privacy Policy, Advertise, and Terms of Use in a new window', () => {
        anchors.forEach((anchor) => {
            expect(ReactDOM.findDOMNode(anchor).getAttribute('target')).to.eq('_blank');
        });
    });
});

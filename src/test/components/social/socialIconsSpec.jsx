import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
const InlineSVGStub = Context.createStubComponent();

const SocialIcon = proxyquire('../../../app/components/social/socialIcons', {
    'react': React,
    'react-inlinesvg': InlineSVGStub
}).default;

const dataLayerStub = {
    push: sinon.spy()
};

describe(`SocialIcons`, () => {
    const name = 'socialName';
    const url = 'http://www.socialpage.com';
    const className = `social-link`;

    let previousDataLayer;
    let reactModule;
    let anchor;
    let svgSpan;

    before(() => {
        previousDataLayer = window.dataLayer;
        window.dataLayer = dataLayerStub;

        reactModule = Context.mountComponent(SocialIcon, { name, url });
        anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[0];
        svgSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'social-link__icon')[0];
    });

    beforeEach(() => {
        dataLayerStub.push.reset();
    });

    after(() => {
        window.dataLayer = previousDataLayer;
    });

    it(`renders`, () => {
        expect(ReactDOM.findDOMNode(reactModule)).to.exist;
    });

    it('should have link that is set with the correct common GTM className', () => {
        expect(anchor.props.className).to.contain('gtm-footer-social');
    });

    it(`sets the className to "${className} social-link--socialName"`, () => {
        expect(ReactDOM.findDOMNode(reactModule).props.className).to.equal(className + ' social-link--socialName');
    });

    it(`renders the link with href "${url}"`, () => {
        expect(anchor.props.href).to.eq(url);
    });

    it(`sends clicks to the data layer`, () => {
        TestUtils.Simulate.click(anchor);
        expect(dataLayerStub.push).to.have.been.calledOnce;
        expect(dataLayerStub.push).to.have.been.calledWith({ event: `click:social:${name}` });
    });
});

import {betterMockComponentContext} from '@bxm/flux';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const FooterSocialIcon = proxyquire('../../../app/components/footer/footerSocialIcon', {
    'react': React
});

const dataLayerStub = { push: sinon.spy() };

describe(`FooterSocialIcon`, () => {
    const svg = '<svg version="1.0" />';
    const name = 'socialName';
    const url = 'http://www.socialpage.com';
    const label = '@IamaLabel';
    const className = `social-link`;

    let previousDataLayer;
    let reactModule;
    let anchor;
    let svgSpan;
    let labelSpan;

    before(() => {
        previousDataLayer = window.dataLayer;
        window.dataLayer = dataLayerStub;

        reactModule = Context.mountComponent(FooterSocialIcon, { svg, name, url, label });
        anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[0];
        svgSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'social-link__icon')[0];
        labelSpan = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'social-link__label')[0];
    });

    beforeEach(() => {
        dataLayerStub.push.reset();
    });

    after(() => {
        window.dataLayer = previousDataLayer;
    });

    it(`renders`, () => {
        expect(React.findDOMNode(reactModule)).to.exist;
    });

    it(`sets the className to "${className}"`, () => {
        expect(React.findDOMNode(reactModule)).to.have.className(className);
    });

    it(`renders the link with href "${url}"`, () => {
        expect(anchor.props.href).to.eq(url);
    });

    it(`renders the social icon svg`, () => {
        expect(svgSpan.props.dangerouslySetInnerHTML.__html).to.eq(svg);
    });

    it(`renders the label with text "${label}"`, () => {
        expect(React.findDOMNode(labelSpan).textContent).to.eq(label);
    });

    it(`sends clicks to the data layer`, () => {
        TestUtils.Simulate.click(anchor);
        expect(dataLayerStub.push).to.have.been.calledOnce;
        expect(dataLayerStub.push).to.have.been.calledWith({
            event: `click:social:${name}`
        });
    });
});

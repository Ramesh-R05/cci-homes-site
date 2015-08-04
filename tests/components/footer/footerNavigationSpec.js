import {betterMockComponentContext} from '@bxm/flux';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const FooterNavigation = proxyquire('../../../app/components/footer/footerNavigation', {
    'react': React
});

const nbAnchors = 3;

describe(`FooterNavigation`, () => {
    let reactModule;
    let anchors;

    before(() => {
        reactModule = Context.mountComponent(FooterNavigation);
        anchors = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, `a`);
    });

    it(`should render the FooterNavigation Component`, () => {
        expect(React.findDOMNode(reactModule)).to.exist;
    });

    it(`should render ${nbAnchors} Anchors`, () => {
        expect(anchors.length).to.eq(nbAnchors);
    });
});

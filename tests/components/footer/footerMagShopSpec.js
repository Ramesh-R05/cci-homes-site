import {betterMockComponentContext} from '@bxm/flux';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const FooterMagShop = proxyquire('../../../app/components/footer/footerMagShop', {
    'react': React
});

const dataLayerStub = {
    push: sinon.spy()
};

describe(`FooterMagShop`, () => {
    let previousDataLayer;
    let reactModule;

    before(() => {
        previousDataLayer = window.dataLayer;
        window.dataLayer = dataLayerStub;
        reactModule = Context.mountComponent(FooterMagShop);
    });

    after(() => {
        window.dataLayer = previousDataLayer;
    });

    it(`should render the FooterMagShop Component`, () => {
        expect(React.findDOMNode(reactModule)).to.exist;
    });

    describe(`data layer interaction`, () => {
        beforeEach(() => {
            dataLayerStub.push.reset();
        });

        it(`pushes subscription on clicking cover image`, () => {
            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(reactModule, `img`));
            expect(dataLayerStub.push).to.have.been.calledWith({event: 'subscribe.click'});
        });

        it(`pushes subscription on clicking Subscribe btn`, () => {
            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(reactModule, `button--subscribe`));
            expect(dataLayerStub.push).to.have.been.calledWith({event: 'subscribe.click'});
        });
    });
});

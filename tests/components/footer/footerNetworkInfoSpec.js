import {betterMockComponentContext} from '@bxm/flux';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;

const FooterNetworkInfo = proxyquire('../../../app/components/footer/footerNetworkInfo', {
    'react': React
});


describe(`FooterNetworkInfo`, () => {
    let reactModule;

    before(() => {
        reactModule = Context.mountComponent(FooterNetworkInfo);
    });

    it(`should render the FooterNetworkInfo Component`, () => {
        expect(React.findDOMNode(reactModule)).to.exist;
    });
});

import {betterMockComponentContext} from '@bxm/flux';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;

const Newsletter = proxyquire('../../../app/components/newsletter/newsletter', {
    'react': React
});

describe(`Newsletter`, () => {
    let reactModule;
    const url = 'http://iframeUrl.com';
    before(() => {
        reactModule = Context.mountComponent(Newsletter, {url});
    });

    it(`should render the Newsletter Component`, () => {
        expect(React.findDOMNode(reactModule)).to.exist;
    });
});

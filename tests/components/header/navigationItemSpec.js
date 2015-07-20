import {betterMockComponentContext} from '@bxm/flux';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const NavigationItem = proxyquire('../../../app/components/header/navigationItem', {
    'react': React,
    'react/addons': React
});

describe(`NavigationItem Component`, () => {
    const name = 'I <3 cheesecake';
    const url = 'http://www.example.com/';

    let reactModule;
    let a;

    describe('with all props', () => {

        before(() => {
            reactModule = Context.mountComponent(NavigationItem, { name, url });
            a = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[0];
        });

        it('renders the component', () => {
            expect(React.findDOMNode(reactModule)).to.exist;
        });

        it('renders the link', () => {
            expect(React.findDOMNode(a)).to.exist;
        });

        it(`sets the link "href" prop to "${url}"`, () => {
            expect(a.props.href).to.eq(url);
        });

        it(`sets the link text to "${name}"`, () => {
            expect(React.findDOMNode(a).textContent).to.eq(name);
        });
    });

    describe('missing props', () => {
        it('does not render if the "name" prop is not set', () => {
            reactModule = Context.mountComponent(NavigationItem, { url });
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });

        it('does not render if the "url" prop is not set', () => {
            reactModule = Context.mountComponent(NavigationItem, { name });
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });
    });
});

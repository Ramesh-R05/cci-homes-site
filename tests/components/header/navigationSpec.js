import {betterMockComponentContext} from '@bxm/flux';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const NavigationItemStub = Context.createStubComponent();
const Navigation = proxyquire('../../../app/components/header/navigation', {
    'react': React,
    'react/addons': React,
    './navigationItem': NavigationItemStub
});

describe(`Navigation Component`, () => {
    const navItems = [
        { name: 'Section 1', url: '/section-1' },
        { name: 'Section 2', url: '/section-2' },
        { name: 'Section 3', url: '/section-3' }
    ];

    let reactModule;
    let container;
    let nav;
    let navElements;

    describe('render and class names', () => {
        const navClassName = 'foo-nav';

        before(() => {
            reactModule = Context.mountComponent(Navigation, {
                className: navClassName,
                items: navItems
            });
            container = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, navClassName)[0];
            nav = TestUtils.scryRenderedDOMComponentsWithTag(container, 'nav')[0];
        });

        it('renders the component', () => {
            expect(React.findDOMNode(reactModule)).to.exist;
        });

        it('renders the container', () => {
            expect(React.findDOMNode(container)).to.exist;
        });

        it('renders the nav section', () => {
            expect(React.findDOMNode(nav)).to.exist;
        });

        it('sets the class name of the nav section', () => {
            expect(nav).to.have.className(`${navClassName}__nav`);
        });
    });

    describe('nav items', () => {
        before(() => {
            reactModule = Context.mountComponent(Navigation, { items: navItems });
            navElements = TestUtils.scryRenderedComponentsWithType(reactModule, NavigationItemStub);
        });

        it('renders a NavigationItem for each item', () => {
            expect(navElements).to.have.length(3);
        });

        it('passes the item data as props', () => {
            expect(navElements[0].props).to.eql(navItems[0]);
        });
    });

    describe('invalid nav items', () => {
        it('does not render if there are no items', () => {
            reactModule = Context.mountComponent(Navigation, { items: [] });
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });

        it('does not render if the nav items are invalid', () => {
            reactModule = Context.mountComponent(Navigation, { items: {} });
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });
    });
});

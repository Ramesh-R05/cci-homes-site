import {betterMockComponentContext} from '@bxm/flux';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();

const NavigationItemStub = Context.createStubComponent();
const Navigation = proxyquire('../../../app/components/header/navigation', {
    'react': React,
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
        const linkClass = "gtm-navigation-section";


        before(() => {
            reactModule = Context.mountComponent(Navigation, {
                className: navClassName,
                items: navItems,
                linkClassName: linkClass
            });
            container = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, navClassName)[0];
            nav = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'nav')[0];
        });

        it('renders the component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('renders the container', () => {
            expect(ReactDOM.findDOMNode(container)).to.exist;
        });

        it('renders the nav section', () => {
            expect(ReactDOM.findDOMNode(nav)).to.exist;
        });

        it('sets the class name of the nav section', () => {
            expect(ReactDOM.findDOMNode(nav).getAttribute('class')).to.contain(`${navClassName}__nav`);
        });
    });

    describe('nav items and link class', () => {
        before(() => {
            reactModule = Context.mountComponent(Navigation, { items: navItems });
            navElements = TestUtils.scryRenderedComponentsWithType(reactModule, NavigationItemStub);
        });

        it('renders a NavigationItem for each item', () => {
            expect(navElements).to.have.length(3);
        });

        it('passes the item data as props', () => {
            expect(navElements[0].props).to.eql({ ...navItems[0], linkClassName: '', showGroupLabel: undefined });
        });
    });

    describe('invalid nav items', () => {
        it('does not render if there are no items', () => {
            reactModule = Context.mountComponent(Navigation, { items: [] });
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });

        it('does not render if the nav items are invalid', () => {
            reactModule = Context.mountComponent(Navigation, { items: {} });
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });
});

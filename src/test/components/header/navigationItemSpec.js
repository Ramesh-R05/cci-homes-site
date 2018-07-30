import { betterMockComponentContext } from '@bxm/flux';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const proxyquire = require('proxyquire').noCallThru();

const SubNavigationItemAndMenuStub = Context.createStubComponent();

const NavigationItem = proxyquire('../../../app/components/header/navigationItem', {
    react: React,
    './subNavigationItemAndMenu': SubNavigationItemAndMenuStub
});

describe(`NavigationItem Component`, () => {
    const name = 'I <3 cheesecake';
    const url = 'http://www.example.com/';
    const linkClassName = 'gtm-navigation-section';
    let subNavMenu;

    const tagsDetails = [
        {
            name: 'food:Homes navigation:Home Tours',
            urlName: 'Home-Tours',
            fullName: 'food_Homes_navigation_Home_Tours',
            displayName: 'Home Tours'
        },
        {
            name: 'food:Homes navigation:Bedroom',
            urlName: 'Bedroom',
            fullName: 'food_Homes_navigation_Bedroom',
            displayName: 'Bedroom'
        }
    ];

    let reactModule;
    let a;
    let subNavMenuComponent;

    describe('with no sub navigation items', () => {
        before(() => {
            reactModule = Context.mountComponent(NavigationItem, { name, url, linkClassName });
            a = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[0];
        });

        it('renders the component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('renders the link', () => {
            expect(ReactDOM.findDOMNode(a)).to.exist;
        });

        it(`sets the link "href" prop to "${url}"`, () => {
            expect(a.props.href).to.eq(url);
        });

        it(`sets the link text to "${name}"`, () => {
            expect(ReactDOM.findDOMNode(a).textContent).to.eq(name);
        });

        it(`sets the link "class" to "${linkClassName}"`, () => {
            expect(a.props.className).to.eq(linkClassName);
        });
    });

    describe('with all props', () => {
        before(() => {
            reactModule = Context.mountComponent(NavigationItem, { name, url, tagsDetails, linkClassName });
            subNavMenuComponent = TestUtils.findRenderedComponentWithType(reactModule, SubNavigationItemAndMenuStub);
        });

        it('should pass the sub nav items to the SubNavMenuComponent', () => {
            expect(subNavMenuComponent.props.items).to.deep.eq(tagsDetails);
        });

        it('should pass the name to the SubNavMenuComponent', () => {
            expect(subNavMenuComponent.props.name).to.deep.eq(name);
        });

        it('should pass the linkClassName to the SubNavMenuComponent', () => {
            expect(subNavMenuComponent.props.linkClassName).to.deep.eq(linkClassName);
        });
    });

    describe('missing props', () => {
        it('does not render if the "name" prop is not set', () => {
            reactModule = Context.mountComponent(NavigationItem, { url });
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });

        it('does not render if the "url" prop is not set', () => {
            reactModule = Context.mountComponent(NavigationItem, { name });
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });
});

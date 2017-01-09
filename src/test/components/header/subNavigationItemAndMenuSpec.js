import {betterMockComponentContext} from '@bxm/flux';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();

const SubNavigationItemAndMenu = proxyquire('../../../app/components/header/subNavigationItemAndMenu', {
    'react': React
});

describe(`SubNavigationItemAndMenu Component`, () => {
    const name = 'Rooms';
    const linkClassName = 'gtm-navigation-section';

    const items = [
        {
            "name": "food:Homes navigation:Home Tours",
            "urlName": "home-tours",
            "fullName": "food_Homes_navigation_Home_Tours",
            "displayName": "Home Tours"
        },
        {
            "name": "food:Homes navigation:Bedroom",
            "urlName": "bedroom",
            "fullName": "food_Homes_navigation_Bedroom",
            "displayName": "Bedroom"
        },
        {
            "name": "food:Homes navigation:Living",
            "urlName": "living",
            "fullName": "food_Homes_navigation_Living",
            "displayName": "Living"
        },
        {
            "name": "food:Homes navigation:Kitchen",
            "urlName": "kitchen",
            "fullName": "food_Homes_navigation_Kitchen",
            "displayName": "Kitchen"
        }
    ];

    let reactModule;
    let a;
    let firstSubLink;

    describe('with all props.', () => {

        before(() => {
            reactModule = Context.mountComponent(SubNavigationItemAndMenu, { items, name, linkClassName });
        });

        describe('Check first display name / non link', () => {

            before(() => {
                a = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[0];
            });

            it('renders the component', () => {
                expect(ReactDOM.findDOMNode(reactModule)).to.exist;
            });

            it('renders the link', () => {
                expect(ReactDOM.findDOMNode(a)).to.exist;
            });

            it(`sets the link text to "${name}"`, () => {
                expect(ReactDOM.findDOMNode(a).textContent).to.eq(name);
            });

            it(`sets the link "class" to "${linkClassName}"`, () => {
                expect(a.props.className).to.eq(linkClassName);
            });

        });

        describe('Check first link in the sub nav menu', () => {

            before(() => {
                a = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a')[1];
                firstSubLink = items[0];
            });

            it('renders the component', () => {
                expect(ReactDOM.findDOMNode(reactModule)).to.exist;
            });

            it('renders the link', () => {
                expect(ReactDOM.findDOMNode(a)).to.exist;
            });

            it(`sets the link text to "Home Tours"`, () => {
                expect(ReactDOM.findDOMNode(a).textContent).to.eq(firstSubLink.displayName);
            });

            it(`sets the link "class" to "${linkClassName}"`, () => {
                expect(a.props.className).to.eq(linkClassName);
            });

            it(`sets the link "href" to "${linkClassName}"`, () => {
                expect(a.props.href).to.eq(`/${firstSubLink.urlName}`);
            });
        });
    });


    describe('invalid sub nav items', () => {
        it('does not render if there are no items', () => {
            reactModule = Context.mountComponent(SubNavigationItemAndMenu, { items: [] });
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });

        it('does not render if the sub nav items are invalid', () => {
            reactModule = Context.mountComponent(SubNavigationItemAndMenu, { items: {} });
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });

    describe('missing props', () => {
        it('does not render if the "navigationTagsDetails" prop is not set', () => {
            reactModule = Context.mountComponent(SubNavigationItemAndMenu, { name });
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });
});

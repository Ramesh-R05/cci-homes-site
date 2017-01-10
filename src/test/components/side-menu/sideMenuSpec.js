import {betterMockComponentContext} from '@bxm/flux';
import findWhere from 'lodash/collection/findWhere';
import remove from 'lodash/array/remove';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
import {localeData} from '../../mock/config';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const activateSideMenu = () => {};
const NavigationStub = Context.createStubComponent();
const SideMenuLogoStub = Context.createStubComponent();
const SideMenu = proxyquire('../../../app/components/side-menu/sideMenu', {
    'react': React,
    '../header/navigation': NavigationStub,
    './sideMenuLogo': SideMenuLogoStub,
    '../../actions/menuActions': { activateSideMenu }
});

describe(`SideMenu Component`, () => {
    const navItems = [
        { name: 'Home tours', url: '/home-tours' },
        { name: 'Interiors', url: '/interiors' },
        { name: 'Outdoor', url: '/outdoor' },
        { name: 'Renovate', url: '/renovate' }
    ];

    let reactModule;
    let bar;
    let container;
    let closeButton;
    let nav;
    let overlay;
    let separators;
    let sideMenuLogoComponent;

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            hamburgerBrands: [{
                "imageUrl": "/assets/images/menulogos/now-logo-white.svg",
                "url": "http://nowtolove.com.au/",
                "title": "Now To Love",
                "id": "now"
            }]
        }
    };


    describe('render and class names', () => {

        before ( () => {
            reactModule = Context.mountComponent(SideMenu, {navItems: navItems, data: localeData}, [contextConfigStub]);
            bar = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__bar');
            container = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__container');
            closeButton = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__close');
            nav = TestUtils.findRenderedComponentWithType(reactModule, NavigationStub);
            overlay = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__overlay');
            separators = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'side-menu__separator');
            sideMenuLogoComponent = TestUtils.findRenderedComponentWithType(reactModule, SideMenuLogoStub);
        });

        it('renders the reactModule', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('does not set the side-menu--open state class', () => {
            expect(ReactDOM.findDOMNode(reactModule).getAttribute('class')).to.not.contain('side-menu--open');
        });

        it('renders the bar', () => {
            expect(ReactDOM.findDOMNode(bar)).to.exist;
        });

        it('renders the container', () => {
            expect(ReactDOM.findDOMNode(container)).to.exist;
        });

        it('renders the closeButton', () => {
            expect(ReactDOM.findDOMNode(closeButton)).to.exist;
        });

        it('renders the closeButton icon', () => {
            expect(ReactDOM.findDOMNode(closeButton).innerHTML).to.contain('<svg');
        });

        it('renders the nav', () => {
            expect(ReactDOM.findDOMNode(nav)).to.exist;
        });

        it('renders the overlay', () => {
            expect(ReactDOM.findDOMNode(overlay)).to.exist;
        });

        const separatorLength = 1;
        it(`renders ${separatorLength} separators`, () => {
            expect(separators.length).to.equal(separatorLength);
        });

        it('renders the logos', () => {
            const SideMenuLogoComponent = TestUtils.scryRenderedComponentsWithType(reactModule, SideMenuLogoStub);
            expect(SideMenuLogoComponent.length).to.equal(1);
        });

        const expectedGTMClassName = 'gtm-hamburger-';
        it(`passing expected GTM className of ${expectedGTMClassName} to side menu links as props`, () => {
            expect(sideMenuLogoComponent.props.logoClassNameGTMPrefix).to.eql(expectedGTMClassName);
        });
    });

    describe('invalid props', () => {
        before(() => {
            reactModule = Context.mountComponent(SideMenu);
        });

        it('does not render', () => {
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });

    describe('navigation', () => {
        before ( () => {
            reactModule = Context.mountComponent(SideMenu, {navItems: navItems, data: localeData}, [contextConfigStub]);
        });

        it('passes the proper nav items to the navigation component', () => {
            expect(nav.props.items).to.eql([
                { name: 'Home', url: '/' },
                { name: 'Home tours', url: '/home-tours' },
                { name: 'Interiors', url: '/interiors' },
                { name: 'Outdoor', url: '/outdoor' },
                { name: 'Renovate', url: '/renovate' }
            ])
        });
    });

    describe('open/close', () => {
        let activateSideMenuAction;

        before(() => {
            reactModule = Context.mountComponent(SideMenu, { open: true, navItems, data: localeData }, [contextConfigStub]);
            closeButton = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'side-menu__close')[0];
            overlay = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'side-menu__overlay')[0];
        });

        beforeEach(() => {
            // Have to do this so that the overlay click test fails when it runs
            // after the button click test and the onclick on the overlay is
            // missing
            remove(Context.instanceContext.executeActionCalls, () => true);
        });

        it('renders with the side-menu--open state class', () => {
            expect(ReactDOM.findDOMNode(reactModule).getAttribute('class')).to.contain('side-menu--open');
        });

        it('issues a NavigationActions.activateSideMenu action when the close button is clicked', () => {
            TestUtils.Simulate.click(closeButton);
            activateSideMenuAction = findWhere(Context.instanceContext.executeActionCalls, { action: activateSideMenu });
            expect(activateSideMenuAction).to.exist;
        });

        it('issues a NavigationActions.activateSideMenu action when the overlay is clicked', () => {
            TestUtils.Simulate.click(overlay);
            activateSideMenuAction = findWhere(Context.instanceContext.executeActionCalls, { action: activateSideMenu });
            expect(activateSideMenuAction).to.exist;
        });
    });
});

import {betterMockComponentContext} from '@bxm/flux';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();

const MenuButtonStub = Context.createStubComponent();
const NavigationStub = Context.createStubComponent();

const sandbox = sinon.sandbox.create();
const pinStub = sandbox.stub().returnsArg(0);
const Header = proxyquire('../../../app/components/header/header', {
    'react': React,
    './menuButton': MenuButtonStub,
    './navigation': NavigationStub,
    '../helpers/pin': pinStub // stub the HOC
});

describe(`Header Component`, () => {
    const navItems = [
        { name: 'Home tours', url: '/home-tours' },
        { name: 'Interiors', url: '/interiors' },
        { name: 'Outdoor', url: '/outdoor' },
        { name: 'Renovate', url: '/renovate' }
    ];

    let reactModule;
    let header;

    describe('HOCs', () => {
        it('specifies the pin points with a config function', () => {
            expect(pinStub).to.have.been.calledOnce;
        });

        it('specifies the expanded pin points for all screen sizes', () => {
            expect(pinStub.lastCall.args[1]({ isExpanded: true })).to.eql({
                small: { pinPoint: 40 },
                medium: { pinPoint: 268 },
                large: { pinPoint: 268 },
                xlarge: { pinPoint: 268 }
            });
        });

        it('specifies the expanded pin points for all screen sizes', () => {
            expect(pinStub.lastCall.args[1]({ isExpanded: false })).to.eql({
                small: { pinPoint: 40 },
                medium: { pinPoint: 51 },
                large: { pinPoint: 51 },
                xlarge: { pinPoint: 51 }
            });
        });
    });

    describe('class names', () => {
        before(() => {
            renderWithProps({ pinned: true, isSideMenuOpen: true, navItems });
        });

        it('sets the "header--pinned" class name', () => {
            expect(header).to.have.className('header--pinned');
        });

        it('sets the "header--side-menu-open" class name when pinned', () => {
            expect(header).to.have.className('header--side-menu-open');
        });

        it('does not set the "header--expanded" class name by default', () => {
            expect(header).not.to.have.className('header--expanded');
        });
    });

    describe('expanded class name', () => {
        before(() => {
            renderWithProps({ pinned: true, isExpanded: true, isSideMenuOpen: true, navItems });
        });

        it('sets the "header--expanded" class name', () => {
            expect(header).to.have.className('header--expanded');
        });
    });

    describe('styles', () => {
        it('sets the "top" style to a pixel value when pinned', () => {
            renderWithProps({ pinned: true, pinOffset: 42, navItems });
            expect(header.props.style.top).to.eq('42px');
        });

        it('sets the "top" style to "auto" when not pinned', () => {
            renderWithProps({ pinned: false, pinOffset: 42, navItems });
            expect(header.props.style.top).to.eq('auto');
        });
    });

    describe('all props', () => {
        before(() => {
            renderWithProps({ isSideMenuOpen: false, navItems });
        });

        it('has the class name "header"', () => {
            expect(header).to.have.className('header');
        });

        const expectedRole = 'banner';
        it(`sets the role prop to "${expectedRole}"`, () => {
            expect(header.props.role).to.eq(expectedRole);
        });
    });

    describe('missing props', () => {
        before(() => {
            renderWithProps({});
        });

        it('does not render', () => {
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });

    describe('sub-components', () => {
        let headerBanner;
        let menuButton;
        let logo;
        let navigation;

        before(() => {
            renderWithProps({ isSideMenuOpen: false, navItems });
            headerBanner = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'header-banner')[0];
            menuButton = TestUtils.scryRenderedComponentsWithType(reactModule, MenuButtonStub)[0];
            logo = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'header-logo')[0];
            navigation = TestUtils.scryRenderedComponentsWithType(reactModule, NavigationStub)[0];
        });

        describe('Header banner', () => {
            it('renders', () => {
                expect(ReactDOM.findDOMNode(headerBanner)).to.exist;
            });

            it('links to the home page', () => {
                const headerBannerLink = ReactDOM.findDOMNode(headerBanner).getElementsByTagName('a')[0];
                expect(headerBannerLink.getAttribute('href')).to.eq('/');
            });
        });

        describe('MenuButton', () => {
            it('renders', () => {
                expect(ReactDOM.findDOMNode(menuButton)).to.exist;
            });
        });

        describe('Logo', () => {
            it('renders', () => {
                expect(ReactDOM.findDOMNode(logo)).to.exist;
            });

        });

        describe('Navigation', () => {
            it('renders', () => {
                expect(ReactDOM.findDOMNode(navigation)).to.exist;
            });

            const expectedClassName = 'header-nav__nav';
            it(`sets the className to ${expectedClassName}`, () => {
                expect(navigation).to.have.className('header-nav');
            });

            it('sets the navigation items', () => {
                expect(navigation.props.items).to.eql(navItems);
            });
        });
    });

    function renderWithProps(props) {
        reactModule = Context.mountComponent(Header, props);
        header = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'header')[0];
    }
});

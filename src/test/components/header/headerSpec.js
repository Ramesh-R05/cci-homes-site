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
    '@bxm/behaviour/lib/components/pin': pinStub // stub the HOC
});

describe(`Header Component`, () => {
    const navItems = [
        { name: 'Home tours', url: '/home-tours' },
        { name: 'Interiors', url: '/interiors' },
        { name: 'Outdoor', url: '/outdoor' },
        { name: 'Renovate', url: '/renovate' }
    ];
    const UNIHEADER_HEIGHT = 49;

    let reactModule;
    let header;
    let headerClass;

    describe('HOCs', () => {
        it('specifies the pin points with a config function', () => {
            expect(pinStub).to.have.been.calledOnce;
        });

        it('specifies the pin points for non-small screen sizes to the height of the uniheader', () => {
            expect(pinStub.lastCall.args[1]()).to.eql({
                small: { pinPoint: 0 },
                medium: { pinPoint: UNIHEADER_HEIGHT },
                large: { pinPoint: UNIHEADER_HEIGHT },
                xlarge: { pinPoint: UNIHEADER_HEIGHT }
            });
        });
    });

    describe('class names', () => {
        before(() => {
            renderWithProps({ pinned: true, isSideMenuOpen: true, navItems });
            headerClass = ReactDOM.findDOMNode(header).getAttribute('class');
        });

        it('sets the "header--pinned" class name', () => {
            expect(headerClass).to.contain('header--pinned');
        });

        it('does not set the "header--fade-out" class name when not scrolling', () => {
            expect(headerClass).not.to.contain('header--fade-out');
        });

        it('sets the "header--side-menu-open" class name when pinned', () => {
            expect(headerClass).to.contain('header--side-menu-open');
        });

        it('does not set the "header--expanded" class name', () => {
            expect(headerClass).not.to.contain('header--expanded');
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
            headerClass = ReactDOM.findDOMNode(header).getAttribute('class');
        });

        it('has the class name "header"', () => {
            expect(headerClass).to.contain('header');
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
        let logoLinkImage;
        let navigation;

        before(() => {
            renderWithProps({ isSideMenuOpen: false, navItems });
            menuButton = TestUtils.scryRenderedComponentsWithType(reactModule, MenuButtonStub)[0];
            logo = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'header-logo')[0];
            logoLinkImage = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'header-logo__link-image')[0];
            navigation = TestUtils.scryRenderedComponentsWithType(reactModule, NavigationStub)[0];
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

            const expectedGTMClassName = 'gtm-navbar-homes';
            it(`contains a link that is set with the correct GTM className of ${expectedGTMClassName}`, () => {
                expect(logoLinkImage.props.className).to.contain(expectedGTMClassName);
            });
        });

        describe('Navigation', () => {
            it('renders', () => {
                expect(ReactDOM.findDOMNode(navigation)).to.exist;
            });

            const expectedClassName = 'header-nav';
            it(`sets the className to ${expectedClassName}`, () => {
                expect(navigation.props.className).to.contain(expectedClassName);
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

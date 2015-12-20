import {betterMockComponentContext} from '@bxm/flux';
import findWhere from 'lodash/collection/findWhere';
import remove from 'lodash/array/remove';
import {localeData} from '../../mock/config';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();

const activateSideMenu = () => {};
const NavigationStub = Context.createStubComponent();
const MagshopStub = Context.createStubComponent();
const SideMenu = proxyquire('../../../app/components/side-menu/sideMenu', {
    'react': React,
    '../header/navigation': NavigationStub,
    '../magshop/magshop': MagshopStub,
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
    let magshop;
    let separators;

    describe('render and class names', () => {
        before(renderDefault);

        it('renders the reactModule', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('does not set the side-menu--open state class', () => {
            expect(ReactDOM.findDOMNode(reactModule)).not.to.have.className('side-menu--open');
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

        it('renders the Magshop subscription section', () => {
            expect(ReactDOM.findDOMNode(magshop)).to.exist;
        });

        const separatorLength = 1;
        it(`renders ${separatorLength} separators`, () => {
            expect(separators.length).to.equal(separatorLength);
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
        before(renderDefault);

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
            reactModule = Context.mountComponent(SideMenu, { open: true, navItems, data: localeData });
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
            expect(ReactDOM.findDOMNode(reactModule)).to.have.className('side-menu--open');
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

    function renderDefault() {
        reactModule = TestUtils.renderIntoDocument(
            <SideMenu navItems={navItems} data={localeData}>
                <div className="some-content">foo</div>
            </SideMenu>
        );
        bar = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__bar');
        container = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__container');
        closeButton = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__close');
        nav = TestUtils.findRenderedComponentWithType(reactModule, NavigationStub);
        magshop = TestUtils.findRenderedComponentWithType(reactModule, MagshopStub);
        overlay = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'side-menu__overlay');
        separators = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'side-menu__separator');
    }
});

import {betterMockComponentContext} from '@bxm/flux';
import filter from 'lodash/collection/filter';
import * as MenuActions from '../../../app/actions/menuActions';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const sandbox = sinon.sandbox.create();
const MenuButton = proxyquire('../../../app/components/header/menuButton', {
    'react': React,
    'react/addons': React
});

describe(`MenuButton Component`, () => {
    let reactModule;
    let container;
    let button;
    let svg;

    beforeEach(Context.cleanup);

    describe('render and class names', () => {
        before(() => {
            reactModule = Context.mountComponent(MenuButton);
            container = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'header-menu')[0];
            button = TestUtils.scryRenderedDOMComponentsWithTag(container, 'button')[0];
            svg = TestUtils.scryRenderedDOMComponentsWithTag(button, 'svg')[0];
        });

        it('renders the component', () => {
            expect(React.findDOMNode(reactModule)).to.exist;
        });

        it('renders the containing div', () => {
            expect(React.findDOMNode(container)).to.exist;
        });

        const expectedContainerClassName = 'header-menu';
        it(`sets the class name of the containing div to "${expectedContainerClassName}"`, () => {
            expect(container).to.have.className(expectedContainerClassName);
        });

        it('renders the button', () => {
            expect(React.findDOMNode(button)).to.exist;
        });

        const expectedButtonClassName = 'header-menu__button-menu';
        it(`sets the class name of the button to "${expectedButtonClassName}"`, () => {
            expect(button).to.have.className(expectedButtonClassName);
        });

        it('renders the svg icon in the button', () => {
            const svgHtml = React.findDOMNode(button).innerHTML;
            expect(svgHtml).to.contain('<svg ');
        });
    });

    describe('interaction', () => {
        before(() => {
            reactModule = Context.mountComponent(MenuButton);
            button = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'button')[0];
        });

        it('executes NavigationActions.activateSideMenu for each button click', () => {
            let calls;

            TestUtils.Simulate.click(button);
            calls = getCallsForAction(MenuActions.activateSideMenu);
            expect(calls).to.have.length(1);

            TestUtils.Simulate.click(button);
            calls = getCallsForAction(MenuActions.activateSideMenu);
            expect(calls).to.have.length(2);
        });
    });

    function getCallsForAction(action) {
        return filter(Context.instanceContext.executeActionCalls, call => call.action == action);
    }
});

import {betterMockComponentContext} from '@bxm/flux';
import filter from 'lodash/collection/filter';
import * as MenuActions from '../../../app/actions/menuActions';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();

const sandbox = sinon.sandbox.create();
const MenuButton = proxyquire('../../../app/components/header/menuButton', {
    'react': React,
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
            button = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'button')[0];
            svg = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'svg')[0];
        });

        it('renders the component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('renders the containing div', () => {
            expect(ReactDOM.findDOMNode(container)).to.exist;
        });

        const expectedContainerClassName = 'header-menu';
        it(`sets the class name of the containing div to "${expectedContainerClassName}"`, () => {
            expect(ReactDOM.findDOMNode(container).getAttribute('class')).to.contain(expectedContainerClassName);
        });

        it('renders the button', () => {
            expect(ReactDOM.findDOMNode(button)).to.exist;
        });

        const expectedButtonClassName = 'header-menu__button-menu';
        it(`sets the class name of the button to "${expectedButtonClassName}"`, () => {
            expect(ReactDOM.findDOMNode(button).getAttribute('class')).to.contain(expectedButtonClassName);
        });

        it('renders the svg icon in the button', () => {
            const svgHtml = ReactDOM.findDOMNode(button).innerHTML;
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

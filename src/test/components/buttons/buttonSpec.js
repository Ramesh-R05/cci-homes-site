import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
import Button from '../../../app/components/buttons/button';
import { buttonMock1, buttonMock2 } from '../../mock/button';

describe('Button', () => {
    let reactModule;
    const defaultClass = 'button';
    const activeClass = 'active';

    after(() => {
        if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
            let domElement = ReactDOM.findDOMNode(reactModule);
            if (domElement) ReactDOM.unmountComponentAtNode(domElement.parentElement);
        }
    });

    describe('with basic properties', () => {
        let button;
        let props = buttonMock1;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Button {...props}>{props.children}</Button>);
            button = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'button');
        });

        it(`should have the label equal to '${props.children}'`, () => {
            expect(ReactDOM.findDOMNode(button).innerHTML).to.equal(props.children);
        });

        it(`should have the value equal to '${props.name}'`, () => {
            expect(ReactDOM.findDOMNode(button).value).to.equal(props.value);
        });

        it(`should have the type equal to '${props.type}'`, () => {
            expect(ReactDOM.findDOMNode(button).type).to.equal(props.type);
        });

        it(`should have the default class equal to '${defaultClass}'`, () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, defaultClass).length).to.equal(1);
        });

        const modifierClass = `${defaultClass}--${props.modifier}`;
        it(`should have the modifier class equal to ${modifierClass}`, () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, modifierClass).length).to.equal(1);
        });

        it('should not be disabled', () => {
            expect(ReactDOM.findDOMNode(button).disabled).to.be.false;
        });
    });

    describe('with the onClick prop', () => {
        let button;
        const onClickSpy = sinon.spy();
        let props = buttonMock1;
        props.onClick = onClickSpy;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Button {...props}>{props.children}</Button>);
            button = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'button');
            TestUtils.Simulate.click(button);
        });

        it('should call the onClick method when clicking on it', () => {
            expect(onClickSpy.calledOnce).to.be.true;
        });

        it(`should have the ${activeClass} class after clicking on it`, () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, activeClass).length).to.equal(1);
        });

        it(`should persist the state after clicking on it`, () => {
            expect(reactModule.state.active).to.be.true;
        });
    });

    describe('with the default props', () => {
        let button;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Button>Defaults</Button>);
            button = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'button');
        });

        const expectedType = 'button';
        it(`should have the type equal to '${expectedType}'`, () => {
            expect(ReactDOM.findDOMNode(button).type).to.equal(expectedType);
        });

        const expectedValue = '';
        it(`should have the type equal to '${expectedValue}'`, () => {
            expect(ReactDOM.findDOMNode(button).value).to.equal(expectedValue);
        });

        it(`should not have the ${activeClass} class after clicking on it`, () => {
            TestUtils.Simulate.click(button);
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, activeClass).length).to.equal(0);
        });

        it(`should not persist the state after clicking on it`, () => {
            expect(reactModule.state.active).to.be.false;
        });
    });

    describe('with the disabled prop set to true', () => {
        let button;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Button {...buttonMock2}>{buttonMock2.children}</Button>);
            button = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'button');
        });

        it('should be disabled', () => {
            expect(ReactDOM.findDOMNode(button).disabled).to.be.true;
        });
    });
});

import React from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import Input from '../../../app/components/form/input';
import {radio1 as inputRadioMock} from '../../mock/input';

const TestUtils = betterMockComponentContext().TestUtils;


describe('Input', () => {
    let reactModule;
    const labelText = 'Small';

    describe('with an id, a name, a type and a value', () => {
        let input;
        let label;
        const onChangeSpy = sinon.spy();
        let props = inputRadioMock;
        props.onChange = onChangeSpy;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Input {...props}>{labelText}</Input>);
            input = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'input');
            label = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'label');
        });

        after(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = React.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it(`should have the input id equal to '${props.id}'`, () => {
            reactModule.setState({here: 'to'});
            expect(input.getDOMNode().id).to.equal(props.id);
        });

        it(`should have the input name equal to '${props.name}'`, () => {
            expect(input.getDOMNode().name).to.equal(props.name);
        });

        it(`should have the input value equal to '${props.name}'`, () => {
            expect(input.getDOMNode().value).to.equal(props.value);
        });

        it(`should have the input type equal to '${props.type}'`, () => {
            expect(input.getDOMNode().type).to.equal(props.type);
        });

        it('should have the input not checked', () => {
            expect(input.getDOMNode().checked).to.be.false;
        });

        it(`should have the label for attribute value equal to '${props.id}'`, () => {
            expect(label.getDOMNode().getAttribute('for')).to.equal(props.id);
        });

        it(`should have the label text equal to '${labelText}'`, () => {
            expect(label.getDOMNode().innerHTML).to.equal(labelText);
        });

        it('should call the onChange method with the value as a parameter when selecting the radio button', () => {
            TestUtils.Simulate.change(input, {target: {checked: true}});
            expect(onChangeSpy.withArgs(props.value).calledOnce).to.be.true;
        });
    });

    describe('without required props', () => {
        afterEach(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = React.findDOMNode(reactModule);
                if(domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it('should not be rendered if the id prop isn\'t provided', () => {
            const props = {name: 'size', value: 'small'};
            reactModule = TestUtils.renderIntoDocument(<Input {...props}>{labelText}</Input>);
            expect(React.findDOMNode(reactModule)).to.be.null;
        });

        it('should not be rendered if the name prop isn\'t provided', () => {
            const props = {id: 'size__1', value: 'small'};
            reactModule = TestUtils.renderIntoDocument(<Input {...props}>{labelText}</Input>);
            expect(React.findDOMNode(reactModule)).to.be.null;
        });

        it('should not be rendered if the value prop isn\'t provided', () => {
            const props = {name: 'size', value: 'small'};
            reactModule = TestUtils.renderIntoDocument(<Input {...props}>{labelText}</Input>);
            expect(React.findDOMNode(reactModule)).to.be.null;
        });

        it('should not be rendered if the no prop are provided', () => {
            reactModule = TestUtils.renderIntoDocument(<Input>{labelText}</Input>);
            expect(React.findDOMNode(reactModule)).to.be.null;
        });
    });
});
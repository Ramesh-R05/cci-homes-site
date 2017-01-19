import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import Input from '../../../app/components/form/input';
import {radio1 as inputRadioMock} from '../../mock/input';

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
                let domElement = ReactDOM.findDOMNode(reactModule);
                if (domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it(`should have the input id equal to '${props.id}'`, () => {
            reactModule.setState({here: 'to'});
            expect(ReactDOM.findDOMNode(input).id).to.equal(props.id);
        });

        it(`should have the input name equal to '${props.name}'`, () => {
            expect(ReactDOM.findDOMNode(input).name).to.equal(props.name);
        });

        it(`should have the input value equal to '${props.name}'`, () => {
            expect(ReactDOM.findDOMNode(input).value).to.equal(props.value);
        });

        it(`should have the input type equal to '${props.type}'`, () => {
            expect(ReactDOM.findDOMNode(input).type).to.equal(props.type);
        });

        it('should have the input not checked', () => {
            expect(ReactDOM.findDOMNode(input).checked).to.be.false;
        });

        it(`should have the label for attribute value equal to '${props.id}'`, () => {
            expect(ReactDOM.findDOMNode(label).getAttribute('for')).to.equal(props.id);
        });

        it(`should have the label text equal to '${labelText}'`, () => {
            expect(ReactDOM.findDOMNode(label).innerHTML).to.equal(labelText);
        });

        it('should call the onChange method with the value as a parameter when selecting the radio button', () => {
            TestUtils.Simulate.change(input, {target: {checked: true}});
            expect(onChangeSpy.withArgs(props.value).calledOnce).to.be.true;
        });
    });

    describe('without required props', () => {
        afterEach(() => {
            if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
                let domElement = ReactDOM.findDOMNode(reactModule);
                if(domElement) React.unmountComponentAtNode(domElement.parentElement);
            }
        });

        it('should not be rendered if the id prop isn\'t provided', () => {
            const props = {name: 'size', value: 'small'};
            reactModule = TestUtils.renderIntoDocument(<Input {...props}>{labelText}</Input>);
            expect(ReactDOM.findDOMNode(reactModule)).to.be.null;
        });

        it('should not be rendered if the name prop isn\'t provided', () => {
            const props = {id: 'size__1', value: 'small'};
            reactModule = TestUtils.renderIntoDocument(<Input {...props}>{labelText}</Input>);
            expect(ReactDOM.findDOMNode(reactModule)).to.be.null;
        });

        it('should not be rendered if the value prop isn\'t provided', () => {
            const props = {name: 'size', value: 'small'};
            reactModule = TestUtils.renderIntoDocument(<Input {...props}>{labelText}</Input>);
            expect(ReactDOM.findDOMNode(reactModule)).to.be.null;
        });

        it('should not be rendered if the no prop are provided', () => {
            reactModule = TestUtils.renderIntoDocument(<Input>{labelText}</Input>);
            expect(ReactDOM.findDOMNode(reactModule)).to.be.null;
        });
    });
});

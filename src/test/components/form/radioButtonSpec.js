import { betterMockComponentContext } from '@bxm/flux';
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const proxyquire = require('proxyquire').noCallThru();
const RadioButton = proxyquire('../../../app/components/form/radioButton', {
    './input': React.createClass({
        render: function() {
            return React.createElement('input', { type: this.props.type });
        }
    })
});

describe('RadioButton', () => {
    let reactModule;
    const expectedInputType = 'radio';

    before(() => {
        reactModule = TestUtils.renderIntoDocument(<RadioButton />);
    });

    it(`should render an input with the ${expectedInputType} type`, () => {
        const input = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'input');
        expect(ReactDOM.findDOMNode(input).type).to.equal(expectedInputType);
    });
});

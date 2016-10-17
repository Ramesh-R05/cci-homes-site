import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();
const Checkbox = proxyquire('../../../app/components/form/checkbox', {
  './input': React.createClass({
      render: function () {
          return React.createElement('input', {type: this.props.type});
      }
  })
});

describe('Checkbox', () => {
    let reactModule;
    const expectedInputType = 'checkbox';

    before(() => {
        reactModule = TestUtils.renderIntoDocument(<Checkbox />);
    });

    it(`should render an input with the ${expectedInputType} type`, () => {
        const input = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'input');
        expect(ReactDOM.findDOMNode(input).type).to.equal(expectedInputType);
    });
});

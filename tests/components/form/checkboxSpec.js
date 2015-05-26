import React from 'react';
import {betterMockComponentContext} from '@bxm/flux';

const TestUtils = betterMockComponentContext().TestUtils;
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
        expect(input.getDOMNode().type).to.equal(expectedInputType);
    });
});
import React from 'react';
import {betterMockComponentContext} from '@bxm/flux';

const TestUtils = betterMockComponentContext().TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const ButtonCategory = proxyquire('../../../app/components/buttons/buttonCategory', {
    './button': React.createClass({
        render: function () {
            return React.createElement('button',
                {className: `button--${this.props.modifier}`},
                this.props.children
            );
        }
    })
});

describe('ButtonCategory', () => {
    let reactModule;
    const expectedClassName = 'button--category';

    before(() => {
        reactModule = TestUtils.renderIntoDocument(<ButtonCategory />);
    });

    after(() => {
        if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
            let domElement = React.findDOMNode(reactModule);
            if (domElement) React.unmountComponentAtNode(domElement.parentElement);
        }
    });

    it(`should render a button with the class equal to ${expectedClassName}`, () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, expectedClassName).length)
            .to.equal(1);
    });

    it(`should render the arrow svg icon`, () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'icon-arrow').length)
            .to.equal(1);
    });
});
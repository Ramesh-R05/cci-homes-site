import React from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import Source from '../../../app/components/teaser/source';

const ComponentContext = betterMockComponentContext();
const TestUtils = ComponentContext.TestUtils;

describe('TeaserSource', () => {
    let reactModule;

    describe('with the source prop', () => {
        const sourceValue = 'Homes+';
        let source;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Source source={sourceValue} />);
            source = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__source');

        });

        it(`should have the source text equal to '${sourceValue}'`, () => {
            expect(source.getDOMNode().textContent.replace(/(\n|\s)/g,'')).to.equal(sourceValue);
        });

        it('should render the icon', () => {
            const icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'icon-source');
            expect(React.findDOMNode(source)).to.exist;
        });
    });

    describe('without the source prop as an empty string', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Source source="" />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the source prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Source />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

import React from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import Sponsor from '../../../app/components/polar/sponsor';

const ComponentContext = betterMockComponentContext();
const TestUtils = ComponentContext.TestUtils;

describe('Sponsor', () => {
    let reactModule;

    describe('with the name prop', () => {
        const nameValue = 'Bunnings';
        let sponsor;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Sponsor name={nameValue} />);
            sponsor = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__tags');
        });

        const expectedOutput = `Powered by ${nameValue}`;
        it(`should have the output text equal to '${expectedOutput}'`, () => {
            expect(sponsor.getDOMNode().textContent).to.equal(expectedOutput);
        });

    });

    describe('with the name prop as an empty string', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Sponsor name="" />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with the name prop as undefined', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Sponsor name={undefined} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the name prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Sponsor />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

import React from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import Tags from '../../../app/components/teaser/tags';

const ComponentContext = betterMockComponentContext();
const TestUtils = ComponentContext.TestUtils;

describe('TeaserTags', () => {
    let reactModule;

    after(() => {
        if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
            let domElement = React.findDOMNode(reactModule);
            if (domElement) React.unmountComponentAtNode(domElement.parentElement);
        }
    });

    describe('with two tags including one from the topic category in the first position', () => {
        const tags = [
            'food:Topic:Gardening',
            'food:Renovating:Materials:Bamboo'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        const expectedPrimaryTag = 'Gardening';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(tag.getDOMNode().textContent).to.equal(expectedPrimaryTag);
        });

        const expectedSecondaryTag = ', Bamboo';
        it(`should have the secondary tag output equal to ${expectedSecondaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-secondary');
            expect(tag.getDOMNode().textContent).to.equal(expectedSecondaryTag);
        });
    });

    describe('with three tags', () => {
        const tags = [
            'food:Homes navigation:Outdoor',
            'food:Renovating:Materials:Wood',
            'food:Topic:Gardening'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        const expectedPrimaryTag = 'Gardening';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(tag.getDOMNode().textContent).to.equal(expectedPrimaryTag);
        });

        const expectedSecondaryTag = ', Wood';
        it(`should have the secondary tag output equal to ${expectedSecondaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-secondary');
            expect(tag.getDOMNode().textContent).to.equal(expectedSecondaryTag);
        });
    });

    describe('with two tags from the Topic category', () => {
        const tags = [
            'food:Homes navigation:Outdoor',
            'food:Renovating:Materials:Timber',
            'food:Topic:DIY',
            'food:Topic:Gardening'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        const expectedPrimaryTag = 'DIY';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(tag.getDOMNode().textContent).to.equal(expectedPrimaryTag);
        });

        const expectedSecondaryTag = ', Timber';
        it(`should have the secondary tag output equal to ${expectedSecondaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-secondary');
            expect(tag.getDOMNode().textContent).to.equal(expectedSecondaryTag);
        });
    });

    describe('with two tags including one from the topic category and one from the Homes navigation category', () => {
        const tags = [
            'food:Topic:Gardening',
            'food:Homes navigation:Outdoor'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        const expectedPrimaryTag = 'Gardening';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(tag.getDOMNode().textContent).to.equal(expectedPrimaryTag);
        });

        it(`should have ignored the navigation tag`, () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'tag-secondary').length)
                .to.equal(0);
        });
    });

    describe('with two tags without one from the topic category', () => {

        const tags = [
            'food:DIY and craft:DIY and craft tools:Tape measure',
            'food:Renovating:Materials:Bamboo'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with invalid tags', () => {
        const tags = [
            'Tape measure',
            'Bamboo'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with the tags prop as an empty array', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={[]} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with the tags prop as an empty object', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={{}} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the tags prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

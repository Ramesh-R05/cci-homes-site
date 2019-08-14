import { betterMockComponentContext } from '@bxm/flux';
import articlesMock from '../../mock/articles';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const InFocus = proxyquire('../../../app/components/inFocus/inFocus', {
    react: React,
    '../teaser/teaser': TeaserStub
}).default;

describe('InFocus', () => {
    describe('with 3 articles', () => {
        let section;
        let reactModule;
        let teasers;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InFocus articles={articlesMock.articles.slice(1, 4)} />);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'section-in-focus');
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        const expectedHeading = 'In Focus';
        it(`should have the heading equal to '${expectedHeading}'`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'type-composite');
            expect(ReactDOM.findDOMNode(heading).textContent).to.equal(expectedHeading);
        });

        it(`should render three teasers`, () => {
            expect(teasers.length).to.equal(3);
        });

        const expectedTeaserModifier = 'narrow';
        it(`should set the Teaser modifier prop to '${expectedTeaserModifier}'`, () => {
            expect(teasers[0].props.modifier).to.equal(expectedTeaserModifier);
        });
    });

    describe('with children', () => {
        let reactModule;
        let childComponent;
        const ChildrenComponentStub = Context.createStubComponentWithChildren();

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <InFocus articles={articlesMock.articles.slice(1, 4)}>
                    <ChildrenComponentStub />
                </InFocus>
            );
            childComponent = TestUtils.findRenderedComponentWithType(reactModule, ChildrenComponentStub);
        });

        it('should render the child component', () => {
            expect(ReactDOM.findDOMNode(childComponent)).to.exist;
        });
    });

    describe('with the modifier prop', () => {
        let reactModule;
        let section;
        const modifier = 'modifier';
        const expectedClassname = `section-in-focus--${modifier}`;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InFocus articles={articlesMock.articles} modifier={modifier} />);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, expectedClassname);
        });

        it(`should render the in focus section with the ${expectedClassname} class`, () => {
            expect(section).to.exist;
        });
    });

    describe('with the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InFocus articles={[]} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InFocus />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

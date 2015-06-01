import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const GroupFeatured = proxyquire('../../../app/components/section/groupFeatured', {
    'react': React,
    '../teaser/teaser': TeaserStub
});

describe('GroupFeatured', () => {

    describe('with 3 articles', () => {
        let section;
        let reactModule;
        let teasers;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<GroupFeatured articles={articlesMock.slice(1, 4)} />);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'section--fixed-col');
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        const expectedHeading = 'In Focus';
        it(`should have the heading equal to '${expectedHeading}'`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'type-composite');
            expect(heading.getDOMNode().textContent).to.equal(expectedHeading);
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
                <GroupFeatured articles={articlesMock.slice(1, 4)}>
                    <ChildrenComponentStub />
                </GroupFeatured>
            );
            childComponent = TestUtils.findRenderedComponentWithType(reactModule, ChildrenComponentStub);
        });

        it('should render the child component', () => {
            expect(React.findDOMNode(childComponent)).to.exist;
        });
    });

    describe('with the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<GroupFeatured articles={[]} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<GroupFeatured />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });


});

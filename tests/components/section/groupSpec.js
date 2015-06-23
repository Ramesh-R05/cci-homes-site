import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const Group = proxyquire('../../../app/components/section/group', {
    'react': React,
    '../teaser/teaser': TeaserStub
});

describe('Group', () => {

    describe('with 3 articles and a modifier prop', () => {
        let section;
        let reactModule;
        let teasers;
        const groupModifier = 'modifier';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group articles={articlesMock.slice(1, 4)} modifier={groupModifier} />
            );
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, `section--${groupModifier}`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        it(`should render three teasers`, () => {
            expect(teasers.length).to.equal(3);
        });

        const expectedTeaserModifier = Group.defaultProps.teaserModifier;
        it(`should set the Teaser modifier prop to the default '${expectedTeaserModifier}'`, () => {
            expect(teasers[0].props.modifier).to.equal(expectedTeaserModifier);
        });
    });

    describe('with a teaser modifier prop', () => {
        let section;
        let reactModule;
        let teasers;
        const groupModifier = 'modifier';
        const teaserModifier = 'teaser-modifier';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group
                    articles={articlesMock.slice(1, 4)}
                    modifier={groupModifier}
                    teaserModifier={teaserModifier}
                    />
            );
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, `section--${groupModifier}`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
        });

        it(`should set the Teaser modifier prop to the default '${teaserModifier}'`, () => {
            expect(teasers[0].props.modifier).to.equal(teaserModifier);
        });
    });

    describe('with a className prop', () => {
        let section;
        let reactModule;
        const className = 'test-class';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group
                    articles={articlesMock.slice(1, 4)}
                    className={className}
                    modifier={'modifier'}
                />
            );
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, className);
        });

        it('Group should exist', () => {
            expect(React.findDOMNode(reactModule)).to.exist;
        });

        it('should have the custom classname "${className}"', () => {
            let classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(className);
        });
    });

    describe('with children', () => {
        let reactModule;
        let childComponent;
        const ChildrenComponentStub = Context.createStubComponentWithChildren();

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Group articles={articlesMock.slice(1, 4)} modifier={'modifier'}>
                    <ChildrenComponentStub />
                </Group>
            );
            childComponent = TestUtils.findRenderedComponentWithType(reactModule, ChildrenComponentStub);
        });

        it('should render the child component', () => {
            expect(React.findDOMNode(childComponent)).to.exist;
        });
    });

    describe('without the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Group articles={[]} modifier={'modifier'} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Group modifier={'modifier'} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the modifier prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Group articles={articlesMock.slice(1, 4)} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });


});

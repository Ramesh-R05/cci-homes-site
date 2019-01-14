import { betterMockComponentContext } from '@bxm/flux';
import Tags from '../../../app/components/teaser/tags';

const ComponentContext = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = ComponentContext;

describe('TeaserTags', () => {
    let reactModule;

    after(() => {
        if (reactModule && TestUtils.isCompositeComponent(reactModule)) {
            let domElement = ReactDOM.findDOMNode(reactModule);
            if (domElement) ReactDOM.unmountComponentAtNode(domElement.parentElement);
        }
    });

    describe('with two tags including one from the topic category in the first position', () => {
        const tagsDetails = [
            {
                name: 'homes:Topic:Gardening',
                urlName: 'gardening',
                fullName: 'food_Topic_Gardening',
                displayName: 'Gardening'
            },
            {
                name: 'homes:Renovating:Materials:Bamboo',
                urlName: 'renovating',
                fullName: 'food_Topic_Renovating',
                displayName: 'Renovating'
            }
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tagsDetails={tagsDetails} />);
        });

        const expectedPrimaryTag = 'Gardening';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedPrimaryTag);
        });

        const expectedSecondaryTag = 'Renovating';
        it(`should have the secondary tag output equal to ${expectedSecondaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-secondary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedSecondaryTag);
        });

        const expectedSeparator = ', ';
        it(`should have the separator equal to ${expectedSeparator}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-separator');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedSeparator);
        });
    });

    describe('with three tags', () => {
        const tagsDetails = [
            {
                name: 'homes:Topic:Gardening',
                urlName: 'gardening',
                fullName: 'food_Topic_Gardening',
                displayName: 'Gardening'
            },
            {
                name: 'food:Homes navigation:Real Homes',
                urlName: 'renovating',
                fullName: 'food_Topic_Renovating',
                displayName: 'Real Homes'
            },
            {
                name: 'homes:Renovating:Materials:Bamboo',
                urlName: 'something-else',
                fullName: 'food_Topic_Renovating',
                displayName: 'Wood'
            }
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tagsDetails={tagsDetails} />);
        });

        const expectedPrimaryTag = 'Gardening';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedPrimaryTag);
        });

        const expectedSecondaryTag = 'Wood';
        it(`should have the secondary tag output equal to ${expectedSecondaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-secondary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedSecondaryTag);
        });
    });

    describe('with two tags from the Topic category', () => {
        const tagsDetails = [
            {
                name: 'homes:Topic:Gardening',
                urlName: 'gardening',
                fullName: 'food_Topic_Gardening',
                displayName: 'DIY'
            },
            {
                name: 'homes:Renovating:Materials:Bamboo',
                urlName: 'something-else',
                fullName: 'food_Topic_Renovating',
                displayName: 'Timber'
            }
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tagsDetails={tagsDetails} />);
        });

        const expectedPrimaryTag = 'DIY';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedPrimaryTag);
        });

        const expectedSecondaryTag = 'Timber';
        it(`should have the secondary tag output equal to ${expectedSecondaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-secondary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedSecondaryTag);
        });
    });

    describe('with two tags including one from the topic category and one from the Homes navigation category', () => {
        const tagsDetails = [
            {
                name: 'homes:Topic:Gardening',
                urlName: 'gardening',
                fullName: 'food_Topic_Gardening',
                displayName: 'Gardening'
            },
            {
                name: 'food:Homes navigation:Real Homes',
                urlName: 'renovating',
                fullName: 'food_Topic_Renovating',
                displayName: 'Real Homes'
            }
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tagsDetails={tagsDetails} />);
        });

        const expectedPrimaryTag = 'Gardening';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedPrimaryTag);
        });

        it(`should have ignored the navigation tag`, () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'tag-secondary').length).to.equal(0);
        });
    });

    describe('with two tags without one from the topic category', () => {
        const tagsDetails = [{ name: 'homes:DIY and craft:DIY and craft tools:Tape measure' }, { name: 'homes:Renovating:Materials:Bamboo' }];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tagsDetails={tagsDetails} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with the topic tag only', () => {
        const tagsDetails = [
            {
                name: 'homes:Topic:Gardening',
                urlName: 'gardening',
                fullName: 'food_Topic_Gardening',
                displayName: 'Gardening'
            }
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tagsDetails={tagsDetails} />);
        });

        const expectedPrimaryTag = 'Gardening';
        it(`should have the primary tag equal to ${expectedPrimaryTag}`, () => {
            const tag = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'tag-primary');
            expect(ReactDOM.findDOMNode(tag).textContent).to.equal(expectedPrimaryTag);
        });

        it(`should not have the comma separator`, () => {
            const separator = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'tag-separator');
            expect(separator.length).to.equal(0);
        });
    });

    describe('with invalid tags', () => {
        const tags = ['Tape measure', 'Bamboo'];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with the tags prop as an empty array', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={[]} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with the tags prop as an empty object', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={{}} />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the tags prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

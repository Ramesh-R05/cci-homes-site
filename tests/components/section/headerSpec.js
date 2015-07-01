import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const Header = proxyquire('../../../app/components/section/header', {
    'react': React
});

describe('SectionHeader', () => {

    const singleWordHeading = ['homes:Homes navigation:Section'];
    describe(`with the heading prop equal to ${singleWordHeading}`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header tags={singleWordHeading} />);
        });

        const expectedHeading = 'Section';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'b');
            expect(React.findDOMNode(heading).textContent).to.equal(expectedHeading);
        });
    });

    const twoWordsHeading = ['homes:Homes navigation:Section Tag'];
    describe(`with the heading prop equal to ${twoWordsHeading}`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header tags={twoWordsHeading} />);
        });

        const expectedHeading = 'Section Tag';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(React.findDOMNode(heading).textContent.trim()).to.equal(expectedHeading);
        });

        const expectedBoldWord = 'Tag';
        it(`should have the second word '${expectedBoldWord}' bold`, () => {
            const boldWord = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'b');
            expect(React.findDOMNode(boldWord).textContent.trim()).to.equal(expectedBoldWord);
        });
    });

    const threeWordsHeading = ['homes:Homes navigation:Section Tag Landing'];
    describe(`with the heading prop equal to ${threeWordsHeading}`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header tags={threeWordsHeading} />);
        });

        const expectedHeading = 'Section Tag Landing';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(React.findDOMNode(heading).textContent).to.equal(expectedHeading);
        });

        const expectedBoldWord = 'Tag';
        it(`should have the second word '${expectedBoldWord}' bold`, () => {
            const boldWord = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'b');
            expect(React.findDOMNode(boldWord).textContent.trim()).to.equal(expectedBoldWord);
        });
    });

    const fourWordsHeading = ['homes:Homes navigation:Section Tag Landing Page'];
    describe(`with the heading prop equal to ${fourWordsHeading}`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header tags={fourWordsHeading} />);
        });

        const expectedHeading = 'Section Tag Landing Page';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(React.findDOMNode(heading).textContent.trim()).to.equal(expectedHeading);
        });

        let expectedBoldWord = 'Tag';
        it(`should have the second word '${expectedBoldWord}' bold`, () => {
            const boldWord = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'b')[0];
            expect(React.findDOMNode(boldWord).textContent.trim()).to.equal(expectedBoldWord);
        });

        const expectedSecondBoldWord = 'Page';
        it(`should have the fourth word '${expectedSecondBoldWord}' bold`, () => {
            const boldWord = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'b')[1];
            expect(React.findDOMNode(boldWord).textContent.trim()).to.equal(expectedSecondBoldWord);
        });
    });

    describe('with children', () => {
        let reactModule;
        let childComponent;
        const ChildrenComponentStub = Context.createStubComponentWithChildren();

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Header tags={['homes:Homes navigation:Section']}>
                    <ChildrenComponentStub />
                </Header>
            );
            childComponent = TestUtils.findRenderedComponentWithType(reactModule, ChildrenComponentStub);
        });

        it('should render the child component', () => {
            expect(React.findDOMNode(childComponent)).to.exist;
        });
    });

    describe('without the heading prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('with the heading prop as a string', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header tags={'Heading'} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

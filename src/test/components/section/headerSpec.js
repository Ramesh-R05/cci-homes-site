import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const SponsorHeaderStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();

const Header = proxyquire('../../../app/components/section/header', {
    'react': React,
    '@bxm/ad/lib/polar/components/sponsor/header': SponsorHeaderStub,
    '@bxm/ad/lib/google/components/ad': AdStub
});

describe('SectionHeader', () => {

    afterEach(Context.cleanup);

    const singleWordHeading = 'Section';
    describe(`with Top banner/leaderboard/billboard ad and heading prop`, () => {
        let reactModule;
        let ad;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header title={singleWordHeading} />);
            ad = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
        });

        it(`should render the Ad component with correct position and sizes`, () => {
            expect(ad).to.exist;
            expect(ad.props.targets).to.deep.equal({
                position: 1,
                kingtag: "Section"
            });
            const expectedSizes = {
                small: 'banner',
                medium: 'leaderboard',
                large: ['billboard', 'leaderboard']
            };
            expect(ad.props.sizes).to.deep.equal(expectedSizes);
        });

        const expectedClassname = 'ad--section-top-leaderboard';
        it(`should have the classname prop equal to ${expectedClassname}`, () => {
            expect(ad.props.className).to.equal(expectedClassname);
        });
    });

    describe(`with the heading prop equal to ${singleWordHeading}`, () => {
        let reactModule;
        let sponsorHeader;
        let heading;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header title={singleWordHeading} />);
            sponsorHeader = TestUtils.findRenderedComponentWithType(reactModule, SponsorHeaderStub);
            heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'b');
        });

        const expectedHeading = 'Section';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            expect(ReactDOM.findDOMNode(heading).textContent).to.equal(expectedHeading);
        });

        it(`should pass a title prop to SponsorHeader equal to ${expectedHeading}`, () => {
            const titleProp = sponsorHeader.props.title;
            expect(titleProp.type).to.eq('b');
            expect(titleProp.props.children).to.eq(expectedHeading);
        });

        it(`should pass a children prop to SponsorHeader equal to '${expectedHeading}`, () => {
            expect(ReactDOM.findDOMNode(heading).textContent).to.eq(expectedHeading);
        });
    });

    const twoWordsHeading = 'Section Tag';
    describe(`with the heading prop equal to ${twoWordsHeading}`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header title={twoWordsHeading} />);
        });

        const expectedHeading = 'Section Tag';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(heading).textContent.trim()).to.equal(expectedHeading);
        });

        const expectedBoldWord = 'Tag';
        it(`should have the second word '${expectedBoldWord}' bold`, () => {
            const boldWord = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'b');
            expect(ReactDOM.findDOMNode(boldWord).textContent.trim()).to.equal(expectedBoldWord);
        });
    });

    const threeWordsHeading = 'Section Tag Landing';
    describe(`with the heading prop equal to ${threeWordsHeading}`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header title={threeWordsHeading} />);
        });

        const expectedHeading = 'Section Tag Landing';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(heading).textContent).to.equal(expectedHeading);
        });

        const expectedBoldWord = 'Tag';
        it(`should have the second word '${expectedBoldWord}' bold`, () => {
            const boldWord = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'b');
            expect(ReactDOM.findDOMNode(boldWord).textContent.trim()).to.equal(expectedBoldWord);
        });
    });

    const fourWordsHeading = 'Section Tag Landing Page';
    describe(`with the heading prop equal to ${fourWordsHeading}`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header title={fourWordsHeading} />);
        });

        const expectedHeading = 'Section Tag Landing Page';
        it(`should have the heading equal to ${expectedHeading}`, () => {
            const heading = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'h1');
            expect(ReactDOM.findDOMNode(heading).textContent.trim()).to.equal(expectedHeading);
        });

        let expectedBoldWord = 'Tag';
        it(`should have the second word '${expectedBoldWord}' bold`, () => {
            const boldWord = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'b')[0];
            expect(ReactDOM.findDOMNode(boldWord).textContent.trim()).to.equal(expectedBoldWord);
        });

        const expectedSecondBoldWord = 'Page';
        it(`should have the fourth word '${expectedSecondBoldWord}' bold`, () => {
            const boldWord = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'b')[1];
            expect(ReactDOM.findDOMNode(boldWord).textContent.trim()).to.equal(expectedSecondBoldWord);
        });
    });

    describe('without the heading prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Header />);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

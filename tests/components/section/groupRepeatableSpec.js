import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const GroupRepeatable = proxyquire('../../../app/components/section/groupRepeatable', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/src/google/components/ad': AdStub
});

describe('GroupRepeatable', () => {

    describe('with 9 articles', () => {
        let section;
        let reactModule;
        let teasers;
        let ads;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <GroupRepeatable articles={articlesMock.slice(1, 10)} />
            );
            section = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, `section--9-items`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        const expectedNumSections = 1;
        it(`should render ${expectedNumSections} section`, () => {
            expect(section.length).to.equal(expectedNumSections);
        });

        const expectedNumTeasers = 9;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        describe(`Mrec ad (visible only on large viewport)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[0].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = 'mrec';
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[0].props.sizes).to.equal(expectedSizes);
            });

            const expectedDisplayFor = 'large';
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[0].props.displayFor).to.equal(expectedDisplayFor);
            });
        });

        describe(`Mrec ad (visible only on small/medium/xlarge viewports)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[1].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = {
                small: 'mrec',
                xlarge: ['double-mrec', 'mrec']
            };
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[1].props.sizes).to.deep.equal(expectedSizes);
            });

            const expectedDisplayFor = ['small', 'medium', 'xlarge'];
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[1].props.displayFor).to.deep.equal(expectedDisplayFor);
            });
        });

    });

    describe('without the articles prop as an empty array', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<GroupRepeatable articles={[]} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('without the articles prop', () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<GroupRepeatable />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

});

import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserStub = Context.createStubComponentWithChildren();
const PolarTeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const GroupRepeatable = proxyquire('../../../app/components/section/groupRepeatable', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '../polar/polarTeaser': PolarTeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub
});

describe('GroupRepeatable', () => {

    describe('with 9 articles', () => {
        let section;
        let reactModule;
        let teasers;
        let polarTeasers;
        let ads;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <GroupRepeatable articles={articlesMock.slice(1, 10)} />
            );
            section = TestUtils.scryRenderedDOMComponentsWithClass(reactModule, `section--9-items`);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            polarTeasers = TestUtils.scryRenderedComponentsWithType(reactModule, PolarTeaserStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        const expectedNumSections = 1;
        it(`should render ${expectedNumSections} section`, () => {
            expect(section.length).to.equal(expectedNumSections);
        });

        const expectedNumTeasers = 8;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        const expectedNumAds = 3;
        it(`should render ${expectedNumAds} Ads`, () => {
            expect(ads.length).to.equal(expectedNumAds);
        });

        describe(`native polar teasers`, () => {
            const expectedNumPolarTeasers = 1;
            it(`should render ${expectedNumPolarTeasers} polar teasers`, () => {
                expect(polarTeasers.length).to.equal(expectedNumPolarTeasers);
            });

            it(`should pass down the ad prop`, () => {
                expect(polarTeasers[0].props.ad).to.deep.equal({
                    label: 'section_teaser_2',
                    targets: {
                        kw: 'section_teaser_2'
                    }
                });
            });

            it(`should pass down the second article data`, () => {
                expect(polarTeasers[0].props.id).to.equal(articlesMock[2].id);
            });
        });

        describe(`banner/leaderboard/billboard ad`, () => {
            const expectedClassname = 'ad--section-middle-leaderboard';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[0].props.className).to.equal(expectedClassname);
            });

            it(`should be at position 2`, () => {
                expect(ads[0].props.targets).to.deep.equal({position: 2});
            });

            const expectedSizes = {
                small: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            };

            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[0].props.sizes).to.eql(expectedSizes);
            });
        });

        describe(`Mrec ad (visible only on large viewport)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[1].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = 'mrec';
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[1].props.sizes).to.equal(expectedSizes);
            });

            const expectedDisplayFor = 'large';
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[1].props.displayFor).to.equal(expectedDisplayFor);
            });

            it(`should be at position 2`, () => {
                expect(ads[1].props.targets).to.deep.equal({position: 2});
            });
        });

        describe(`Mrec ad (visible only on small/medium/xlarge viewports)`, () => {
            const expectedClassname = 'ad--section-mrec';
            it(`should have the classname prop equal to ${expectedClassname}`, () => {
                expect(ads[2].props.className).to.equal(expectedClassname);
            });

            const expectedSizes = {
                small: 'mrec',
                xlarge: ['double-mrec', 'mrec']
            };
            it(`should have the sizes prop equal to ${expectedSizes}`, () => {
                expect(ads[2].props.sizes).to.deep.equal(expectedSizes);
            });

            const expectedDisplayFor = ['small', 'medium', 'xlarge'];
            it(`should have the displayFor props equal to ${expectedDisplayFor}`, () => {
                expect(ads[2].props.displayFor).to.deep.equal(expectedDisplayFor);
            });

            it(`should be at position 2`, () => {
                expect(ads[2].props.targets).to.deep.equal({position: 2});
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

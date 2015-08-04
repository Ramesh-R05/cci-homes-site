import {betterMockComponentContext} from '@bxm/flux';
import {home as articlesMock} from '../../mock/articles';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const TeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const PolarTeaserStub = Context.createStubComponentWithChildren();
const SectionFeatured = proxyquire('../../../app/components/home/sectionFeatured', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../polar/polarTeaser': PolarTeaserStub
});

describe('SectionFeatured', () => {

    afterEach(Context.cleanup);

    describe(`with articles`, () => {
        let reactModule;
        let ads;
        let teasers;
        let polarTeasers;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <SectionFeatured articles={articlesMock}/>
            );
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            polarTeasers =  TestUtils.scryRenderedComponentsWithType(reactModule, PolarTeaserStub);
        });

        const expectedNumTeasers = 25; // hero is duplicated
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        const expectedNumPolarTeasers = 2;
        it(`should render ${expectedNumPolarTeasers} Polar native teasers`, () => {
            expect(polarTeasers.length).to.equal(expectedNumPolarTeasers);
        });

        describe(`Mobile Top banner ad`, () => {
            it(`should display a banner ad`, () => {
                expect(ads[1].props.sizes).to.deep.equal('banner');
            });

            it(`should be displayed on medium viewport and up`, () => {
                expect(ads[1].props.displayFor).to.deep.equal(['small']);
            });
        });

        describe(`Top leaderboard/billboard ad`, () => {
            it(`should display either a leaderboard or a billboard ad`, () => {
                const expectedSizes = {
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                expect(ads[0].props.sizes).to.deep.equal(expectedSizes);
            });

            it(`should be displayed on medium viewport and up`, () => {
                expect(ads[0].props.displayFor).to.deep.equal(['medium', 'large', 'xlarge']);
            });
        });

        describe(`Top MREC ad`, () => {
            it(`should display either a double mrec or a double-mrec`, () => {
                const expectedSizes = {
                    small: 'mrec',
                    xlarge: ['double-mrec', 'mrec']
                };
                expect(ads[2].props.sizes).to.deep.equal(expectedSizes);
            });
        });

        describe(`Middle banner/leaderboard/billboard ad`, () => {
            it(`should display either a banner, leaderboard or a billboard ad`, () => {
                const expectedSizes = {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                expect(ads[3].props.sizes).to.deep.equal(expectedSizes);
            });

            it(`should be targeted with position 2`, () => {
                expect(ads[3].props.targets).to.deep.equal({position: 2});
            });
        });

        describe(`Bottom MREC ad for small and medium viewports`, () => {
            it(`should only display an mrec`, () => {
                expect(ads[4].props.sizes).to.deep.equal('mrec');
            });

            it(`should be targeted with position 2`, () => {
                expect(ads[4].props.targets).to.deep.equal({position: 2});
            });

            it(`should be displayed on small and medium viewports only`, () => {
                expect(ads[4].props.displayFor).to.deep.equal(['small', 'medium']);
            });
        });

        describe(`Bottom MREC ad for large and xlarge viewports`, () => {
            it(`should only display a double-mrec or an mrec`, () => {
                expect(ads[5].props.sizes).to.deep.equal(['double-mrec', 'mrec']);
            });

            it(`should be targeted with position 2`, () => {
                expect(ads[5].props.targets).to.deep.equal({position: 2});
            });

            it(`should be displayed on large and xlarge viewports only`, () => {
                expect(ads[5].props.displayFor).to.deep.equal(['large', 'xlarge']);
            });
        });


        describe(`Hero for sm/md/lg viewports`, () => {
            it(`should have the first article data`, () => {
                expect(teasers[0].props.id).to.equal(articlesMock[0].id);
            });

            const expectedModifier = 'hero';
            it(`should have the modifier prop equal to ${expectedModifier}`, () => {
                expect(teasers[0].props.modifier).to.equal(expectedModifier);
            });
        });

        describe(`Hero for xlarge viewport`, () => {
            it(`should have the first article data`, () => {
                expect(teasers[2].props.id).to.equal(articlesMock[0].id);
            });

            const expectedModifier = 'hero';
            it(`should have the modifier prop equal to ${expectedModifier}`, () => {
                expect(teasers[2].props.modifier).to.equal(expectedModifier);
            });
        });

        describe(`First Polar native ad teaser`, () => {
            it(`should have the 5th article data`, () => {
                expect(polarTeasers[0].props.id).to.equal(articlesMock[4].id);
            });

            it(`should have the ad prop with the correct label`, () => {
                expect(polarTeasers[0].props.ad).to.deep.equal({label: 'home_teaser_1'});
            });
        });

        describe(`Second Polar native ad teaser`, () => {
            it(`should have the 16th article data`, () => {
                expect(polarTeasers[1].props.id).to.equal(articlesMock[16].id);
            });

            it(`should have the ad prop with the correct label`, () => {
                expect(polarTeasers[1].props.ad).to.deep.equal({label: 'home_teaser_2'});
            });
        });
    });

    describe(`without articles`, () => {
        let reactModule;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<SectionFeatured />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

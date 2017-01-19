import {betterMockComponentContext} from '@bxm/flux';
import {home as articlesMock} from '../../mock/articles';
import {items as gogMock} from '../../mock/galleryOfGalleries';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const InlineGalleryStub = Context.createStubComponent();
const TeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const PolarTeaserStub = Context.createStubComponentWithChildren();
const StickyAdStub = Context.createStubComponentWithChildren();
const polarNativeHub = Context.createStubComponentWithChildren();
const SectionFeatured = proxyquire('../../../app/components/home/sectionFeatured', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../polar/polarTeaser': PolarTeaserStub,
    '@bxm/behaviour/lib/components/sticky': StickyAdStub,
    '../inlineGallery/customInlineGallery': InlineGalleryStub,
    '../polar/polarNativeHub': polarNativeHub
});

describe('SectionFeatured', () => {

    afterEach(Context.cleanup);

    // BXMS-40: hide gog in homepage temporarily
    describe.skip(`with galleries`, () => {
        let reactModule;
        let inlineGallery;

        before(() => {
            reactModule = Context.mountComponent(SectionFeatured, {
                articles: articlesMock, galleries: gogMock
            });
            inlineGallery = TestUtils.findRenderedComponentWithType(reactModule, InlineGalleryStub);
        });

        it(`should render the CustomInlineGallery component and pass through galleries`, () => {
            expect(inlineGallery).to.exist;
            expect(inlineGallery.props.galleries).to.deep.equal(gogMock);
        });
    });

    describe(`with articles`, () => {
        let reactModule;
        let domElements;
        let ads;
        let teasers;
        let polarTeasers;
        let sticky;

        before(() => {
            reactModule = Context.mountComponent(SectionFeatured, {
                articles: articlesMock
            });

            domElements = ReactDOM.findDOMNode(reactModule);

            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            polarTeasers =  TestUtils.scryRenderedComponentsWithType(reactModule, PolarTeaserStub);
            sticky = TestUtils.findRenderedComponentWithType(reactModule, StickyAdStub);
        });

        it('should NOT render In Focus items', () => {
            expect(domElements.querySelector('.section-in-focus')).to.not.exist;
        });

        it('should NOT render Recommendations items', () => {
            expect(domElements.querySelector('.recommendations')).to.not.exist;
        });

        const expectedNumTeasers = 24; // hero is used to be  duplicated but now removed due to BXMS-40
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        it('should teaser lazyload to be turn off', () => {
            expect(teasers[0].props.lazyload).to.eq(false);
        });

        const expectedNumPolarTeasers = 2;
        it(`should render ${expectedNumPolarTeasers} Polar native teasers`, () => {
            expect(polarTeasers.length).to.equal(expectedNumPolarTeasers);
        });

        it('should render Sticky Ad section', () => {
            expect(sticky).to.exist;
        });

        describe(`Top MREC ad`, () => {
            it(`should display either a double mrec or a double-mrec at position 1`, () => {
                const expectedSizes = {
                    small: 'mrec',
                    large: ['double-mrec', 'mrec']
                };
                expect(ads[0].props.sizes).to.deep.equal(expectedSizes);
                expect(ads[0].props.targets).to.deep.equal({position: 1});
            });
        });

        describe(`Middle MREC ad for small viewport only`, () => {
            it(`should display an mrec at position 2`, () => {
                const expectedSizes = {
                    small: 'mrec'
                };
                expect(ads[1].props.sizes).to.deep.equal(expectedSizes);
                expect(ads[1].props.targets).to.deep.equal({position: 2});
            });

            it(`should be displayed on small viewport only`, () => {
                expect(ads[1].props.displayFor).to.deep.equal(['small']);
            });
        });

        describe(`Middle banner/leaderboard/billboard ad`, () => {
            it(`should display either a banner, leaderboard or a billboard ad at position 2`, () => {
                const expectedSizes = {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                expect(ads[2].props.sizes).to.deep.equal(expectedSizes);
            });

            it(`should be targeted with position 2`, () => {
                expect(ads[2].props.targets).to.deep.equal({position: 2});
            });
        });

        describe(`Bottom MREC ad for small and medium viewports`, () => {
            it(`should only display an mrec`, () => {
                expect(ads[3].props.sizes).to.deep.equal('mrec');
            });

            const pos = 3;
            it(`should be targeted with position ${pos}`, () => {
                expect(ads[3].props.targets).to.deep.equal({position: pos});
            });

            it(`should be displayed on small and medium viewports only`, () => {
                expect(ads[3].props.displayFor).to.deep.equal(['small', 'medium']);
            });
        });

        describe(`Bottom MREC ad for large and xlarge viewports`, () => {
            it(`should only display a double-mrec or an mrec`, () => {
                expect(ads[4].props.sizes).to.deep.equal(['double-mrec', 'mrec']);
            });

            it(`should be targeted with position 2`, () => {
                expect(ads[4].props.targets).to.deep.equal({position: 2});
            });

            it(`should be displayed on large and xlarge viewports only`, () => {
                expect(ads[4].props.displayFor).to.deep.equal(['large', 'xlarge']);
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

        describe(`First Polar native ad teaser`, () => {
            it(`should have the 4th article data`, () => {
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
            reactModule = Context.mountComponent(SectionFeatured, {});
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

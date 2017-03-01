import {betterMockComponentContext} from '@bxm/flux';
import heroMock from '../../mock/article';
import {home as articlesMock} from '../../mock/articles';
import {items as gogMock} from '../../mock/galleryOfGalleries';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const InlineGalleryStub = Context.createStubComponent();
const TeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const PolarTeaserStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponentWithChildren();
const repeatableStub = Context.createStubComponent();
const listStub = Context.createStubComponent();
const SocialAndSubscribeLinksStub = Context.createStubComponent();
const StickyMobileAdStub = Context.createStubComponent();

const SectionFeatured = proxyquire('../../../app/components/home/sectionFeatured', {
    'react': React,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../polar/polarTeaser': PolarTeaserStub,
    '@bxm/behaviour/lib/components/sticky': StickyAdStub,
    '../repeatable': repeatableStub,
    '../section/list': listStub,
    '../socialAndSubscribeLinks': SocialAndSubscribeLinksStub,
    '@bxm/ad/lib/google/components/stickyAd' : StickyMobileAdStub
});

const polarTargetsStub = [
    [{index: 0},{index:5}],
    [{
        index: 5,
        label: 'section_bottom_feed_1',
        targets: {kw:'section_bottom_feed_1'}
    }]
];

describe('SectionFeatured', () => {

    afterEach(Context.cleanup);

    // BXMS-40: hide gog in homepage temporarily
    describe.skip(`with galleries`, () => {
        let reactModule;
        let inlineGallery;

        before(() => {
            reactModule = Context.mountComponent(SectionFeatured, {
                articles: articlesMock,
                galleries: gogMock,
                polarTargets: polarTargetsStub
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
        let stickies;
        let stickyMobile;

        before(() => {

            reactModule = Context.mountComponent(SectionFeatured, {
                hero: heroMock,
                articles: articlesMock,
                polarTargets: polarTargetsStub,
                content: {nodeType: 'homePage'}
            });

            domElements = ReactDOM.findDOMNode(reactModule);

            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            polarTeasers =  TestUtils.scryRenderedComponentsWithType(reactModule, PolarTeaserStub);
            stickies = TestUtils.scryRenderedComponentsWithType(reactModule, StickyAdStub);
            stickyMobile = TestUtils.scryRenderedComponentsWithType(reactModule, StickyMobileAdStub)
        });

        const expectedNumTeasers = 6;
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

        describe(`Sticky ads`, () => {
            const expectedNumStickyAds = 1;
            it(`should render ${expectedNumStickyAds} Sticky Ad sections`, () => {
                expect(stickies.length).to.equal(expectedNumStickyAds);
            });
        });

        describe(`Top section`, () => {

            describe(`Top MREC ad`, () => {
                it(`should display only single mrec in small and medium sizes at position 1`, () => {
                    const expectedSizes = {
                        small: 'mrec',
                        medium: 'mrec'
                    };
                    expect(ads[0].props.sizes).to.deep.equal(expectedSizes);
                    expect(ads[0].props.targets).to.deep.equal({position: 1});
                });
            });

            describe(`Middle MREC ad`, () => {
                it(`should display only single mrec in medium size at position 2`, () => {
                    const expectedSizes = {
                        medium: 'mrec'
                    };
                    expect(ads[1].props.sizes).to.deep.equal(expectedSizes);
                    expect(ads[1].props.targets).to.deep.equal({position: 2});
                });

                it(`should be displayed on small viewport only`, () => {
                    expect(ads[1].props.displayFor).to.deep.equal(['medium']);
                });
            });

            describe(`Sticky MREC ad`, () => {
                it(`should display for both large and xlarge breakpoints with double mrec and mrec sizes`, () => {
                    expect(ads[2].props.displayFor).to.deep.equal(['large', 'xlarge']);
                    expect(ads[2].props.sizes).to.deep.equal(['double-mrec', 'mrec']);
                    expect(ads[2].props.targets).to.deep.equal({position: 1});
                });
            });
        });

        describe(`Middle banner/leaderboard/billboard ad`, () => {
            it(`should display either a banner, leaderboard or a billboard ad at position 2`, () => {
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

        describe(`Hero for sm/md viewports`, () => {
            it(`should have the first article data`, () => {
                expect(teasers[0].props.id).to.equal(heroMock.id);
            });

            const expectedModifier = 'hero-img-top';
            it(`should have the modifier prop equal to ${expectedModifier}`, () => {
                expect(teasers[0].props.modifier).to.equal(expectedModifier);
            });

            const nonExpectedModifier = 'hero';
            it(`should not have the modifier prop equal to ${nonExpectedModifier}`, () => {
                expect(teasers[0].props.modifier).to.not.equal(nonExpectedModifier);
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

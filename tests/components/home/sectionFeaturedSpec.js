import {betterMockComponentContext} from '@bxm/flux';
import {home as articlesMock} from '../../mock/articles';
import {items as gogMock} from '../../mock/galleryOfGalleries';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const InlineGalleryStub = Context.createStubComponent();
const TeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const PolarTeaserStub = Context.createStubComponentWithChildren();
const StickyAdStub = Context.createStubComponentWithChildren();
const breakPoints = {
    smallRangeMax: 700,
    mediumRangeMax: 1000,
    largeRangeMax: 1400
};
const SectionFeatured = proxyquire('../../../app/components/home/sectionFeatured', {
    'react': React,
    '../../breakpoints': breakPoints,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '../polar/polarTeaser': PolarTeaserStub,
    '../section/sticky': StickyAdStub,
    '@bxm/gallery/lib/components/inlineGallery': InlineGalleryStub
});

let isGOGEnabled = true;

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        isFeatureEnabled() {
            return isGOGEnabled;
        }
    }
};

describe('SectionFeatured', () => {

    afterEach(Context.cleanup);

    describe(`with galleries`, () => {
        let reactModule;
        let inlineGallery;

        before(() => {
            reactModule = Context.mountComponent(SectionFeatured, {
                articles: articlesMock, galleries: gogMock
            }, [contextConfigStub]);
            inlineGallery = TestUtils.findRenderedComponentWithType(reactModule, InlineGalleryStub);
        });

        it(`should render the InlineGallery component and pass through galleries`, () => {
            expect(inlineGallery).to.exist;
            expect(inlineGallery.props.galleries).to.deep.equal(gogMock);
        });

        it(`should pass the renderSlide prop to the InlineGallery component`, () => {
            expect(inlineGallery.props.renderSlide).to.equal(reactModule.renderSlide);
        });

        it(`should pass the imageSizes prop to the InlineGallery component`, () => {
            expect(inlineGallery.props.imageSizes).to.equal(SectionFeatured.inlineGalleryImageSizes);
        });

        it(`should pass the breakpoints prop to the InlineGallery component`, () => {
            expect(inlineGallery.props.breakpoints).to.equal(breakPoints);
        });

        describe(`#renderSlide`, () => {
            it('should render a GallerySlide Component with relevant props', () => {
                const imageUrl = 'IMAGE URL';
                const itemMock = gogMock[0];
                const component = reactModule.renderSlide(itemMock, 1, imageUrl);
                let cloneProps = {...itemMock};
                cloneProps.imageUrl = imageUrl;
                expect(component.props).to.deep.eq(cloneProps);
            });

            it('should return null when no args passed', () => {
                const component = reactModule.renderSlide();
                expect(component).to.eq(null);
            });

            it('should render null when image is not passed', () => {
                const itemMock = gogMock[0];
                const component = reactModule.renderSlide(itemMock, 0);
                expect(component).to.eq(null);
            });
        });
    });

    describe(`with galleries and galleryOfGalleries feature is toggled off`, () => {
        let reactModule;
        let inlineGallery;

        before(() => {
            isGOGEnabled = false;
            reactModule = Context.mountComponent(SectionFeatured, {
                articles: articlesMock,
                galleries: gogMock
            }, [contextConfigStub]);
            inlineGallery = TestUtils.scryRenderedComponentsWithType(reactModule, InlineGalleryStub);
        });

        after(() => {
            isGOGEnabled = true;
        });

        it(`should not render the InlineGallery component`, () => {
            expect(inlineGallery.length).to.equal(0);
        });
    });

    describe(`without galleries`, () => {
        let reactModule;
        let inlineGallery;

        before(() => {
            reactModule = Context.mountComponent(SectionFeatured, {
                articles: articlesMock,
            }, [contextConfigStub]);
            inlineGallery = TestUtils.findRenderedComponentWithType(reactModule, InlineGalleryStub);
        });

        it(`should render the InlineGallery component and pass through an empty array for galleries`, () => {
            expect(inlineGallery).to.exist;
            expect(inlineGallery.props.galleries).to.deep.equal([]);
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
            }, [contextConfigStub]);

            domElements = React.findDOMNode(reactModule);

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

        const expectedNumTeasers = 25; // hero is duplicated
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        const expectedNumPolarTeasers = 2;
        it(`should render ${expectedNumPolarTeasers} Polar native teasers`, () => {
            expect(polarTeasers.length).to.equal(expectedNumPolarTeasers);
        });

        it('should render Sticky Ad section', () => {
            expect(sticky).to.exist;
        });

        describe(`Mobile Top banner ad`, () => {
            it(`should display a banner ad at position 1`, () => {
                expect(ads[1].props.sizes).to.equal('banner');
                expect(ads[1].props.targets).to.deep.equal({position: 1});
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
                expect(ads[1].props.targets).to.deep.equal({position: 1});
            });

            it(`should be displayed on medium viewport and up`, () => {
                expect(ads[0].props.displayFor).to.deep.equal(['medium', 'large', 'xlarge']);
            });
        });

        describe(`Top MREC ad`, () => {
            it(`should display either a double mrec or a double-mrec at position 1`, () => {
                const expectedSizes = {
                    small: 'mrec',
                    xlarge: ['double-mrec', 'mrec']
                };
                expect(ads[2].props.sizes).to.deep.equal(expectedSizes);
                expect(ads[2].props.targets).to.deep.equal({position: 1});
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
            reactModule = Context.mountComponent(SectionFeatured, {}, [contextConfigStub]);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});

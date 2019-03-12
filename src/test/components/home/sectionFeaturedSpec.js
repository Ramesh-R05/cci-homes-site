import { betterMockComponentContext } from '@bxm/flux';
import heroMock from '../../mock/article';
import { home as articlesMock } from '../../mock/articles';
import proxyquire, { noCallThru } from 'proxyquire';
import latestVideoStubData from '../../../stubs/bff-latest-videos';
noCallThru();

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const TeaserStub = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponentWithChildren();
const StickyAdStub = Context.createStubComponentWithChildren();
const repeatableStub = Context.createStubComponent();
const listStub = Context.createStubComponent();
const SocialAndSubscribeLinksStub = Context.createStubComponent();
const StickyMobileAdStub = Context.createStubComponent();
const latestVideoModuleStub = Context.createStubComponent();

const SectionFeatured = proxyquire('../../../app/components/home/sectionFeatured', {
    react: React,
    '../teaser/teaser': TeaserStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/behaviour/lib/components/sticky': StickyAdStub,
    '../repeatable': repeatableStub,
    '../section/list': listStub,
    '../socialAndSubscribeLinks': SocialAndSubscribeLinksStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyMobileAdStub,
    './latestVideos': latestVideoModuleStub
});

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const polarTargetsStub = [
    [{ index: 0 }, { index: 5 }],
    [
        {
            index: 5,
            label: 'section_bottom_feed_1',
            targets: { kw: 'section_bottom_feed_1' }
        }
    ]
];

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        isFeatureEnabled: () => true
    }
};

describe('SectionFeatured', () => {
    afterEach(Context.cleanup);

    describe(`with articles`, () => {
        let reactModule;
        let domElements;
        let ads;
        let teasers;
        let stickies;
        let stickyMobile;

        before(() => {
            reactModule = Context.mountComponent(
                SectionFeatured,
                {
                    hero: heroMock,
                    articles: articlesMock,
                    polarTargets: polarTargetsStub,
                    content: { nodeType: 'homePage' }
                },
                [contextConfigStub]
            );

            domElements = ReactDOM.findDOMNode(reactModule);

            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
            teasers = TestUtils.scryRenderedComponentsWithType(reactModule, TeaserStub);
            stickies = TestUtils.scryRenderedComponentsWithType(reactModule, StickyAdStub);
            stickyMobile = TestUtils.scryRenderedComponentsWithType(reactModule, StickyMobileAdStub);
        });

        const expectedNumTeasers = 7;
        it(`should render ${expectedNumTeasers} teasers`, () => {
            expect(teasers.length).to.equal(expectedNumTeasers);
        });

        it('should teaser lazyload to be turn off', () => {
            expect(teasers[0].props.lazyload).to.eq(false);
        });

        describe(`Sticky ads`, () => {
            const expectedNumStickyAds = 1;
            it(`should render ${expectedNumStickyAds} Sticky Ad sections`, () => {
                expect(stickies.length).to.equal(expectedNumStickyAds);
            });
        });

        describe(`Top section`, () => {
            describe(`Top MREC ad`, () => {
                it(`should display only single mrec in small and medium sizes`, () => {
                    const expectedSizes = {
                        small: 'mrec',
                        medium: 'mrec'
                    };
                    expect(ads[0].props.sizes).to.deep.equal(expectedSizes);
                });
            });

            describe(`Middle MREC ad`, () => {
                it(`should display only single mrec in medium size`, () => {
                    const expectedSizes = {
                        medium: 'mrec'
                    };
                    expect(ads[1].props.sizes).to.deep.equal(expectedSizes);
                });

                it(`should be displayed on small viewport only`, () => {
                    expect(ads[1].props.displayFor).to.deep.equal(['medium']);
                });
            });

            describe(`Sticky MREC ad`, () => {
                it(`should display for both large and xlarge breakpoints with double mrec and mrec sizes`, () => {
                    expect(ads[2].props.displayFor).to.deep.equal(['large', 'xlarge']);
                    expect(ads[2].props.sizes).to.deep.equal(['double-mrec', 'mrec']);
                });
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
        });
    });

    describe(`without articles`, () => {
        let reactModule;

        before(() => {
            reactModule = Context.mountComponent(SectionFeatured, {}, [contextConfigStub]);
        });

        it('should not be rendered', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe.skip(`Latest video module`, () => {
        let reactModule;
        let latestVideos;

        before(() => {
            reactModule = Context.mountComponent(SectionFeatured, { articles: articlesMock, latestVideos: latestVideoStubData }, [contextConfigStub]);
            latestVideos = TestUtils.scryRenderedComponentsWithType(reactModule, latestVideoModuleStub);
        });

        it('should be rendered', () => {
            expect(latestVideos.length).to.equal(1);
        });
    });
});

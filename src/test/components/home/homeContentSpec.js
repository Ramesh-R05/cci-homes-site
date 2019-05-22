import { filterErrors, restoreErrors } from '../../utils/propTypeWarningFilter';
import { betterMockComponentContext } from '@bxm/flux';
import heroMock from '../../mock/article';
import { home as articlesMock } from '../../mock/articles';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import latestVideoStubData from '../../../stubs/bff-latest-videos';

noCallThru();

const Context = betterMockComponentContext();

const AdStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();
const listStub = Context.createStubComponent();
const SocialAndSubscribeLinksStub = Context.createStubComponent();
const RailStub = Context.createStubComponentWithChildren();
const FeaturedStub = Context.createStubComponent();
const LatestVideosStub = Context.createStubComponent();
const FeaturedBrandStub = Context.createStubComponent();
const LoadListStub = sinon.stub();

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const { HomeContent } = proxyquire('../../../app/components/home/homeContent', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub,
    '../repeatable': RepeatableStub,
    '../section/list': listStub,
    '../../actions/loadList': LoadListStub,
    '../socialAndSubscribeLinks': SocialAndSubscribeLinksStub,
    '../section/rail': RailStub,
    '../section/featured': FeaturedStub,
    './latestVideos': LatestVideosStub,
    '../featuredBrandsSection/featuredBrandsSection': FeaturedBrandStub
});

const TestWrapper = new ShallowWrapperFactory(HomeContent);

describe('HomeContent component', () => {
    describe('rendering', () => {
        describe('with default props', () => {
            let wrapper;

            before(() => {
                filterErrors();

                [wrapper] = TestWrapper(
                    {},
                    {
                        config: {
                            isFeatureEnabled: sinon.stub().returns(false),
                            polar: {
                                details: {
                                    homeTopFeed: [],
                                    homeBottomFeed: []
                                }
                            }
                        }
                    }
                );
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.isEmptyRender()).to.be.true;
            });
        });

        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let testContext;

            before(() => {
                [wrapper, testProps, testContext] = TestWrapper(
                    {
                        content: {
                            value: 2
                        },
                        hero: {
                            article: 1
                        },
                        articles: articlesMock,
                        list: {
                            items: [1, 2, 3]
                        },
                        listNextParams: {
                            page: 2,
                            prevPage: 1
                        }
                    },
                    {
                        config: {
                            isFeatureEnabled: sinon.stub().returns(false),
                            polar: {
                                details: {
                                    homeTopFeed: [
                                        {
                                            index: 0,
                                            label: 'home_top_feed_1',
                                            targets: { kw: 'home_top_feed_1' }
                                        },
                                        {
                                            index: 5,
                                            label: 'home_top_feed_2',
                                            targets: { kw: 'home_top_feed_2' }
                                        }
                                    ],
                                    homeBottomFeed: [
                                        {
                                            index: 1,
                                            label: 'home_bottom_feed_1',
                                            targets: { kw: 'home_bottom_feed_1' }
                                        },
                                        {
                                            index: 5,
                                            label: 'home_bottom_feed_2',
                                            targets: { kw: 'home_bottom_feed_2' }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                );
            });

            it('renders the component', () => {
                expect(wrapper.isEmptyRender()).to.be.false;
            });

            it('renders the Featured component with correct props', () => {
                expect(wrapper.find(FeaturedStub).props()).to.include({
                    polarTargets: testContext.config.polar.details.homeTopFeed,
                    hero: testProps.hero,
                    articles: testProps.articles
                });
            });

            it('renders the mobile subscribe block using the renderProp of the Feautured component with the correct visibility class', () => {
                expect(
                    wrapper
                        .find(FeaturedStub)
                        .renderProp('renderBlockBelowHero')()
                        .find('.show-for-small-only')
                        .childAt(0)
                        .is(SocialAndSubscribeLinksStub)
                );
            });

            it('renders the Rail component with correct props', () => {
                expect(wrapper.find(RailStub).props()).to.include({
                    marginBottom: 120,
                    yPosition: 95
                });
            });

            it('renders the SocialAndSubscribeLinks component as a child of the rail', () => {
                expect(
                    wrapper
                        .find(RailStub)
                        .childAt(0)
                        .is(SocialAndSubscribeLinksStub)
                );
            });

            it('renders the SocialAndSubscribeLinks with correct props', () => {
                expect(
                    wrapper
                        .find(RailStub)
                        .childAt(0)
                        .props()
                ).to.deep.eq({
                    content: testProps.content
                });
            });

            it('renders a single Ad component ', () => {
                expect(wrapper.find(AdStub)).to.have.length(1);
            });

            it('renders the single Ad component Ad component with correct props', () => {
                expect(wrapper.find(AdStub).props()).to.deep.eq({
                    className: 'ad--section-middle-leaderboard',
                    sizes: {
                        small: 'banner',
                        leaderboard: 'leaderboard',
                        billboard: ['billboard', 'leaderboard']
                    },
                    label: { active: false },
                    pageLocation: AdStub.pos.outside
                });
            });

            it('renders the Repeateable component with correct props', () => {
                expect(wrapper.find(RepeatableStub).props()).to.deep.eq({
                    component: listStub,
                    action: LoadListStub,
                    dataSource: testProps.list,
                    nextParams: testProps.listNextParams,
                    className: 'news-feed bottom-news-feed',
                    adTargets: { position: 2 },
                    content: testProps.content,
                    polarTargets: testContext.config.polar.details.homeBottomFeed
                });
            });

            it('renders 1 StickyAd component', () => {
                expect(wrapper.find(StickyAdStub)).to.have.length(1);
            });

            it('renders the StickyAd component with correct props', () => {
                expect(wrapper.find(StickyAdStub).props()).to.deep.eq({
                    adProps: {
                        className: 'ad--section-bottom-leaderboard',
                        displayFor: ['small', 'medium', 'large', 'xlarge'],
                        sizes: {
                            banner: 'banner',
                            leaderboard: 'leaderboard',
                            billboard: ['billboard', 'leaderboard']
                        },
                        pageLocation: AdStub.pos.outside,
                        lazyLoad: true
                    },
                    minHeight: 450,
                    stickyAtViewPort: 'mediumRangeMax',
                    stickyDelay: 5500
                });
            });
        });

        describe('with invalid props', () => {
            describe('articles prop empty', () => {
                let wrapper;

                before(() => {
                    filterErrors();

                    [wrapper] = TestWrapper(
                        {
                            articles: []
                        },
                        {
                            config: {
                                isFeatureEnabled: sinon.stub().returns(false),
                                polar: {
                                    details: {
                                        homeTopFeed: [],
                                        homeBottomFeed: []
                                    }
                                }
                            }
                        }
                    );
                });

                after(() => {
                    restoreErrors();
                });

                it('does not render', () => {
                    expect(wrapper.isEmptyRender()).to.be.true;
                });
            });
        });
    });
    describe('context', () => {
        describe('with lipstick feature toggle enabled ', () => {
            describe('and latestVideos prop passed', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper(
                        {
                            content: {
                                value: 2
                            },
                            hero: {
                                article: 1
                            },
                            articles: articlesMock,
                            list: {
                                items: [1, 2, 3]
                            },
                            listNextParams: {
                                page: 2,
                                prevPage: 1
                            },
                            latestVideos: latestVideoStubData,
                            featuredBrands: { brand: 'name' },
                            latestBrandItems: [{ article: '1' }, { article: '2' }]
                        },
                        {
                            config: {
                                isFeatureEnabled: sinon
                                    .stub()
                                    .withArgs('lipstick')
                                    .returns(true),
                                polar: {
                                    details: {
                                        homeTopFeed: [
                                            {
                                                index: 0,
                                                label: 'home_top_feed_1',
                                                targets: { kw: 'home_top_feed_1' }
                                            },
                                            {
                                                index: 5,
                                                label: 'home_top_feed_2',
                                                targets: { kw: 'home_top_feed_2' }
                                            }
                                        ],
                                        homeBottomFeed: [
                                            {
                                                index: 1,
                                                label: 'home_bottom_feed_1',
                                                targets: { kw: 'home_bottom_feed_1' }
                                            },
                                            {
                                                index: 5,
                                                label: 'home_bottom_feed_2',
                                                targets: { kw: 'home_bottom_feed_2' }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    );
                });

                it('renders the component', () => {
                    expect(wrapper.isEmptyRender()).to.be.false;
                });

                it('renders the LatestVideos component with correct props', () => {
                    expect(wrapper.find(LatestVideosStub).props()).to.deep.eq({
                        title: 'Latest Videos',
                        videoList: testProps.latestVideos
                    });
                });

                it('renders the FeaturedBrandsSection component with correct props', () => {
                    expect(
                        wrapper.find(FeaturedBrandStub).props({
                            featuredBrands: testProps.featuredBrands,
                            latestBrandItems: testProps.latestBrandItems
                        })
                    );
                });
            });
            describe('and latestVideos prop not passed', () => {
                let wrapper;
                let testProps;

                before(() => {
                    [wrapper, testProps] = TestWrapper(
                        {
                            content: {
                                value: 2
                            },
                            hero: {
                                article: 1
                            },
                            articles: articlesMock,
                            list: {
                                items: [1, 2, 3]
                            },
                            listNextParams: {
                                page: 2,
                                prevPage: 1
                            },
                            latestVideos: [],
                            featuredBrands: { brand: 'name' },
                            latestBrandItems: [{ article: '1' }, { article: '2' }]
                        },
                        {
                            config: {
                                isFeatureEnabled: sinon
                                    .stub()
                                    .withArgs('lipstick')
                                    .returns(true),
                                polar: {
                                    details: {
                                        homeTopFeed: [
                                            {
                                                index: 0,
                                                label: 'home_top_feed_1',
                                                targets: { kw: 'home_top_feed_1' }
                                            },
                                            {
                                                index: 5,
                                                label: 'home_top_feed_2',
                                                targets: { kw: 'home_top_feed_2' }
                                            }
                                        ],
                                        homeBottomFeed: [
                                            {
                                                index: 1,
                                                label: 'home_bottom_feed_1',
                                                targets: { kw: 'home_bottom_feed_1' }
                                            },
                                            {
                                                index: 5,
                                                label: 'home_bottom_feed_2',
                                                targets: { kw: 'home_bottom_feed_2' }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    );
                });

                it('renders the component', () => {
                    expect(wrapper.isEmptyRender()).to.be.false;
                });

                it('renders the FeaturedBrands component with correct props', () => {
                    expect(
                        wrapper.find(FeaturedBrandStub).props({
                            featuredBrands: testProps.featuredBrands,
                            latestBrandItems: testProps.latestBrandItems
                        })
                    );
                });

                it('does not render the LatestVideos component', () => {
                    expect(wrapper.find(LatestVideosStub)).to.have.length(0);
                });
            });
        });
    });
});

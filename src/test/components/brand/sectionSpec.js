import { betterMockComponentContext } from '@bxm/flux';
import heroMock from '../../mock/article';
import articlesMock from '../../mock/articles';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';

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
const lodashSliceStub = sinon.stub();

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const { BrandSection } = proxyquire('../../../app/components/brand/section', {
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub,
    '../repeatable': RepeatableStub,
    '../section/list': listStub,
    '../../actions/loadList': LoadListStub,
    '../socialAndSubscribeLinks': SocialAndSubscribeLinksStub,
    '../section/rail': RailStub,
    './featured': FeaturedStub,
    './latestVideos': LatestVideosStub,
    '../featuredBrandsSection/featuredBrandsSection': FeaturedBrandStub,
    'lodash/array/slice': lodashSliceStub
});

const TestWrapper = new ShallowWrapperFactory(BrandSection);

describe('BrandSection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let testContext;
            let articles;

            before(() => {
                articles = articlesMock.home.slice(0, 6);
                lodashSliceStub.returns(articles);

                [wrapper, testProps, testContext] = TestWrapper(
                    {
                        content: {
                            value: 2,
                            urlName: 'belle'
                        },
                        hero: heroMock,
                        articles: articlesMock.home,
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
                                    sectionTopFeed: [
                                        {
                                            index: 0,
                                            label: 'section_top_feed_1',
                                            targets: { kw: 'section_top_feed_1' }
                                        },
                                        {
                                            index: 5,
                                            label: 'section_top_feed_2',
                                            targets: { kw: 'section_top_feed_2' }
                                        }
                                    ],
                                    sectionBottomFeed: [
                                        {
                                            index: 1,
                                            label: 'section_bottom_feed_1',
                                            targets: { kw: 'section_bottom_feed_1' }
                                        },
                                        {
                                            index: 5,
                                            label: 'section_bottom_feed_2',
                                            targets: { kw: 'section_bottom_feed_2' }
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

            it('sets the correct class name on the root based on the content urlName prop', () => {
                expect(wrapper.at(0).prop('className')).to.eq(`brand-section container brand-section--${testProps.content.urlName}`);
            });

            it('renders the Featured component with correct props', () => {
                expect(wrapper.find(FeaturedStub).props()).to.deep.eq({
                    content: testProps.content,
                    polarTargets: testContext.config.polar.details.sectionTopFeed,
                    hero: testProps.hero,
                    articles
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
                    polarTargets: testContext.config.polar.details.sectionBottomFeed
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
    });
});

import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import { betterMockComponentContext } from '@bxm/flux';
import articlesMock from '../../mock/articles';

noCallThru();

const Context = betterMockComponentContext();

const FeaturedStub = Context.createStubComponent();
const ListStub = Context.createStubComponent();
const RailStub = Context.createStubComponent();
const RepeatableStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();
const loadSearchStub = sinon.stub();

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const SearchContent = proxyquire('../../../app/components/search/searchContent', {
    '../section/featured': FeaturedStub,
    '../section/list': ListStub,
    '../section/rail': RailStub,
    '../repeatable': RepeatableStub,
    '../../actions/loadSearch': loadSearchStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub
});

const TestWrapper = new ShallowWrapperFactory(SearchContent);

const selectors = {
    root: '.section__landing',
    middleSection: '.section__row.section__middle'
};

describe('SearchContent component', () => {
    describe('with valid required props and context', () => {
        let wrapper;
        let testProps;
        let testContext;

        before(() => {
            [wrapper, testProps, testContext] = TestWrapper(
                {
                    articles: [...articlesMock.articles],
                    content: { val: 'foo' },
                    list: { data: [1, 2, 3, 4] },
                    listNextParams: { bar: 'baz' }
                },
                {
                    config: {
                        polar: {
                            details: {
                                sectionTopFeed: 'sectionTopFeed',
                                sectionBottomFeed: 'sectionBottomFeed'
                            }
                        }
                    }
                }
            );
        });

        it('renders the component', () => {
            const { root } = selectors;

            expect(wrapper.find(root).exists()).to.be.true;
        });

        it('renders the Featured component with correct props', () => {
            expect(wrapper.find(FeaturedStub).props()).to.deep.eq({
                articles: testProps.articles,
                polarTargets: testContext.config.polar.details.sectionTopFeed,
                showSearchBar: true
            });
        });

        it('renders the Rail component with correct props', () => {
            expect(wrapper.find(RailStub).props()).to.deep.eq({
                adPosition: 1,
                marginBottom: 60,
                yPosition: 95
            });
        });

        it('renders one Ad within the middle section', () => {
            const { middleSection } = selectors;

            expect(wrapper.find(middleSection).find(AdStub)).to.have.length(1);
        });

        it('passes the correct props to the Ad in the middle section', () => {
            const { middleSection } = selectors;

            expect(
                wrapper
                    .find(middleSection)
                    .find(AdStub)
                    .props()
            ).to.deep.eq({
                className: 'ad--section-middle-leaderboard section__ad',
                sizes: {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                },
                label: { active: false },
                pageLocation: AdStub.pos.outside
            });
        });

        it('renders the Repeatable component with the corect props', () => {
            expect(wrapper.find(RepeatableStub).props()).to.deep.eq({
                component: ListStub,
                action: loadSearchStub,
                dataSource: testProps.list,
                nextParams: testProps.listNextParams,
                className: 'news-feed bottom-news-feed',
                content: testProps.content,
                polarTargets: testContext.config.polar.details.sectionBottomFeed
            });
        });

        it('renders the StickyAd component as the last child in the container div', () => {
            const { root } = selectors;
            const containerDivChildrenLength = wrapper
                .find(root)
                .childAt(0)
                .children().length;
            expect(
                wrapper
                    .find(root)
                    .childAt(0)
                    .childAt(containerDivChildrenLength - 1)
                    .is(StickyAdStub)
            ).to.be.true;
        });

        it('renders the sticky ad as the last child in the container div with the correct props', () => {
            const { root } = selectors;

            const containerDivChildrenLength = wrapper
                .find(root)
                .childAt(0)
                .children().length;
            expect(
                wrapper
                    .find(root)
                    .childAt(0)
                    .childAt(containerDivChildrenLength - 1)
                    .props()
            ).to.deep.eq({
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

        it('renders one regular Ad component', () => {
            expect(wrapper.find(AdStub)).to.have.length(1);
        });

        it('renders one StickyAd component', () => {
            expect(wrapper.find(StickyAdStub)).to.have.length(1);
        });
    });
});

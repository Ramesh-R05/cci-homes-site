import { betterMockComponentContext } from '@bxm/flux';
import heroMock from '../../mock/article';
import { entity, articles as articlesMock } from '../../mock/articles';
import clone from 'lodash/lang/clone';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const FeaturedStub = Context.createStubComponent();
const repeatableStub = Context.createStubComponent();
const listStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const StickyStub = Context.createStubComponentWithChildren();
const StickyMobileAdStub = Context.createStubComponent();

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const contextConfigStub = {
    key: 'config',
    type: '',
    value: {
        polar: {
            details: {
                sectionTopFeed: [
                    {
                        index: 0,
                        label: 'section_top_feed_1',
                        targets: { kw: 'section_top_feed_1' }
                    }
                ],
                sectionBottomFeed: [
                    {
                        index: 1,
                        label: 'section_bottom_feed_1',
                        targets: { kw: 'section_bottom_feed_1' }
                    }
                ]
            }
        }
    }
};

const Section = proxyquire('../../../app/components/brand/section', {
    react: React,
    './featured': FeaturedStub,
    '../repeatable': repeatableStub,
    '../section/list': listStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/behaviour/lib/components/sticky': StickyStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyMobileAdStub
});

let brandHeroStore = heroMock;
let brandArticlesStore = articlesMock;

Context.addStore('PageStore', {
    getContent() {
        let content = clone(entity);
        content.urlName = 'belle';
        content.title = 'Belle';
        return content;
    },
    getHeroItem() {
        return brandHeroStore;
    },
    getItems() {
        return brandArticlesStore;
    },
    getList: () => articlesMock,
    getListNextParams: () => {}
});

describe(`Brand Section`, () => {
    let reactModule;

    const sectionBrandsConfigStub = {
        belle: {
            subscribe: {
                image: '/assets/images/brand-pages/subscribe/belle.jpg',
                link: 'https://www.magshop.com.au/store/homestolove'
            },
            logo: '/assets/svgs/belle.svg',
            social: {
                facebook: 'https://www.facebook.com/BelleMagazineAu',
                twitter: 'https://twitter.com/BelleMagazineAu',
                instagram: 'https://instagram.com/bellemagazineau/?hl=en'
            }
        }
    };

    const defaultPropsStub = {
        brandConfig: sectionBrandsConfigStub
    };

    afterEach(Context.cleanup);

    describe(`and 12 articles`, () => {
        const sectionClassName = 'container';
        let section;
        let featured;
        let ads;

        before(() => {
            brandArticlesStore = articlesMock.slice(0, 12);
            reactModule = Context.mountComponent(Section, defaultPropsStub, [contextConfigStub]);
            section = TestUtils.findRenderedDOMComponentWithClass(reactModule, sectionClassName);
            featured = TestUtils.findRenderedComponentWithType(reactModule, FeaturedStub);
            ads = TestUtils.scryRenderedComponentsWithType(reactModule, AdStub);
        });

        it(`should render the Section component on the page`, () => {
            expect(ReactDOM.findDOMNode(section)).to.exist;
        });

        // Featured articles
        it(`should pass down the hero article to the featured component`, () => {
            expect(featured.props.hero).to.deep.equal(heroMock);
        });

        // Featured articles
        it(`should pass down the featured articles to the featured component`, () => {
            expect(featured.props.articles).to.deep.equal(articlesMock.slice(0, 6));
        });

        // Ads
        describe(`Ads`, () => {
            const numberOfAds = 1;
            it(`should have ${numberOfAds} AdStubs`, () => {
                expect(ads.length).to.eq(numberOfAds);
            });

            it(`should have the relevant props for the 1st ad`, () => {
                const size = {
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                };
                expect(ads[0].props.sizes).to.deep.equal(size);
            });
        });
    });
});

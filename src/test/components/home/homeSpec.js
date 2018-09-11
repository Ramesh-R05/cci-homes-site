import { betterMockComponentContext } from '@bxm/flux';
import heroMock from '../../mock/article';
import { entity, articles as homeArticlesMock } from '../../mock/articles';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const SectionFeatured = Context.createStubComponentWithChildren();
const AdStub = Context.createStubComponent();

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

const Home = proxyquire('../../../app/components/home/home', {
    react: React,
    './sectionFeatured': SectionFeatured,
    '@bxm/ad/lib/google/components/ad': AdStub
});

Context.addStore('PageStore', {
    getContent() {
        return entity;
    },

    getHeroItem() {
        return heroMock;
    },

    getItems() {
        return homeArticlesMock;
    },

    getModuleItems() {
        return [];
    },

    getList: () => homeArticlesMock,
    getListNextParams: () => {}
});

describe('Home', () => {
    let reactModule;
    let sectionFeatured;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Home, {}, [contextConfigStub]);
        sectionFeatured = TestUtils.findRenderedComponentWithType(reactModule, SectionFeatured);
    });

    it(`should pass down the hero teaser to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.hero).to.deep.equal(heroMock);
    });

    it(`should pass down the articles to the SectionFeatured component`, () => {
        expect(sectionFeatured.props.articles).to.deep.equal(homeArticlesMock);
    });
});

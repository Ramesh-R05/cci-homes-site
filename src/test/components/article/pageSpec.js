import {betterMockComponentContext} from '@bxm/flux';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const ArticleStub = Context.createStubComponent();
const FeedItemStub = Context.createStubComponent();
const FooterStub = Context.createStubComponent();
const SourceStub = Context.createStubComponent();
const AdStub = Context.createStubComponent();
const GalleryStub = Context.createStubComponent();

const ArticlePage = proxyquire('../../../app/components/article/page', {
    'react': React,
    './section': ArticleStub,
    '../polar/polarFeed': FeedItemStub,
    './footer': FooterStub,
    './source': SourceStub,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/article/lib/gallery': GalleryStub
});

describe('ArticlePage', () => {
    const testProps = {
        random: 'test',
        props: 'hello',
        content: {
            source: 'test',
            tagsDetails: [
                {
                    displayName : "Interiors",
                    fullName : "food_Homes_navigation_Interiors",
                    name : "food:Homes navigation:Interiors",
                    urlName : "interiors"
                }
            ]
        }

    };

    let reactModule;
    let articleComponent;

    before(() => {
        reactModule = Context.mountComponent(ArticlePage, testProps);
        articleComponent = TestUtils.findRenderedComponentWithType(reactModule, ArticleStub);
    });

    it('should pass the FeedItem Class to the Article', () => {
        expect(articleComponent.props.feedItemClass).to.eq(FeedItemStub);
    });

    it('should pass the Source Class to the Article', () => {
        expect(articleComponent.props.footerMetaClass).to.eq(SourceStub);
    });

    it('should not pass the Footer Class to the Article', () => {
        expect(articleComponent.props.footerComponentClass).to.eq(null);
    });

    it('should pass all other props through', () => {
        expect(testProps).to.deep.contain(reactModule.props);
    });
});

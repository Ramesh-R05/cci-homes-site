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

const ArticlePage = proxyquire('../../../app/components/article/page', {
    'react': React,
    './section': ArticleStub,
    './feedItem': FeedItemStub,
    './footer': FooterStub,
    './source': SourceStub,
    '@bxm/ad/lib/google/components/ad': AdStub
});



describe('ArticlePage', () => {
    const testProps = {random: 'test', props: 'hello'};
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

    it('should pass the Footer Class to the Article', () => {
        expect(articleComponent.props.footerComponentClass).to.eq(FooterStub);
    });

    it('should pass all other props through', () => {
        expect(testProps).to.deep.contain(reactModule.props);
    });
});

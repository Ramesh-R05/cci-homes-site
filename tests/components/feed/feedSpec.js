import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed.json';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const FeedItemStub = Context.createStubComponent();

const Feed = proxyquire('../../../app/components/feed/feed', {
    'react': React,
    'react/addons': React,
    './feedItem': FeedItemStub
});

const ArticleStoreStub = {
    getItems() {
        return feedDataMock;
    }
};

Context.addStore('ArticleStore', ArticleStoreStub);

describe('Feed Component', () => {
    let reactModule;
    let feedItems;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Feed);
        feedItems = TestUtils.scryRenderedComponentsWithType(reactModule, FeedItemStub);
    });

    it('should have the feed container', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'feed__container'))
            .to.have.length(1);
    });

    it('should have one FeedItem for each item in the feed data', () => {
        expect(feedItems).to.have.length(7);
    });

    it('should set the FeedItem gtmClass', () => {
        expect(feedItems[0].props.gtmClass).to.eq('feed-item-0');
    });

    it('should set the FeedItem items', () => {
        expect(feedItems[0].props.item).to.eq(feedDataMock[0]);
    });
});

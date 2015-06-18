import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed.json';
import {times} from 'lodash/utility';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const feedItemClassName = 'feed-item';
const FeedItemStub = React.createClass({
    render: () => {
        return <li className={feedItemClassName}>Foo</li>;
    }
});

const feedAdClassName = 'feed-ad';
const FeedAdStub = React.createClass({
    render: () => {
        return <li className={feedAdClassName}>Foo</li>;
    }
});

const Feed = proxyquire('../../../app/components/feed/feed', {
    'react': React,
    'react/addons': React,
    './feedItem': FeedItemStub,
    './feedAd': FeedAdStub
});

let storeFeedItems;
const ArticleStoreStub = {
    getItems() {
        return storeFeedItems;
    }
};

Context.addStore('ArticleStore', ArticleStoreStub);

describe('Feed Component', () => {
    let reactModule;

    afterEach(Context.cleanup);

    describe('feed items', () => {
        let feedItems;

        before(() => {
            storeFeedItems = feedDataMock;
            reactModule = Context.mountComponent(Feed);
            feedItems = TestUtils.scryRenderedComponentsWithType(reactModule, FeedItemStub);
        });

        it('should have the feed container', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'feed__container'))
                .to.have.length(1);
        });

        it('should have the feed items', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'feed__items'))
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

    describe('feed ads', () => {
        const firstAdIndex = 2;
        const adSpacing = 11;

        let feedListItems;

        before(() => {
            storeFeedItems = gerateLargeFeedItemList();
            reactModule = Context.mountComponent(Feed);
            feedListItems = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'li');
        });

        it('should have an ad as the 3rd item', () => {
            expect(feedListItems[firstAdIndex].props.className.split(/\s+/))
                .to.contain(feedAdClassName);
        });

        it(`should have an ad after every ${adSpacing} teasers`, () => {
            for (let i = firstAdIndex; i < feedListItems.length; i++) {
                const adExpected = (i - firstAdIndex) % (adSpacing + 1) === 0;
                if (adExpected) {
                    expect(isAd(feedListItems[i])).to.be.true;
                } else {
                    expect(isAd(feedListItems[i])).to.be.false;
                }
            }
        });
    });

    function gerateLargeFeedItemList() {
        return times(50, () => {
            return {};
        });
    }

    function isAd(item) {
        return item.props.className.split(/\s+/).indexOf(feedAdClassName) >= 0;
    }
});

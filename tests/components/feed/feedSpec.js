import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed';
import times from 'lodash/utility/times';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();

const feedItemClassName = 'feed-item';
const FeedItemStub = React.createClass({
    render: () => <li className={feedItemClassName}>Foo</li>
});

const feedAdClassName = 'feed-ad';
const FeedAdStub = React.createClass({
    render: () => <li className={feedAdClassName}>Foo</li>
});

const polarFeedItemClassName = 'polar-feed-item';
const PolarFeedItemStub = React.createClass({
    render: () => <li className={polarFeedItemClassName}>Foo</li>
});
const sandbox = sinon.sandbox.create();
const pinStub = sandbox.stub().returnsArg(0);
const Feed = proxyquire('../../../app/components/feed/feed', {
    'react': React,
    './feedItem': FeedItemStub,
    '../polar/polarFeedItem': PolarFeedItemStub,
    './feedAd': FeedAdStub,
    '@bxm/behaviour/lib/components/pin': pinStub
});

describe('Feed Component', () => {
    const firstAdIndex = 2;
    const polarAdIndex = 4;
    const adSpacing = 12;
    const tags = ['homes:Color:red', 'homes:Color:white', 'homes:Room:kitchen'];
    const pageId = 'kitchen-1032';
    const source = 'test';
    let reactModule;

    afterEach(Context.cleanup);

    describe('feed items', () => {
        let feedItems;
        let polarFeedItem;

        before(() => {
            reactModule = Context.mountComponent(Feed, { pageId, tags, items: feedDataMock });
            feedItems = TestUtils.scryRenderedComponentsWithType(reactModule, FeedItemStub);
            polarFeedItem = TestUtils.findRenderedComponentWithType(reactModule, PolarFeedItemStub);
        });

        it('should have the feed container', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'feed__container'))
                .to.have.length(1);
        });

        it('should have the feed items', () => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'feed__items'))
                .to.have.length(1);
        });

        it('should have one FeedItem for each item in the feed data minus 1 PolarFeedItem component', () => {
            expect(feedItems).to.have.length(feedDataMock.length-1);
        });

        it('should set the FeedItem gtmClass', () => {
            expect(feedItems[0].props).to.have.property('gtmClass', 'feed-item-0');
        });

        it('should set the FeedItem items', () => {
            expect(feedItems[0].props).to.have.property('item', feedDataMock[0]);
        });

        it('should set the PolarFeedItem gtmClass', () => {
            expect(polarFeedItem.props).to.have.property('gtmClass', 'polar-article-feed-item');
        });

        it('should set the PolarFeedItem items', () => {
            expect(polarFeedItem.props).to.have.property('item', feedDataMock[polarAdIndex]);
        });
    });

    describe('feed ads', () => {
        let feedListItems;
        let feedAds;

        before(() => {
            reactModule = Context.mountComponent(Feed, { pageId, tags, items: generateLargeFeedItemList(), source });
            feedListItems = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'li');
            feedAds = TestUtils.scryRenderedComponentsWithType(reactModule, FeedAdStub);
        });

        it('should have an ad as the 3rd item', () => {
            expect(feedListItems[firstAdIndex]).to.have.classNames(feedAdClassName);
        });

        it('should render Polar Feed Item at 6th position excluding feed ad', () => {
            expect(feedListItems[polarAdIndex+1]).to.have.classNames(polarFeedItemClassName);
        });

        it(`should have an ad after every ${adSpacing} teasers`, () => {
            for (let i = firstAdIndex; i < feedListItems.length; i++) {
                const adExpected = (i - firstAdIndex) % (adSpacing) === 0;
                if (adExpected) {
                    expect(feedListItems[i], `expected feed item ${i + 1} to be an ad but it was not`)
                        .to.have.classNames(feedAdClassName);
                } else {
                    expect(feedListItems[i], `expected feed item ${i + 1} not to be an ad but it was`)
                        .not.to.have.classNames(feedAdClassName);
                }
            }
        });

        it(`should include ad slot position information`, () => {
            // Position is 1-indexed, not 0-indexed
            feedAds.forEach((ad, i) => {
                expect(ad.props).to.have.property('position', i + 1);
            });
        });

        it(`should set the pageId to ${pageId}`, () => {
            feedAds.forEach((ad) => {
                expect(ad.props).to.have.property('pageId', pageId);
            });
        });

        it(`should include ad keyword information`, () => {
            const expectedKeyword = ['red', 'white', 'kitchen'];
            feedAds.forEach((ad) => {
                expect(ad.props.keyword).to.eql(expectedKeyword);
            });
        });

        it(`should include ad source information`, () => {
            feedAds.forEach((ad) => {
                expect(ad.props.source).to.eql(source);
            });
        });

        it(`should include ad tags information`, () => {
            feedAds.forEach((ad) => {
                expect(ad.props.tags).to.eql(tags);
            });
        });
    });

    function generateLargeFeedItemList() {
        return times(firstAdIndex + adSpacing * 2, () => { return {}; });
    }
});

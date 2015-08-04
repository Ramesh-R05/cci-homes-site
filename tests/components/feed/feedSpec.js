import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed';
import {times} from 'lodash/utility';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const feedItemClassName = 'feed-item';
const FeedItemStub = React.createClass({
    render: () => <li className={feedItemClassName}>Foo</li>
});

const feedAdClassName = 'feed-ad';
const FeedAdStub = React.createClass({
    render: () => <li className={feedAdClassName}>Foo</li>
});

const Feed = proxyquire('../../../app/components/feed/feed', {
    'react': React,
    'react/addons': React,
    './feedItem': FeedItemStub,
    './feedAd': FeedAdStub
});

describe('Feed Component', () => {
    const firstAdIndex = 2;
    const adSpacing = 12;
    const tags = ['homes:Color:red', 'homes:Color:white', 'homes:Room:kitchen'];
    const pageId = 'kitchen-1032';
    let reactModule;

    afterEach(Context.cleanup);

    describe('feed items', () => {
        let feedItems;

        before(() => {
            reactModule = Context.mountComponent(Feed, { pageId, tags, items: feedDataMock });
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
            expect(feedItems).to.have.length(feedDataMock.length);
        });

        it('should set the FeedItem gtmClass', () => {
            expect(feedItems[0].props).to.have.property('gtmClass', 'feed-item-0');
        });

        it('should set the FeedItem items', () => {
            expect(feedItems[0].props).to.have.property('item', feedDataMock[0]);
        });
    });

    describe('feed ads', () => {
        let feedListItems;
        let feedAds;

        before(() => {
            reactModule = Context.mountComponent(Feed, { pageId, tags, items: generateLargeFeedItemList() });
            feedListItems = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'li');
            feedAds = TestUtils.scryRenderedComponentsWithType(reactModule, FeedAdStub);
        });

        it('should have an ad as the 3rd item', () => {
            expect(feedListItems[firstAdIndex]).to.have.classNames(feedAdClassName);
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
    });

    function generateLargeFeedItemList() {
        return times(firstAdIndex + adSpacing * 2, () => { return {}; });
    }
});

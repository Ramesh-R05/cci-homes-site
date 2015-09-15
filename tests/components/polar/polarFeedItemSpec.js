import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed';
import cloneDeep from 'lodash/lang/cloneDeep';
import merge from 'lodash/object/merge';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const FeedItemStub = Context.createStubComponentWithChildren();
const PolarFeedItem = proxyquire('../../../app/components/polar/polarFeedItem', {
    'react': React,
    '@bxm/ad/lib/polar/decorators/polarAd': (component) => component,
    '@bxm/ad/lib/polar/decorators/polarConfig': (component) => component,
    '../feed/feedItem': FeedItemStub
});

describe('PolarFeedItem', () => {
    let feedItem;
    let feedItemData;

    describe(`without the ad prop`, () => {
        let reactModule;

        before(() => {
            feedItemData = feedDataMock[1];

            reactModule = TestUtils.renderIntoDocument(
                <PolarFeedItem
                    gtmClass="feed-item-0"
                    item={feedItemData}/>
            );
            feedItem = TestUtils.findRenderedComponentWithType(reactModule, FeedItemStub);
        });

        it('should render the feed item', () => {
            expect(feedItem).to.exist;
        });
    });

    describe(`when polar doesn't return a response`, () => {
        let reactModule;

        feedItemData = feedDataMock[1];
        const props = merge(cloneDeep(feedItemData), {
            gtmClass: 'feed-item-0',
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <PolarFeedItem
                    {...props}
                />
            );

            feedItem = TestUtils.findRenderedComponentWithType(reactModule, FeedItemStub);
        });

        it('should render the feed item', () => {
            expect(feedItem).to.exist;
        });
    });

    describe(`with an ad label and when polar doesn't return a response`, () => {
        let reactModule;

        feedItemData = feedDataMock[1];

        const props = merge(cloneDeep(feedItemData), {
            gtmClass: 'feed-item-0',
            ad: {label: 'test-label'},
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <PolarFeedItem
                    {...props}
                />
            );

            feedItem = TestUtils.findRenderedComponentWithType(reactModule, FeedItemStub);
        });

        it('should render the feed item', () => {
            expect(feedItem).to.exist;
        });
    });

    describe(`when polar returns a correct response`, () => {
        let reactModule;
        let polarFeedItem;
        let image;
        let sponsor;
        let textLink;

        feedItemData = feedDataMock[1];

        const props = merge(cloneDeep(feedItemData), {
            gtmClass: 'feed-item-0',
            ad: {label: 'test-label'},
            nativeAd: {
                response: {
                    model: {
                        href: 'http://href.com',
                        image: {
                            caption: 'caption text',
                            href: 'http://image.com'
                        },
                        link: 'http://link.com',
                        title: 'title',
                        sponsor: {
                            name: 'bauer'
                        }
                    }
                }
            }
        });

        const model = props.nativeAd.response.model;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <PolarFeedItem
                    {...props}
                />
            );

            polarFeedItem = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'polar-feed-item');

            image = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');

            sponsor = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'feed-item__body-source');

            textLink = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'feed-item__body-title');
        });

        it('should render the polar feed item', () => {
            expect(polarFeedItem).to.exist;
        });

        it(`should pass down the 'src' prop to the feed item image`, () => {
            expect(image.props.src).to.equal(model.image.href);
        });

        it(`should pass down the 'alt' prop to the feed item image`, () => {
            expect(image.props.alt).to.equal(model.image.caption);
        });

        it(`should pass down the 'sponsor' prop to the feed item ad`, () => {
            expect(React.findDOMNode(sponsor).textContent).to.equal(`Powered by ${model.sponsor.name}`);
        });

        it(`should pass down the 'textLink' prop to the feed item image`, () => {
            expect(React.findDOMNode(textLink).textContent).to.equal(model.title);
        });
    });
});

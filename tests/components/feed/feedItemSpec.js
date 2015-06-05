import {extend} from 'lodash';
import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed.json';
import staticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserImageStub = Context.createStubComponentWithChildren();
const TeaserBodyStub = Context.createStubComponent();
const TeaserIconStub = Context.createStubComponent();
const FeedItem = proxyquire('../../../app/components/feed/feedItem', {
    'react': React,
    'react/addons': React,
    '@bxm/article/lib/components/teaser/image': TeaserImageStub,
    '@bxm/article/lib/components/teaser/body': TeaserBodyStub,
    './teaserIcon': TeaserIconStub
});

describe('FeedItem Component', () => {
    let reactModule;
    let teaserImage;
    let teaserBodyTitle;
    let teaserBodyTopic;

    const feedItemData = feedDataMock[1];

    before(() => {
        const {url, imageUrl, title, topic, nodeType} = feedItemData;
        const item = {url, imageUrl, title, topic, nodeType};
        reactModule = TestUtils.renderIntoDocument(
            <FeedItem
                gtmClass="feed-item-0"
                item={item}/>
        );
        teaserImage = TestUtils.findRenderedComponentWithType(reactModule, TeaserImageStub);
        teaserBodyTitle = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'feed-item__body-title');
        teaserBodyTopic = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'feed-item__body-topic');
    });

    it('sets the topic class of the div', () => {
        expect(React.findDOMNode(reactModule).className.split(/\s+/))
            .to.contain(`topic-${feedItemData.topic}`);
    });

    it('sets the TeaserImage link prop', () => {
        expect(teaserImage.props.link).to.eq(feedItemData.url);
    });

    it('sets the TeaserImage imageUrl prop', () => {
        expect(teaserImage.props.imageUrl).to.eq(feedItemData.imageUrl);
    });

    it('sets the TeaserImage alt prop', () => {
        expect(teaserImage.props.alt).to.eq(feedItemData.title);
    });

    it('sets the TeaserImage gtmClass prop', () => {
        expect(teaserImage.props.gtmClass).to.eq('feed-item-0');
    });

    it('sets the TeaserImage breakpoints prop', () => {
        expect(teaserImage.props.breakpoints).to.eql(require('../../../app/breakpoints'));
    });

    it('sets the TeaserImage sizes prop', () => {
        expect(teaserImage.props.imageSizes).to.eql(FeedItem.teaserSizes);
    });

    it('sets the TeaserImage responsiveConfig prop', () => {
        expect(teaserImage.props.responsiveConfig).to.eql(FeedItem.teaserResponsiveConfig);
    });

    it('sets the body title text', () => {
        expect(React.findDOMNode(teaserBodyTitle).textContent).to.eq(feedItemData.title);
    });

    it('sets the body title href', () => {
        expect(React.findDOMNode(teaserBodyTitle).getAttribute('href')).to.eq(feedItemData.url);
    });

    it('sets the body topic text', () => {
        expect(React.findDOMNode(teaserBodyTopic).textContent).to.eq(feedItemData.topic);
    });

    describe('badge permutations', () => {
        const baseItemData = feedDataMock[0];

        function generateFeedItemWithItemFields(item) {
            return TestUtils.renderIntoDocument(
                <FeedItem
                    gtmClass="feed-item-0"
                    item={extend({}, baseItemData, item)}/>
            );
        }

        it('sets the TeaserIcon type prop to "gallery" for gallery items', () => {
            reactModule = generateFeedItemWithItemFields({ nodeType: 'Gallery' });
            expect(TestUtils.findRenderedComponentWithType(reactModule, TeaserIconStub).props.type)
                .to.eq('gallery');
        });

        it('sets the TeaserIcon type prop to "video" for video items', () => {
            reactModule = generateFeedItemWithItemFields({ video: {} });
            expect(TestUtils.findRenderedComponentWithType(reactModule, TeaserIconStub).props.type)
                .to.eq('video');
        });

        it('sets the TeaserIcon type prop to undefined for items without a badge', () => {
            reactModule = generateFeedItemWithItemFields({ nodeType: 'BauerArticle' });
            expect(TestUtils.findRenderedComponentWithType(reactModule, TeaserIconStub).props.type)
                .to.be.undefined;
        });
    });
});

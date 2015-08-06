import extend from 'lodash/object/extend';
import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed';
import staticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserImageStub = Context.createStubComponentWithChildren();
const TeaserIconStub = Context.createStubComponent();
const FeedItem = proxyquire('../../../app/components/feed/feedItem', {
    'react': React,
    'react/addons': React,
    '@bxm/article/lib/components/teaser/image': TeaserImageStub,
    '../teaser/icon': TeaserIconStub
});

describe('FeedItem Component', () => {
    let reactModule;
    let teaserImage;
    let teaserBodyTitle;
    let teaserBodySource;

    const feedItemData = feedDataMock[1];

    before(() => {
        reactModule = TestUtils.renderIntoDocument(
            <FeedItem
                gtmClass="feed-item-0"
                item={feedItemData}/>
        );
        teaserImage = TestUtils.findRenderedComponentWithType(reactModule, TeaserImageStub);
        teaserBodyTitle = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'feed-item__body-title');
        teaserBodySource = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'feed-item__body-source');
    });

    it('sets the classNames of the div', () => {
        const expectedSourceClassName = `source-${FeedItem.sourceClassNameMap[feedItemData.source]}`;
        expect(React.findDOMNode(reactModule)).to.have.classNames('feed-item', expectedSourceClassName);
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

    it('sets the TeaserImage quality to 85', () => {
        expect(teaserImage.props.quality).to.eq(85);
    });

    it('sets the body title text', () => {
        expect(React.findDOMNode(teaserBodyTitle).textContent).to.eq(feedItemData.title);
    });

    it('sets the body title href', () => {
        expect(React.findDOMNode(teaserBodyTitle).getAttribute('href')).to.eq(feedItemData.url);
    });

    it('sets the body source text to the topic', () => {
        expect(React.findDOMNode(teaserBodySource).textContent).to.eq('Decorating 101');
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
            expect(TestUtils.findRenderedComponentWithType(reactModule, TeaserIconStub).props.nodeType)
                .to.eq('Gallery');
        });

        it('sets the TeaserIcon type prop to "video" for video items', () => {
            reactModule = generateFeedItemWithItemFields({ video: {} });
            expect(TestUtils.findRenderedComponentWithType(reactModule, TeaserIconStub).props.video)
                .to.deep.eq({});
        });

        it('sets the TeaserIcon type prop to undefined for items without a badge', () => {
            reactModule = generateFeedItemWithItemFields({ nodeType: 'BauerArticle' });
            expect(TestUtils.findRenderedComponentWithType(reactModule, TeaserIconStub).props.type)
                .to.be.undefined;
        });
    });
});

import extend from 'lodash/object/extend';
import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed';
import staticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';
import imageResize from '@bxm/ui/lib/common/ImageResize';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserImageStub = Context.createStubComponentWithChildren();
const TeaserIconStub = Context.createStubComponent();
const TagLinkStub = Context.createStubComponent();
const FeedItem = proxyquire('../../../app/components/feed/feedItem', {
    'react': React,
    'react/addons': React,
    '@bxm/article/lib/components/teaser/image': TeaserImageStub,
    '../teaser/icon': TeaserIconStub,
    '@bxm/tags/lib/components/link': TagLinkStub,
    '../helpers/theme': (Component) => class extends React.Component {
        render() {
            return <Component {...this.props} themeClass="theme-stub" />;
        }
    }
});

describe('FeedItem Component', () => {
    let reactModule;
    let teaserImage;
    let teaserTagLink;
    let teaserBodyTitle;

    const feedItemData = feedDataMock[1];

    before(() => {
        reactModule = TestUtils.renderIntoDocument(
            <FeedItem
                gtmClass="feed-item-0"
                item={feedItemData}/>
        );
        teaserImage = TestUtils.findRenderedComponentWithType(reactModule, TeaserImageStub);
        teaserTagLink = TestUtils.findRenderedComponentWithType(reactModule, TagLinkStub);
        teaserBodyTitle = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'feed-item__body-title');
    });

    it('sets the classNames of the div', () => {
        const expectedSourceClassName = `theme-stub`;
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
        const expectedImgSizes = {
            s: { w: 132, h: 107 },
            m: { w: 132, h: 107 },
            l: { w: 132, h: 107 },
            xl: { w: 132, h: 107 }
        };
        expect(teaserImage.props.imageSizes).to.eql(expectedImgSizes);
    });

    it('sets the TeaserImage responsiveConfig prop', () => {
        const expectedResponsiveConfig = {
            scale: imageResize.scale.BOTH,
            anchor: imageResize.anchor.MC,
            mode: imageResize.mode.CROP
        };
        expect(teaserImage.props.responsiveConfig).to.eql(expectedResponsiveConfig);
    });

    it('sets the TeaserImage quality to 85', () => {
        expect(teaserImage.props.quality).to.eq(85);
    });

    const expectedTag = 'Decorating 101';
    it(`sets the TagLink name to ${expectedTag}`, () => {
        expect(teaserTagLink.props.name).to.eq(expectedTag);
    });

    it('sets the body title text', () => {
        expect(React.findDOMNode(teaserBodyTitle).textContent).to.eq(feedItemData.title);
    });

    it('sets the body title href', () => {
        expect(React.findDOMNode(teaserBodyTitle).getAttribute('href')).to.eq(feedItemData.url);
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

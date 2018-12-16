import React, { Component, PropTypes } from 'react';
import GalleryDetailMain from '@bxm/gallery/lib/components/page/main';
import GalleryDetailAside from '@bxm/gallery/lib/components/page/aside';
import { getKeywordsFromTags } from '@bxm/ad/lib/utils/tagsUtils';
import GalleryActions from '@bxm/gallery/lib/actions/gallery';
import { connectToStores } from '@bxm/flux';
import resizeViewport from '@bxm/behaviour/lib/components/resizeViewport';
import { getFirstTagNameForCategory } from '@bxm/tags/lib/utils';
import Ad from '@bxm/ad/lib/google/components/ad';
import AdStore from '@bxm/ad/lib/google/stores/ad';
import GalleryStore from '@bxm/gallery/lib/stores/gallery';
import GalleryPageStore from '@bxm/gallery/lib/stores/galleryPage';
import AdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';

class GallerySection extends Component {
    static displayName = 'GallerySection';

    static headerHeight = 65;

    static propTypes = {
        gallery: PropTypes.object.isRequired,
        galleryItems: PropTypes.array,
        isAdViewed: PropTypes.bool,
        isAdSlideItem: PropTypes.bool,
        isGalleryCompletedItemActive: PropTypes.bool,
        activeGalleryItem: PropTypes.object,
        activeGalleryItemIndex: PropTypes.number,
        nextGallery: PropTypes.object,
        viewport: PropTypes.object
    };

    static defaultProps = {
        galleryItems: [],
        isAdViewed: false,
        isAdSlideItem: false,
        isGalleryCompletedItemActive: false,
        activeGalleryItem: {},
        activeGalleryItemIndex: 0,
        nextGallery: {},
        viewport: {}
    };

    static contextTypes = {
        config: PropTypes.object,
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    constructor(...args) {
        super(...args);

        this.state = {
            galleryHeight: 'auto'
        };

        const { executeAction } = this.context;
        const { gallery, galleryItems } = this.props;

        executeAction(GalleryActions.initialize, {
            galleryTitle: gallery.title,
            items: galleryItems
        });
    }

    componentDidMount() {
        window.addEventListener('popstate', this.onPop, false);

        this.galleryBody.addEventListener(
            'touchstart',
            e => {
                const { isAdViewed, isAdSlideItem } = this.props;

                if (!isAdViewed && isAdSlideItem) {
                    e.stopPropagation();
                }
            },
            true
        );
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.onPop, false);
    }

    componentWillUpdate(nextProps) {
        const { galleryItems } = this.props;
        const { executeAction } = this.context;

        if (nextProps.galleryItems !== galleryItems) {
            executeAction(GalleryActions.initialize, {
                galleryId: nextProps.gallery.id,
                galleryTitle: nextProps.gallery.title,
                items: nextProps.galleryItems
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { galleryHeight } = this.state;
        const { galleryItems, isGalleryCompletedItemActive, activeGalleryItem } = this.props;

        return (
            nextState.galleryHeight !== galleryHeight ||
            nextProps.isGalleryCompletedItemActive !== isGalleryCompletedItemActive ||
            nextProps.galleryItems !== galleryItems ||
            nextProps.activeGalleryItem !== activeGalleryItem
        );
    }

    componentWillReceiveProps(nextProps) {
        const { config } = this.context;
        const { width: winWidth, height: winHeight } = nextProps.viewport;
        const { breakpoints } = config.global;
        const largeBreakpointRangeMin = parseInt(breakpoints.largeRangeMin, 10);

        this.setState({
            galleryHeight: winWidth >= largeBreakpointRangeMin ? `${winHeight - GallerySection.headerHeight}px` : 'auto'
        });
    }

    onPop = () => {
        const { gallery } = this.props;
        const thisGalleryUrl = gallery.url;
        const actualUrl = document.location.pathname;

        if (thisGalleryUrl !== actualUrl) {
            document.body.style.display = 'none';
            document.location.reload();
        }
    };

    onNextGalleryClick = () => {
        const { executeAction } = this.context;
        const { nextGallery } = this.props;
        const galleryItems = nextGallery.galleryItems || [];

        executeAction(GalleryActions.nextGallery, {
            galleryTitle: nextGallery.title,
            gallery: nextGallery,
            items: galleryItems,
            totalItems: galleryItems.length,
            activeIndex: 0,
            activeItem: galleryItems[0]
        });
    };

    render() {
        const { gallery, activeGalleryItemIndex } = this.props;
        const { config } = this.context;
        const { galleryHeight } = this.state;

        if (!gallery) {
            return null;
        }

        const shareDescription = gallery.summary || gallery.title || '';
        const keyword = getKeywordsFromTags(gallery.contentTags);
        const kingtag = getFirstTagNameForCategory(gallery.contentTags, 'Homes navigation');
        const targets = {
            keyword,
            position: 1
        };

        return (
            <div className="gallery">
                <section className="gallery__container" itemType="http://schema.org/Article">
                    <meta itemProp="image" content={`${gallery.imageUrl}?width=960&height=600&mode=crop&quality=75`} />
                    <meta itemProp="description" content={shareDescription} />
                    <meta itemProp="datePublished" content={gallery.dateCreated} />
                    <meta itemProp="publisher" content={config.site.name} />

                    <div>
                        <Ad
                            className="gallery__mobile-ad row"
                            label={{ active: false }}
                            reloadOnResourceChange={activeGalleryItemIndex}
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['leaderboard', 'billboard']
                            }}
                            targets={targets}
                        />
                    </div>

                    <AdsWrapper>
                        <section
                            className="gallery__body row"
                            style={{ height: galleryHeight }}
                            ref={c => {
                                this.galleryBody = c;
                            }}
                        >
                            <GalleryDetailMain
                                {...this.props}
                                keyword={keyword}
                                onNextGalleryClick={this.onNextGalleryClick}
                                kingtag={kingtag}
                                showFooterAd={false}
                                alwaysDisplayTitle
                            />

                            <GalleryDetailAside {...this.props} showAuthor showSourceLogo keyword={keyword} kingtag={kingtag} showSocialShare />
                        </section>
                    </AdsWrapper>
                </section>
            </div>
        );
    }
}

export default connectToStores(resizeViewport(GallerySection), [GalleryStore, GalleryPageStore, AdStore], context => {
    const { getStore } = context;
    const theAdStore = getStore(AdStore);
    const ads = theAdStore.getAds();
    const viewed = ads[`gpt-slot-${theAdStore.getCurrentSlideAd()}`] && ads[`gpt-slot-${theAdStore.getCurrentSlideAd()}`].viewed;
    const galleryPageStore = getStore(GalleryPageStore);
    const galleryStore = getStore(GalleryStore);

    return {
        gallery: galleryPageStore.getGallery(),
        galleryItems: galleryPageStore.getGalleryItems(),
        totalItems: galleryStore.getTotalItems(),
        activeGalleryItemIndex: galleryStore.getActiveIndex(),
        activeGalleryItem: galleryStore.getActiveItem(),
        nextGallery: galleryPageStore.getNextGallery(),
        isGalleryCompletedItemActive: galleryStore.isGalleryCompletedItemActive,
        numAds: galleryPageStore.getNumAds(),
        ads,
        isAdSlideItem: galleryStore.isAdSlideItem(),
        isAdViewed: galleryStore.isAdSlideItem() && viewed
    };
});

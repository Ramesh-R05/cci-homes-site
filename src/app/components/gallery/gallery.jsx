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
    static headerHeight = 65;

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

        this.context.executeAction(GalleryActions.initialize, {
            galleryTitle: this.props.gallery.title,
            items: this.props.galleryItems
        });
    }

    componentDidMount() {
        window.addEventListener('popstate', this.onPop, false);

        this.refs.galleryBody.addEventListener('touchstart', (e) => {
            const { ads, isAdViewed, isAdSlideItem } = this.props;

            if (!isAdViewed && isAdSlideItem) {
                e.stopPropagation();
            }
        }, true);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.onPop, false);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.galleryItems !== this.props.galleryItems) {
            this.context.executeAction(GalleryActions.initialize, {
                galleryId: nextProps.gallery.id,
                galleryTitle: nextProps.gallery.title,
                items: nextProps.galleryItems
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.galleryHeight !== this.state.galleryHeight ||
            nextProps.isGalleryCompletedItemActive !== this.props.isGalleryCompletedItemActive ||
            nextProps.galleryItems !== this.props.galleryItems ||
            nextProps.activeGalleryItem !== this.props.activeGalleryItem ||
            nextProps.menuClasses !== this.props.menuClasses;
    }

    componentWillReceiveProps(nextProps) {
        const { width: winWidth, height: winHeight } = nextProps.viewport;
        const breakpoints = this.context.config.global.breakpoints;
        const largeBreakpointRangeMin = parseInt(breakpoints.largeRangeMin, 10);

        this.setState({
            galleryHeight: winWidth >= largeBreakpointRangeMin ? `${winHeight - GallerySection.headerHeight}px` : 'auto'
        });
    }

    onPop = () => {
        const thisGalleryUrl = this.props.gallery.url;
        const actualUrl = document.location.pathname;

        if (thisGalleryUrl !== actualUrl) {
            document.body.style.display = 'none';
            document.location.reload();
        }
    };

    onNextGalleryClick = () => {
        const { nextGallery } = this.props;
        const galleryItems = nextGallery.galleryItems || [];

        this.context.executeAction(GalleryActions.nextGallery, {
            galleryTitle: nextGallery.title,
            gallery: nextGallery,
            items: galleryItems,
            totalItems: galleryItems.length,
            activeIndex: 0,
            activeItem: galleryItems[0]
        });
    };

    render() {
        const { gallery } = this.props;
        if (!gallery) return null;

        const shareDescription = (gallery.summary || gallery.title || '');
        const keyword = getKeywordsFromTags(gallery.contentTags);
        const kingtag = getFirstTagNameForCategory(gallery.contentTags, 'Homes navigation');
        const config = this.context.config;

        const targets = {
            keyword,
            position: 1
        };

        return (
            <div className="side-menu-slider gallery">
                <section className="gallery__container side-menu__push" itemType="http://schema.org/Article">
                    <meta itemProp="image" content={`${gallery.imageUrl}?width=960&height=600&mode=crop&quality=75`} />
                    <meta itemProp="description" content={shareDescription} />
                    <meta itemProp="datePublished" content={gallery.dateCreated} />
                    <meta itemProp="publisher" content={config.site.name} />

                    <div>
                        <Ad
                          className="gallery__mobile-ad row"
                          label={{ active: false }}
                          reloadOnResourceChange={this.props.activeGalleryItemIndex || 0}
                          sizes={{
                              small: 'banner',
                              leaderboard: 'leaderboard',
                              billboard: ['leaderboard', 'billboard']
                          }}
                          targets={targets}
                        />
                    </div>

                    <AdsWrapper>
                        <section className="gallery__body row" style={{ height: this.state.galleryHeight }} ref="galleryBody">
                            <GalleryDetailMain
                              {...this.props}
                              keyword={keyword}
                              onNextGalleryClick={this.onNextGalleryClick}
                              kingtag={kingtag}
                              showFooterAd={false}
                              alwaysDisplayTitle
                            />

                            <GalleryDetailAside
                              {...this.props}
                              showAuthor
                              showSourceLogo
                              keyword={keyword}
                              kingtag={kingtag}
                              showSocialShare
                            />
                        </section>
                    </AdsWrapper>
                </section>
            </div>
        );
    }
}

export default connectToStores(resizeViewport(GallerySection), [GalleryStore, GalleryPageStore, AdStore], (context) => {
    const theAdStore = context.getStore(AdStore);
    const ads = theAdStore.getAds();
    const viewed = ads[`gpt-slot-${theAdStore.getCurrentSlideAd()}`] && ads[`gpt-slot-${theAdStore.getCurrentSlideAd()}`].viewed;
    const galleryPageStore = context.getStore(GalleryPageStore);
    const galleryStore = context.getStore(GalleryStore);

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

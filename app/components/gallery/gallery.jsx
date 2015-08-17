'use strict';
var React = require('react');
var GalleryPageStore = require('../../stores/gallery');
var GalleryHeader = require('./header');
var GalleryMain = require('./main');
var GalleryAside = require('./aside');
var GalleryPageActionCreators = require('../../actions/gallery');
var getKeywordsFromTags = require('@bxm/ad/lib/utils/tagsUtils').getKeywordsFromTags;

var GalleryActionCreators = require('@bxm/gallery/lib/actions/gallery');
var GalleryStore = require('@bxm/gallery/lib/stores/gallery');

var FluxMixin = require('@bxm/flux').fluxMixin;
var WindowResizeMixin = require('@bxm/ui/lib/to-love/utils/mixin/WindowResizeMixin');

var breakpoints = require('../../breakpoints');

var GALLERY_LARGE_BREAKPOINT = parseInt(breakpoints.largeRangeMin, 10),
    HEADER_HEIGHT = 65;

var Gallery = React.createClass({

    mixins: [WindowResizeMixin, FluxMixin],

    statics: {
        storeListeners: [GalleryStore, GalleryPageStore]
    },

    getState: function() {
        return {
            gallery: this.galleryPageStore.getGallery(),
            galleryItems: this.galleryPageStore.getGalleryItems(),
            totalItems: this.galleryStore.getTotalItems(),
            activeGalleryItemIndex: this.galleryStore.getActiveIndex() || 0, // I have to set this here rather than in the @bxm/gallery since during the 1st render this value is null hence React throws a warning of missing prop being passed. Same thing for activeGalleryItem below
            activeGalleryItem: this.galleryStore.getActiveItem() || {},
            nextGallery: this.galleryPageStore.getNextGallery(),
            isGalleryCompletedItemActive: this.galleryStore.isGalleryCompletedItemActive,
            numAds: this.galleryPageStore.getNumAds()
        };
    },

    getInitialState: function() {
        this.galleryStore = this.getStore(GalleryStore);
        this.galleryPageStore = this.getStore(GalleryPageStore);

        return this.getState();
    },

    componentWillMount: function() {
        if (!this.state.gallery) {
            return;
        }

        this.executeAction(GalleryActionCreators.initialize, {
            galleryTitle: this.state.gallery.title,
            items: this.state.galleryItems
        });
    },

    componentDidMount: function() {
        window.addEventListener('popstate', this.onPop, false);
    },

    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('popstate', this.onPop, false);
    },

    componentWillUpdate: function(nextProps, nextState) {
        if (nextState.galleryItems !== this.state.galleryItems) {
            this.executeAction(GalleryActionCreators.initialize, {
                galleryTitle: nextState.gallery.title,
                items: nextState.galleryItems
            });
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.galleryHeight !== this.state.galleryHeight ||
                nextState.isGalleryCompletedItemActive !== this.state.isGalleryCompletedItemActive ||
                nextState.galleryItems !== this.state.galleryItems ||
                nextState.activeGalleryItem !== this.state.activeGalleryItem;
    },

    onResize: function(winWidth, winHeight) {

        if(!this.isMounted) {
            return;
        }

        this.setState({
            galleryHeight: winWidth >= GALLERY_LARGE_BREAKPOINT ? (winHeight - HEADER_HEIGHT) + 'px': 'auto'
        });
    },
    onPop: function(popStateEvent) {
        var thisGalleryUrl = this.state.gallery.url;
        var actualUrl = document.location.pathname;

        if (thisGalleryUrl !== actualUrl) {
            document.body.style.display = 'none';
            document.location.reload();
        }
    },

    render: function() {

        if(!this.state.gallery) return null;

        var gallery = this.state.gallery,
            nextGallery = this.state.nextGallery,
            galleryItems = this.state.galleryItems,
            shareDescription = (gallery.summary || gallery.title || ""),
            shareTitle = gallery.title || gallery.name,
            keyword = getKeywordsFromTags(gallery.tags);

        /* jshint ignore:start */
        return (
            <section
                className="gallery small-12 columns side-menu__push"
                itemScope
                itemType="http://schema.org/Article"
            >
                <meta itemProp="image" content={gallery.imageUrl + '?width=960&height=600&mode=crop&quality=75'} />
                <meta itemProp="description" content={shareDescription} />
                <meta itemProp="datePublished" content={gallery.dateCreated} />
                <meta itemProp="publisher" content="Homes To Love" />

                <GalleryHeader
                    {...this.state}
                />

                <section ref="galleryBody" className="gallery__body row" style={{height:this.state.galleryHeight}}>

                    <GalleryMain
                        {...this.state}
                        keyword={keyword}
                        onNextGalleryClick={this.onNextGalleryClick}
                    />

                    <GalleryAside
                        {...this.state}
                        keyword={keyword}
                    />
                </section>

            </section>
        );
        /* jshint ignore:end */
    },

    onChange: function () {
        this.setState(this.getState());
    },

    onNextGalleryClick: function() {
        var nextGallery = this.state.nextGallery,
            galleryItems = nextGallery.galleryItems;

        this.executeAction(GalleryPageActionCreators.nextGallery,{
            galleryTitle: nextGallery.title,
            gallery: nextGallery,
            items: galleryItems,
            totalItems: galleryItems.length,
            activeIndex: 0,
            activeItem: galleryItems[0]
        });
    }
});

module.exports = Gallery;

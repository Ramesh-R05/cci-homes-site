'use strict';
var React = require('react');
var _ = require('lodash');
var NextGalleryOverlay = require('./next');
var GalleryImage = require('./image');
var Ad = require('@bxm/ad/lib/google/components/ad');

var Gallery = require('@bxm/gallery/lib/components/gallery');
var hasTouch = require('has-touch');

var AD_MIN_HEIGHT = 390;

var GallerySlide = React.createClass({
    getInitialState: function() {
        return {
            galleryOptions: {
                prevButtonText: '',
                prevButtonClass: 'gallery__nav--prev icon-arrow-prev',
                nextButtonText: '',
                nextButtonClass: 'gallery__nav--next icon-arrow-next',
                transitionDuration: 300,
                galleryCompletedRenderer: this.galleryCompletedRenderer
            }
        };
    },

    galleryItemRenderer: function(item, index, items, activeIndex) {
        if (_.has(item, 'ad')) {
            if (index !== activeIndex) return null;

            var minHeight = this.props.minHeight;
            var swipeIndicator = null;

            if (hasTouch) {
                swipeIndicator = <div className="gallery__slide-swipe-indicator">SWIPE HERE TO SKIP AD</div>;

                if (parseInt(minHeight, 10) < AD_MIN_HEIGHT) {
                    minHeight = AD_MIN_HEIGHT + 'px';
                }
            }

            /* jshint ignore:start */
            return (
                <div style={{minHeight:minHeight}}>
                    {swipeIndicator}
                    <Ad
                        className='gallery__slide-ad'
                        sizes='mrec'
                        targets={{
                            keyword: this.props.keyword,
                            position: item.pos
                        }}
                    />
                </div>
            );
            /* jshint ignore:end */
        } else {
            // Only display active item and 2 items either side
            // so we don't load every image in the gallery
            if (index !== activeIndex && (index < (activeIndex-2) || index > (activeIndex+2))){
                return null;
            }

            /* jshint ignore:start */
            return (
                <div style={{minHeight:this.props.minHeight}}>
                    <GalleryImage
                        imageMaxHeight={this.props.imageMaxHeight}
                        gallery={this.props.gallery}
                        imageUrl={item.url}
                        imageCaption={item.caption}
                        />
                </div>
            );
            /* jshint ignore:end */
        }
    },

    galleryCompletedRenderer: function(showGalleryCompletedItem) {
        if (!showGalleryCompletedItem) return null;

        /* jshint ignore:start */
        return (
            <div>
                <NextGalleryOverlay
                    nextGallery={this.props.nextGallery}
                    onNextGalleryClick={this.handleNextGalleryClick}
                    />
            </div>
        );
        /* jshint ignore:end */
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.galleryItems !== this.props.galleryItems ||
            nextProps.galleryItemWidth !== this.props.galleryItemWidth ||
            nextProps.minHeight !== this.props.minHeight;
    },

    render: function() {
        return (
            /* jshint ignore:start */
            <Gallery
                itemRenderer={this.galleryItemRenderer}
                itemWidth={this.props.galleryItemWidth}
                options={this.state.galleryOptions}
                />
            /* jshint ignore:end */
        );
    },

    handleNextGalleryClick: function() {
        this.props.onNextGalleryClick();
    }
});

module.exports = GallerySlide;

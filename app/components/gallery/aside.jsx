'use strict';
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;

var moment = require('moment');
var breakpoints = require('../../breakpoints');
var ContentBody = require('@bxm/ui/lib/markdown/components/contentBody');
var WindowResizeMixin = require('@bxm/ui/lib/to-love/utils/mixin/WindowResizeMixin');
var Ad = require('@bxm/ad/lib/google/components/ad');
var campaignUtils = require('@bxm/ad/lib/google/utils/campaign');
var getFirstTagNameForCategory = require('../../utils/tagUtils').getFirstTagNameForCategory;

var HEADER_STATIC_HEIGHT = 65,
    LARGE_RANGE_MAX = parseInt(breakpoints.largeRangeMin, 10);

var GalleryAside = React.createClass({

    propTypes: {
        gallery: ReactPropTypes.object.isRequired,
        galleryItems: ReactPropTypes.array.isRequired,
        activeGalleryItem: ReactPropTypes.object.isRequired,
        activeGalleryItemIndex: ReactPropTypes.number.isRequired,
        nextGallery: ReactPropTypes.object.isRequired,
        keyword: ReactPropTypes.array
    },

    mixins: [WindowResizeMixin],

    getInitialState: function() {

        var windowSizes = canUseDOM ? window: { innerHeight:0, innerWidth: 0};

        return {
            windowHeight: windowSizes.innerHeight,
            windowWidth: windowSizes.innerWidth
        };
    },

    onResize: function(w, h) {

        this.setState({
            windowHeight: h,
            windowWidth: w
        });
    },

    renderNativeAd: function(campaign) {
        if(!campaignUtils.getActiveSponsor([campaign])) return null;

        /* jshint ignore:start */
        return (
            <Ad
                className="gallery__native-ad"
                targets={{campaign: campaign}}
                sizes="native"
                label={{active: false}}
                reloadOnResourceChange={ this.props.activeGalleryItem.url} />
        );
        /* jshint ignore:end */
    },

    render: function () {

        if (!this.props.activeGalleryItem) return null;

        var dateCreated,
            topicTag,
            content = null,
            gallery = this.props.gallery,
            galleryItems = this.props.galleryItems,
            activeGalleryItemIndex = this.props.activeGalleryItemIndex,
            campaign = (gallery.campaign || [null])[0],
            asideHeight = this.state.windowWidth >= LARGE_RANGE_MAX ? (this.state.windowHeight - HEADER_STATIC_HEIGHT) + 'px': 'auto';

        if (this.props.isGalleryCompletedItemActive) {
            gallery = this.props.nextGallery;
        }

        dateCreated = moment(gallery.dateCreated).format('ll');

        topicTag = getFirstTagNameForCategory(gallery.contentTags, 'Topic');

        if(activeGalleryItemIndex === 0 || this.state.windowWidth >= LARGE_RANGE_MAX) {
            /* jshint ignore:start */
            content = (
                <div className="gallery__summary">
                    <div className="gallery__summary-content">

                        {this.renderNativeAd(campaign)}

                        <span className="gallery__subSection">{topicTag}</span>
                        <p>
                            <span className="gallery__date">{dateCreated}</span>
                        </p>
                        <ContentBody body={gallery.body} className="gallery__summary-text" />
                    </div>
                </div>
            );
            /* jshint ignore:end */
        }

        return (
            /* jshint ignore:start */
            <aside className="gallery__aside small-12 columns" style={{'height': asideHeight}}>

                {content}
                <Ad
                    className="gallery__aside-ad"
                    label={{position: 'top'}}
                    reloadOnResourceChange={activeGalleryItemIndex}
                    sizes={{
                        small: 'banner',
                        large: ['mrec']
                    }}
                    targets={{
                        keyword: this.props.keyword,
                        position:1
                    }}
                />
            </aside>
            /* jshint ignore:end */
        );
    }

});

module.exports = GalleryAside;

'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var _ = require('lodash');

var GalleryCounter = React.createClass({

    propTypes: {
        galleryItems: ReactPropTypes.array.isRequired,
        activeGalleryItem: ReactPropTypes.object.isRequired,
        numAds: ReactPropTypes.number.isRequired,
        isGalleryCompletedItemActive: ReactPropTypes.bool
    },

    render: function() {
        var galleryItems = this.props.galleryItems;

        if (this.props.isGalleryCompletedItemActive) return null;

        var activeGalleryItem = this.props.activeGalleryItem,
            numAds = this.props.numAds,
            totalItems = galleryItems.length - numAds,
            activeGalleryItemNum = activeGalleryItem ? activeGalleryItem.index : null;

        if (_.has(activeGalleryItem, 'ad') || !(totalItems>0) || !(activeGalleryItemNum>0)) {
            return null;
        }

        /* jshint ignore:start */
        return (
            <span className="gallery__slide-count" style={this.props.style}>
                <span className="gallery__slide-current">{activeGalleryItemNum}</span> / <span className="gallery__slide-last">{totalItems}</span>
            </span>
        );
        /* jshint ignore:end */
    }

});

module.exports = GalleryCounter;

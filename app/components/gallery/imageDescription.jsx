'use strict';

var React = require('react/addons');
var PropTypes = React.PropTypes;
var has = require('lodash/object/has');
var GalleryCaption = require('./caption');
var GalleryCounter = require('./counter');

var GalleryDetailsImageDescription = React.createClass({

    propTypes: {
        galleryItems: PropTypes.array.isRequired,
        isGalleryCompletedItemActive: PropTypes.bool,
        activeGalleryItemIndex: PropTypes.number,
        isMore: PropTypes.bool,
        visible: PropTypes.bool
    },

    getInitialState: function () {
        return {
            top: 0
        };
    },

    handleCaptionToggle: function (expandedHeight) {
        this.setState({ top: expandedHeight })
    },

    renderCaption: function () {
        var caption = !has(this.props.activeGalleryItem, 'caption') || this.props.isGalleryCompletedItemActive
            ? ''
            : this.props.activeGalleryItem.caption;

        /* jshint ignore:start */
        return <GalleryCaption
            caption={caption}
            onCaptionToggle={this.handleCaptionToggle}
            linesToShow={2} />;
        /* jshint ignore:end */
    },

    render: function() {
        var counterStyle = {
            top: this.state.top,
            minHeight: -this.state.top,
            position: 'relative'
        };

        /* jshint ignore:start */
        return (
            <div className="gallery__image-details">
                <GalleryCounter {...this.props}
                    style={counterStyle}/>
                {this.renderCaption()}
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = GalleryDetailsImageDescription;

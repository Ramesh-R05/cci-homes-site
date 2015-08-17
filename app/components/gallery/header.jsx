'use strict';
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var GalleryCounter = require('./counter');
var GalleryHeader = React.createClass({

    propTypes: {
        activeGalleryItem: ReactPropTypes.object.isRequired,
        gallery: ReactPropTypes.object.isRequired,
        galleryItems: ReactPropTypes.array.isRequired,
        isGalleryCompletedItemActive: ReactPropTypes.bool
    },

    render: function() {
        var title,
            gallery = this.props.gallery,
            galleryItems = this.props.galleryItems,
            shareDescription = (gallery.summary || gallery.title || gallery.name || ""),
            shareTitle = gallery.title || gallery.name || "";

        title = this.props.isGalleryCompletedItemActive ? null: gallery.title;

        /* jshint ignore:start */
        return (
            <header className="gallery__header small-12 columns">
                <div className="gallery__header-container row">

                    <div className="gallery__logo">
                        <a href="/" className="icon-logo" />
                    </div>

                    <h1 className="gallery__title show-for-large-up">
                        {title}
                    </h1>

                    <GalleryCounter {...this.props} />

                </div>
            </header>
        );
        /* jshint ignore:end */
    }

});

module.exports = GalleryHeader;

'use strict';
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var GalleryCounter = require('./counter');
var SocialShareBlock = require('@bxm/ui/lib/social/components/SocialShareBlock');
var GalleryHeader = React.createClass({

    propTypes: {
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

                    <SocialShareBlock
                        className="social_share_container--gallery show-for-large-up"
                        url={gallery.siteUrl + gallery.url}
                        title={shareTitle}
                        emailSubject={'HomesToLove: ' + shareTitle}
                        tweetBody={"HomesToLove: " +  shareTitle + " {shortURL}"}
                        description={shareDescription}
                        imageUrl={gallery.imageUrl}
                        nodeId={gallery.id}
                    />
                </div>
            </header>
        );
        /* jshint ignore:end */
    }

});

module.exports = GalleryHeader;

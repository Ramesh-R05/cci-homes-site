'use strict';
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var GalleryCounter = require('./counter');
var SocialShareBlock = require('@bxm/ui/lib/social/components/SocialShareBlock');

var GalleryHeader = React.createClass({

    propTypes: {
        activeGalleryItem: ReactPropTypes.object.isRequired,
        gallery: ReactPropTypes.object.isRequired,
        galleryItems: ReactPropTypes.array.isRequired,
        isGalleryCompletedItemActive: ReactPropTypes.bool
    },

    contextTypes: {
        config: ReactPropTypes.object
    },

    render: function() {
        var title,
            gallery = this.props.gallery,
            galleryItems = this.props.galleryItems,
            shareDescription = (gallery.summary || gallery.title || gallery.name || ""),
            shareTitle = gallery.title || gallery.name || "";

        title = this.props.isGalleryCompletedItemActive ? null: gallery.title;
        var getSocial = null;
        if (this.context.config.isFeatureEnabled('socialShareBlock') === true) {
            getSocial = (
                <SocialShareBlock
                    url={`${this.context.config.site.host}${gallery.url}`}
                    title={shareTitle}
                    tweetBody={title + ' | HOMES TO LOVE {shortURL} #homestoloveau '}
                    description={shareDescription}
                    imageUrl={gallery.imageUrl}
                    className={"social-share-block"}
                    countText={false}
                    nodeId={gallery.id}
                    gigyaApiKey={this.context.config.gigya.apiKey}
                    />
            );
        }

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
                    {getSocial}
                </div>
            </header>
        );
        /* jshint ignore:end */
    }

});

module.exports = GalleryHeader;

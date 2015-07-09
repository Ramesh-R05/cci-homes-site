'use strict';
var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var classNames = require('classnames');
var GalleryImage = require('./image');

var GalleryNext = React.createClass({

    propTypes: {
        nextGallery: ReactPropTypes.object.isRequired
    },

    render: function() {
        var nextGallery = this.props.nextGallery,
            numberOfPictures = null;

        var classes = classNames({
            'gallery__next': true
        });

        if(nextGallery.galleryItems) {
            /* jshint ignore:start */
            numberOfPictures = (
                <span className="gallery__next-number-of-pic">
                    <i className="icon-camera" />
                    {nextGallery.galleryItems.length} Photos
                </span>
            );
            /* jshint ignore:end */
        }

        /* jshint ignore:start */
        return (
            <div className={classes}>

                <div className="gallery__next-bg">
                    <div className="gallery__next-container">
                        <h5><span>Next Gallery</span></h5>
                        <h2>{nextGallery.title}</h2>
                        {numberOfPictures}

                        <button className="button" onClick={this.handleNextGalleryClick}>
                            <i className="icon-arrow-next" />
                        </button>
                    </div>
                </div>

                <figure className="gallery__next-img">
                    <GalleryImage
                        isNext={true}
                        gallery={nextGallery}
                        imageUrl={nextGallery.imageUrl}
                        imageCaption={nextGallery.imageCaption}
                    />

                    <button className="button" onClick={this.handleNextGalleryClick}>
                        Start gallery
                        <i className="icon-arrow-next" />
                    </button>
                </figure>
            </div>
        );
        /* jshint ignore:end */
    },

    handleNextGalleryClick: function() {
        this.props.onNextGalleryClick();
    }

});

module.exports = GalleryNext;

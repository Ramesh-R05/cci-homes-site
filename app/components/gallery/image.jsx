'use strict';

var React = require('react');
var imageResize = require('@bxm/ui/lib/common/ImageResize');

var MAX_WIDTH = typeof screen !== "undefined"? Math.max(screen.height, screen.width): 1200;

var GalleryImage = React.createClass({

    render: function() {
        var gallery = this.props.gallery,
            url = this.props.imageUrl,
            altText = gallery.title + ':' + this.props.imageCaption;

        if (!url) {
            return null;
        }
        var imagesrc = imageResize.url({
            mode: imageResize.mode.MAX,
            url: url,
            quality: 80,
            width: MAX_WIDTH
        });

        var wrapperClass = "",
            wrapperStyle = {};

        if(this.props.isNext) {

            wrapperClass = "gallery__next-wrapper";
            wrapperStyle = {backgroundImage: "url('" + imagesrc + "')"};
        } else {
            wrapperStyle = {height: this.props.imageMaxHeight || "100%"};
        }

        /* jshint ignore:start */
        return (
            <div className={wrapperClass} style={wrapperStyle}>
                 <img src={imagesrc} alt={altText} style={{maxHeight: this.props.imageMaxHeight || "100%"}} className="gallery__slide-image" />
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = GalleryImage;

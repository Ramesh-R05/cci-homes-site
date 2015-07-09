'use strict';
var _ = require('lodash');
var React = require('react/addons');
var classNames = require('classnames');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var ReactPropTypes = React.PropTypes;
var GallerySlide = require('./slide');
var GalleryFooter = require('./footer');
var breakpoints = require('../../breakpoints');
var WindowResizeMixin = require('@bxm/ui/lib/to-love/utils/mixin/WindowResizeMixin');

var MEDIUM_RANGE_MAX = parseInt(breakpoints.mediumRangeMax, 10);

var GalleryMain = React.createClass({

    mixins: [WindowResizeMixin],

    propTypes: {
        gallery: ReactPropTypes.object.isRequired,
        galleryItems: ReactPropTypes.array.isRequired,
        nextGallery: ReactPropTypes.object.isRequired,
        onNextGalleryClick: ReactPropTypes.func.isRequired,
        isGalleryCompletedItemActive: ReactPropTypes.bool.isRequired,
        keyword: ReactPropTypes.array
    },

    getInitialState: function() {

        return {
            minHeight: "0px",
            galleryMaxHeight: "100%"
        };
    },

    onResize: onChange,

    componentDidUpdate: onComponentUpdate,

    componentDidMount: onChange,

    render: function() {

        var galleryTitle = null,
            gallery = this.props.gallery,
            nextGallery = this.props.nextGallery,
            galleryItems = this.props.galleryItems;

        if(this.props.activeGalleryItemIndex === 0 && !this.props.isGalleryCompletedItemActive) {

            /* jshint ignore:start */
            galleryTitle = <h1 className="gallery__title hide-for-large-up" itemProp="headline">{gallery.title}</h1>;
            /* jshint ignore:end */
        }

        var galleryItemStyle = classNames({
            "gallery__slide": true,
            "gallery__slide--ad": _.has(this.props.activeGalleryItem, 'ad')
        });

        return (
            /* jshint ignore:start */
            <section className="gallery__main small-12 columns" style={{height: this.props.height}}>
                {galleryTitle}

                <figure className={galleryItemStyle} ref="gallerySlideWrapper" style={{maxHeight: this.state.galleryMaxHeight}}>

                    <GallerySlide
                        ref="gallerySlide"
                        {...this.props}
                        minHeight={this.state.minHeight}
                        galleryItemWidth={this.state.galleryItemWidth}
                        imageMaxHeight={this.state.galleryMaxHeight}
                        onNextGalleryClick={this.handleNextGalleryClick}
                    />

                </figure>

                <GalleryFooter
                    ref="galleryFooter"
                    {...this.props}
                    onComponentUpdate={onComponentUpdate.bind(this)}
                />
            </section>
            /* jshint ignore:end */
        );
    },

    handleNextGalleryClick: function() {
        this.props.onNextGalleryClick();
    }
});

function onComponentUpdate(prevProps, prevState) {

    /* jshint validthis: true */
    // not the prettiest, but needed.
    // to be fixed when refactoring the gallery.
    // entire gallery thing needs fixing
    setTimeout(onPropsUpdate.bind(this, prevProps, prevState), 20);
}

function onChange() {

    /* jshint validthis: true */
    var top, maxHeight, rect, slideWrapRect, newState,
        slide = this.refs.gallerySlide.getDOMNode(),
        footer = this.refs.galleryFooter.getDOMNode(),
        slideWrap = this.refs.gallerySlideWrapper.getDOMNode();

    if (!canUseDOM || !slide || !footer) {
        return;
    }

    var galleryItemWidth = slideWrap.clientWidth;

    if (window.innerWidth > MEDIUM_RANGE_MAX) {

        if (this.props.galleryItems && this.props.isGalleryCompletedItemActive) {

            newState = "100%";
        } else {

            rect = footer.getBoundingClientRect();
            slideWrapRect = slideWrap.getBoundingClientRect();

            top = slideWrapRect.top + window.pageYOffset;

            maxHeight = window.innerHeight - top - rect.height;

            newState = top + slide.clientHeight + rect.height > window.innerHeight ? maxHeight + "px" : "100%";
        }

        this.setState({
            minHeight: '0px',
            galleryItemWidth: galleryItemWidth,
            galleryMaxHeight: newState
        });
    } else {

        slideWrapRect = slideWrap.getBoundingClientRect();

        var lineHeight = 24,//parseInt(getComputedStyle(footer).lineHeight, 10),
            scrollTop = window && (window.scrollY || window.pageYOffset) || 0,
            slideTop = parseInt(slideWrapRect.top, 10) + scrollTop;

        this.setState({
            minHeight: Math.max((document.body.clientHeight - slideTop - lineHeight * 2 - 22), 200) + 'px',
            galleryItemWidth: galleryItemWidth,
            galleryMaxHeight: "100%"
        });
    }
}

function onPropsUpdate(prevProps, prevState) {

    /* jshint validthis: true */
    if(prevProps && prevProps.activeGalleryItemIndex !== this.props.activeGalleryItemIndex) {

        onChange.call(this);
    }
}

module.exports = GalleryMain;

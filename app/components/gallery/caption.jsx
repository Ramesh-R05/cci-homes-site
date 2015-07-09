'use strict';

var React = require('react/addons');
var PropTypes = React.PropTypes;
var merge = require('lodash/object/merge');
var markdownParser = require('@bxm/ui/lib/markdown/markdown');
var DEFAULT_MARGIN_BOTTOM = 15;
var DEFAULT_TOP_DISTANCE = 0;
var WindowResizeMixin = require('@bxm/ui/lib/to-love/utils/mixin/WindowResizeMixin');

var GalleryCaption = React.createClass({
    mixins: [WindowResizeMixin],

    propTypes: {
        caption: PropTypes.string.isRequired,
        onCaptionToggle: PropTypes.function
    },

    getInitialState: function () {
        return { expanded: false };
    },

    componentDidUpdate: function (prevProps, prevState) {
        if(prevState.expanded !== this.state.expanded) {
            this.props.onCaptionToggle(this.getCurrentCaptionTopDistance());
        }

        if(prevProps.caption !== this.props.caption) {
            // Image has changed, hide caption and refresh dimensions
            this.setState(merge({ expanded: false }, this.getCaptionDimensions()));
        }
    },

    onResize: function() {
        this.setState(merge({ expanded: false }, this.getCaptionDimensions()));
    },

    toggleCaption: function() {
        this.setState(merge({ expanded: !this.state.expanded }, this.getCaptionDimensions()));
    },

    getCaptionDimensions: function() {
        if (!this.refs.captionContent) {
            return {
                expandedHeight: 0,
                linesOfText: 0,
                lineHeight: 0
            };
        }

        var expandedHeight = React.findDOMNode(this.refs.captionContent).offsetHeight;
        var linesOfText = React.findDOMNode(this.refs.captionContent).getClientRects().length;

        return {
            expandedHeight: expandedHeight,
            linesOfText: linesOfText,
            lineHeight: expandedHeight / linesOfText
        };
    },

    getCurrentCaptionHeight: function () {
        if (this.state.expanded) {
            return this.state.expandedHeight;
        } else {
            return this.state.lineHeight * this.props.linesToShow;
        }
    },

    getCurrentCaptionTopDistance: function () {
        if (this.state.expanded) {
            return this.state.lineHeight * this.props.linesToShow - this.state.expandedHeight;
        } else {
            return DEFAULT_TOP_DISTANCE;
        }
    },

    getCurrentCaptionMarginBottom: function () {
        return DEFAULT_MARGIN_BOTTOM + this.getCurrentCaptionTopDistance();
    },

    isCaptionLongEnoughToRequireExpansion: function () {
        return this.state.linesOfText > this.props.linesToShow
    },

    renderMoreButton: function() {
        if (this.state.expanded || !this.isCaptionLongEnoughToRequireExpansion()) return null;

        return <span
                className="gallery-caption__toggle--more gallery-caption__toggle"
                onClick={this.toggleCaption}>More</span>;
    },

    renderLessButton: function() {
        if (!this.isCaptionLongEnoughToRequireExpansion()) return null;

        // Set the opacity to 0 when collpased, so that we can still get the
        // correct expanded height of the text block if we need to.
        var lessButtonStyle = {
            opacity: this.state.expanded ? 1 : 0
        };

        /* jshint ignore:start */
        return (
            <span
                className="gallery-caption__toggle--less gallery-caption__toggle"
                style={lessButtonStyle}
                onClick={this.toggleCaption}>Less</span>
        );
        /* jshint ignore:end */
    },

    render: function() {
        if (!this.props.caption || this.props.caption === '') return null;

        var caption = markdownParser.parse(this.props.caption);

        var captionContentHolderStyle = {
            height: this.getCurrentCaptionHeight(),
        };

        var captionStyle = {
            overflow: 'hidden',
            position: 'relative',
            top: this.getCurrentCaptionTopDistance(),
            marginBottom: this.getCurrentCaptionMarginBottom()
        };

        /* jshint ignore:start */
        return (
            <div className="gallery-caption" ref="caption" style={captionStyle}>
                <div className="gallery-caption__content-holder" style={captionContentHolderStyle}>
                    <p
                        ref="captionContent"
                        dangerouslySetInnerHTML={{__html: caption}}
                        className="gallery-caption__content"
                     />
                     {this.renderLessButton()}
                </div>
                {this.renderMoreButton()}
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = GalleryCaption;

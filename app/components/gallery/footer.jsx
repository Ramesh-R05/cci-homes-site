'use strict';
var React = require('react');
var cx = require('classnames');

var GalleryImageDescription = require('./imageDescription');
var Ad = require('@bxm/ad/lib/google/components/ad');
var GalleryActionCreator = require('../../actions/gallery');

var GalleryFooter = React.createClass({

    getInitialState: function() {

        return {
            isMore: false
        };
    },

    componentWillReceiveProps: function(props) {

        if(this.props.activeGalleryItemIndex !== props.activeGalleryItemIndex) {

            this.setState({
                isMore: false
            });
        }
    },

    render: function() {
        var slides = this.props.slides;
        /* jshint ignore:start */
        return (
            <footer>
                <GalleryImageDescription
                    {...this.props}
                    activeGalleryItemIndex={this.props.activeGalleryItemIndex}
                    isMore={this.state.isMore}
                />

                <Ad
                    className="gallery__footer-ad"
                    displayFor={['medium', 'large', 'xlarge']}
                    label={{position: 'top'}}
                    reloadOnResourceChange={this.props.activeGalleryItemIndex}
                    sizes={{
                        medium: 'banner',
                        1090: 'leaderboard'
                    }}
                    targets={{
                        keyword: this.props.keyword,
                        position:1
                    }}
                />
            </footer>
        );
        /* jshint ignore:end */
    }
});

module.exports = GalleryFooter;

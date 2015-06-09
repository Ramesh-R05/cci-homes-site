import React, {Component, PropTypes} from 'react';
import HeroImage from '@bxm/article/lib/components/hero/image';
import HeroVideo from '@bxm/article/lib/components/hero/video';
import breakpoints from '../../breakpoints';
import _ from 'lodash';

class Hero extends Component {

    constructor(props, context) {
        super(props, context);
    }

    isVideo() {
        return _.isObject(this.props.item.video);
    }

    isImage() {
        return _.isString(this.props.item.imageUrl);
    }

    render() {
        if (this.isVideo()) {
            const {video} = this.props.item;
            return (
                <HeroVideo
                    brightcoveId={video.properties.videoConfiguration.brightcoveId}
                />
            );
        } else if (this.isImage()) {
            const {imageUrl, imageAltText, imageCaption} = this.props.item;
            return (
                <HeroImage
                    url={imageUrl}
                    alt={imageAltText}
                    caption={imageCaption}
                    breakpoints={breakpoints}
                />
            );
        }

        return null;
    }

}

Hero.propTypes = {
    item: PropTypes.object.isRequired
};

export default Hero;

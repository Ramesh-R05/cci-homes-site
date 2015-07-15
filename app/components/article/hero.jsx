import React, {Component, PropTypes} from 'react';
import HeroImage from '@bxm/article/lib/components/hero/image';
import HeroVideo from '@bxm/article/lib/components/hero/video';
import {isObject, isString} from 'lodash/lang';
import breakpoints from '../../breakpoints';

export default class Hero extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    isVideo() {
        return isObject(this.props.item.video);
    }

    isImage() {
        return isString(this.props.item.imageUrl);
    }

    renderHeroVideo() {
        const video = this.props.item.video;
        let brightcoveId = null;
        try {
            brightcoveId = video.properties.videoConfiguration.brightcoveId;
        } catch (e) {
            console.error('Could not read brightcoveId from video object', e);
            return null;
        }
        return <HeroVideo brightcoveId={brightcoveId}/>;
    }

    renderHeroImage() {
        const {item} = this.props;
        const {imageUrl, imageAltText, imageCaption} = item;
        return (
            <HeroImage
                url={imageUrl}
                alt={imageAltText}
                caption={imageCaption}
                breakpoints={breakpoints}
            />
        );
    }

    render() {
        if (!this.props.item) {
            return null;
        }
        if (this.isVideo()) {
            return this.renderHeroVideo();
        }
        if (this.isImage()) {
            return this.renderHeroImage();
        }

        return null;
    }

}

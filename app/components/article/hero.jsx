import React, {Component, PropTypes} from 'react';
import HeroImage from '@bxm/article/lib/components/hero/image';
import HeroVideo from '@bxm/article/lib/components/hero/video';
import isString from 'lodash/lang/isString';
import isObject from 'lodash/lang/isObject';
import get from 'lodash/object/get';
import breakpoints from '../../breakpoints';
import {load} from '@bxm/config';

const config = load();
const brightcoveAccountId = get(config, 'brightcove.accountId');
const brightcovePlayerId = get(config, 'brightcove.playerId');

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
        const brightcoveId = get(this.props, 'item.video.properties.videoConfiguration.brightcoveId');
        if (!brightcoveId) return null;

        return (
            <HeroVideo
                brightcoveId={brightcoveId}
                accountId={brightcoveAccountId}
                playerId={brightcovePlayerId}
            />
        );
    }

    renderHeroImage() {
        return (
            <HeroImage
                url={this.props.item.imageUrl}
                alt={this.props.item.imageAltText}
                caption={this.props.item.imageCaption}
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

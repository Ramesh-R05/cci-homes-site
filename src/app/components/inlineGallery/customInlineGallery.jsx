import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isUndefined from 'lodash/lang/isUndefined';
import InlineGallery from '@bxm/gallery/lib/components/inlineGallery';
import breakpoints from '../../breakpoints';
import InlineGallerySlide from './item';

export default class CustomInlineGallery extends Component {
    static displayName = 'CustomInlineGallery';

    static propTypes = {
        galleries: PropTypes.array
    };

    static defaultProps = {
        galleries: []
    };

    static imageSizes = {
        s: { w: 750, h: 625 },
        m: { w: 940, h: 790 },
        l: { w: 1482, h: 833 },
        xl: { w: 1270, h: 715 }
    };

    static contextTypes = {
        config: PropTypes.object
    };

    static renderSlide(item, i, image) {
        if (!item || !image) {
            return null;
        }

        return <InlineGallerySlide key={i} {...item} imageUrl={image} />;
    }

    render() {
        const { config } = this.context;
        const { galleries } = this.props;

        if (!config.isFeatureEnabled('galleryOfGalleries') || isUndefined(galleries) || !Array.isArray(galleries) || !galleries.length) {
            return null;
        }

        return (
            <InlineGallery
                breakpoints={breakpoints}
                galleries={galleries}
                imageSizes={CustomInlineGallery.imageSizes}
                renderSlide={CustomInlineGallery.renderSlide}
            />
        );
    }
}

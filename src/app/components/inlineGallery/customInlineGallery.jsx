import React, { Component, PropTypes } from 'react';
import breakpoints from '../../breakpoints';
import isUndefined from 'lodash/lang/isUndefined';
import InlineGallery from '@bxm/gallery/lib/components/inlineGallery';
import InlineGallerySlide from './item';

export default class CustomInlineGallery extends Component {

    static propTypes = {
        galleries: PropTypes.array.isRequired
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

    renderSlide(item, i, image) {
        if (!item || !image) return null;

        return <InlineGallerySlide key={i} {...item} imageUrl={image} />;
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { galleries } = this.props;

        if (!this.context.config.isFeatureEnabled('galleryOfGalleries')
            || isUndefined(galleries)
            || !Array.isArray(galleries)
            || !galleries.length) return null;

        return (
            <InlineGallery
              breakpoints={breakpoints}
              galleries={galleries}
              imageSizes={CustomInlineGallery.imageSizes}
              renderSlide={this.renderSlide}
            />
        );
    }
}

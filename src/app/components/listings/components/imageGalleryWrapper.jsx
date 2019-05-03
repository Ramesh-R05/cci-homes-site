import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageGallery from 'react-image-gallery';
import ResponsiveImage from '@bxm/ui/lib/common/ResponsiveImage';
import GalleryImageMapper from '../utilities/galleryImageMapper';

export class ImageGalleryWrapper extends Component {
    static propTypes = {
        size: PropTypes.oneOf(['portrait', 'landscape', 'compact', 'fullWidth']),
        slideChangeCallback: PropTypes.func,
        items: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    static defaultProps = {
        size: '',
        slideChangeCallback: () => {}
    };

    customRenderer = item => <ResponsiveImage {...item} />;

    render() {
        const { size, slideChangeCallback, items } = this.props;

        if (!items) {
            return null;
        }

        const rootClass = classNames('listing-image-gallery', {
            'listing-image-gallery--portrait': size === 'portrait',
            'listing-image-gallery--landscape': size === 'landscape',
            'listing-image-gallery--compact': size === 'compact',
            'listing-image-gallery--full-width': size === 'fullWidth'
        });

        return (
            <ImageGallery
                items={items}
                additionalClass={rootClass}
                onSlide={slideChangeCallback}
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                renderItem={this.customRenderer}
                showNav={items.length > 1}
            />
        );
    }
}

export default GalleryImageMapper(ImageGalleryWrapper);

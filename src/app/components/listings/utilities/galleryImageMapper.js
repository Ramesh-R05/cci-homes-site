import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import breakpoints from '../../../breakpoints';

export default function GalleryImageMapper(WrappedComponent) {
    return class WrappedGallery extends Component {
        static propTypes = {
            size: PropTypes.oneOf(['portrait', 'landscape', 'compact', 'fullWidth']),
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    url: PropTypes.string,
                    caption: PropTypes.string
                })
            ).isRequired
        };

        static defaultProps = {
            size: ''
        };

        static imageSizes = {
            portrait: {
                s: { w: 535, h: 787 },
                m: { w: 540, h: 805 },
                l: { w: 540, h: 805 },
                xl: { w: 540, h: 805 }
            },
            compact: {
                s: { w: 532, h: 360 },
                m: { w: 518, h: 375 },
                l: { w: 518, h: 375 },
                xl: { w: 518, h: 375 }
            },
            landscape: {
                s: { w: 640, h: 366 },
                m: { w: 640, h: 366 },
                l: { w: 1110, h: 635 },
                xl: { w: 1110, h: 635 }
            },
            fullWidth: {
                s: { w: 640, h: 398 },
                m: { w: 1305, h: 735 },
                l: { w: 1305, h: 735 },
                xl: { w: 1305, h: 735 }
            }
        };

        static imageConfig = {
            portrait: {
                scale: imageResize.scale.BOTH,
                anchor: imageResize.anchor.MC,
                mode: imageResize.mode.CROP
            },
            compact: {
                scale: imageResize.scale.BOTH,
                anchor: imageResize.anchor.MC,
                mode: imageResize.mode.CROP
            },
            landscape: {
                scale: imageResize.scale.BOTH,
                anchor: imageResize.anchor.MC,
                mode: imageResize.mode.CROP
            },
            fullWidth: {
                scale: imageResize.scale.BOTH,
                anchor: imageResize.anchor.MC,
                mode: imageResize.mode.CROP
            }
        };

        static imageQuality = 75;

        render() {
            const { items, size } = this.props;

            if (!items || !size) {
                return null;
            }

            if (!['portrait', 'landscape', 'compact', 'fullWidth'].includes(size)) {
                return null;
            }

            if (!WrappedComponent) {
                return null;
            }

            const imageSizes = WrappedGallery.imageSizes[size];
            const { scale, anchor, mode } = WrappedGallery.imageConfig[size];

            const mappedItems = items.map(image => ({
                alt: image.caption || '',
                url: image.url,
                ClassName: 'listing-image-gallery__image',
                sizes: imageSizes,
                scale,
                anchor,
                mode,
                breakpoints,
                quality: WrappedGallery.imageQuality
            }));

            return <WrappedComponent {...this.props} items={mappedItems} />;
        }
    };
}

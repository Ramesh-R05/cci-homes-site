import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from '@bxm/ui/lib/common/ResponsiveImage';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import breakpoints from '../../../breakpoints';

export default function GalleryModal({ title, images }) {
    if (!images) {
        return null;
    }

    return (
        <section className="listing-gallery-modal__inner container">
            <div className="listing-gallery-modal__main-row row">
                <div className="columns large-8 small-centered">
                    <h1 className="listing-gallery-modal__title">{title}</h1>

                    {images.map(image => (
                        <figure key={image.title} className="listing-gallery-modal__image-wrapper">
                            <ResponsiveImage
                                sizes={{
                                    xl: { w: 919, h: 1170 },
                                    l: { w: 919, h: 1170 },
                                    m: { w: 540, h: 805 },
                                    s: { w: 535, h: 787 }
                                }}
                                alt={image.caption}
                                url={image.url}
                                ClassName="listing-gallery-modal__image"
                                scale={imageResize.scale.BOTH}
                                anchor={imageResize.anchor.MC}
                                mode={imageResize.mode.CROP}
                                breakpoints={breakpoints}
                                imageQuality={75}
                            />
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

GalleryModal.propTypes = {
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            caption: PropTypes.string,
            credits: PropTypes.arrayOf(PropTypes.string),
            height: PropTypes.number,
            mediaType: PropTypes.string,
            open: PropTypes.bool,
            source: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
            url: PropTypes.string,
            valid: PropTypes.bool,
            width: PropTypes.number
        })
    ).isRequired
};

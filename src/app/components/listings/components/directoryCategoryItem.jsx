import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from '@bxm/ui/lib/common/ResponsiveImage';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import breakpoints from '../../../breakpoints';

export default function DirectoryCategoryItem({ category }) {
    if (!category) {
        return null;
    }

    const { url, title, imageUrl } = category;

    if (!url || !title || !imageUrl) {
        return null;
    }

    return (
        <article className="directory-category-item">
            <a className="directory-category-item__link" href={url}>
                <span className="directory-category-item__image-container">
                    <ResponsiveImage
                        sizes={{
                            s: { w: 690, h: 460 },
                            m: { w: 510, h: 340 },
                            l: { w: 682, h: 456 },
                            xl: { w: 632, h: 422 }
                        }}
                        alt={title}
                        url={imageUrl}
                        ClassName="directory-category-item__image"
                        scale={imageResize.scale.BOTH}
                        anchor={imageResize.anchor.MC}
                        mode={imageResize.mode.CROP}
                        breakpoints={breakpoints}
                        imageQuality={75}
                    />
                </span>
                <span className="directory-category-item__button">{title}</span>
            </a>
        </article>
    );
}

DirectoryCategoryItem.displayName = 'DirectoryCategoryItem';

DirectoryCategoryItem.propTypes = {
    category: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    }).isRequired
};

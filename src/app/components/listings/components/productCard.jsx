import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ResponsiveImage from '@bxm/ui/lib/common/ResponsiveImage';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import breakpoints from '../../../breakpoints';

export default function ProductCard({ url, name, image }) {
    const buyNowClassNames = classNames('product-card__button', 'gtm-listing-product-buy');

    return (
        <article className="product-card">
            <figure className="product-card__image-wrapper">
                <ResponsiveImage
                    sizes={{
                        s: { w: 690, h: 575 },
                        m: { w: 768, h: 476 },
                        l: { w: 636, h: 504 },
                        xl: { w: 636, h: 504 }
                    }}
                    alt={image.source}
                    url={image.url}
                    ClassName="product-card__image"
                    scale={imageResize.scale.BOTH}
                    anchor={imageResize.anchor.MC}
                    mode={imageResize.mode.CROP}
                    breakpoints={breakpoints}
                    imageQuality={75}
                />
            </figure>
            <div className="product-card__name">{name}</div>
            <a className={buyNowClassNames} href={url} target="_blank" rel="nofollow">
                Buy Now
            </a>
        </article>
    );
}

ProductCard.displayName = 'ProductCard';

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        tag: PropTypes.array,
        valid: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        credit: PropTypes.array
    }).isRequired
};

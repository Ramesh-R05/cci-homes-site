import React, { PropTypes } from 'react';
import imageResize from '@bxm/ui/lib/common/ImageResize';

const Magazine = props => {
    const { content } = props;
    const imageSrc = imageResize.url({
        url: content.imageUrl,
        width: 172,
        mode: imageResize.mode.CROP,
        anchor: imageResize.anchor.TC
    });

    return (
        <div className="magazine-subscribe">
            <div>
                <img className="magazine-subscribe__image" src={imageSrc} alt={`${content.title} magazine cover`} />
            </div>
            <div className="magazine-subscribe__button">
                <a href={`${content.url}-subscribe`} className="button button--link gtm-mag-brand" target="_blank">
                    Subscribe Now
                </a>
            </div>
        </div>
    );
};

Magazine.propTypes = {
    content: PropTypes.object.isRequired
};

export default Magazine;

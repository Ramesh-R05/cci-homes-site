import React from 'react';
import PropTypes from 'prop-types';

export default function BrandLogo({ url: logoUrl, link, title, caption }) {
    if (!logoUrl) {
        return null;
    }

    return (
        <div className="listing-brand-logo">
            <a className="listing-brand-logo__anchor" href={link} title={title}>
                <img className="listing-brand-logo__image" src={logoUrl} alt={caption} />
            </a>
        </div>
    );
}

BrandLogo.propTypes = {
    url: PropTypes.string.isRequired,
    link: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string
};

BrandLogo.defaultProps = {
    title: '',
    link: null,
    caption: ''
};

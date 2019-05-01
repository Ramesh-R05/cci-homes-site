import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

export default function GalleryModalHeader({ handleClose }) {
    return (
        <header className="listing-gallery-modal__header">
            <button type="button" onClick={handleClose} className="listing-gallery-modal__close-button">
                <SVG src="/assets/icons/arrow-left.svg">
                    <img src="/assets/icons/arrow-left.svg" alt="icon arrow left" />
                </SVG>
            </button>
            <a href="/" className="listing-gallery-modal__logo-link">
                <i className="listing-gallery-modal__logo icon-logo" />
            </a>
        </header>
    );
}

GalleryModalHeader.propTypes = {
    handleClose: PropTypes.func.isRequired
};

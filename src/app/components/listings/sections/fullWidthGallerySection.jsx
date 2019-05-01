import React from 'react';
import PropTypes from 'prop-types';
import ScrollDownButton from '../components/scrollDownButton';
import SectionWrapper from '../components/sectionWrapper';
import ImageGallery from '../components/imageGalleryWrapper';

export default function FullWidthGallerySection({ heroGallery }) {
    if (!heroGallery || !Array.isArray(heroGallery) || !heroGallery.length) {
        return null;
    }

    return (
        <SectionWrapper sectionClass="full-width-gallery-section">
            <div className="row full-width-gallery-section__gallery-row collapse large-uncollapse">
                <div className="columns small-12 large-10 large-offset-1 full-width-gallery-section__gallery-column">
                    <ImageGallery size="fullWidth" items={heroGallery} />
                </div>
            </div>
            <div className="row full-width-gallery-section__scroll-button-row">
                <div className="columns small-12 full-width-gallery-section__scroll-button-column">
                    <ScrollDownButton />
                </div>
            </div>
        </SectionWrapper>
    );
}

FullWidthGallerySection.displayName = 'FullWidthGallerySection';

FullWidthGallerySection.propTypes = {
    heroGallery: PropTypes.array.isRequired
};

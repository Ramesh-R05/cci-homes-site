import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import trackListingGalleryModalOpen from '../../../actions/trackListingGalleryModalOpen';

export default class GalleryModalTrigger extends Component {
    static propTypes = {
        currentGallery: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
    };

    static contextTypes = {
        executeAction: PropTypes.func
    };

    trackOpenAndTriggerModal = e => {
        const { executeAction } = this.context;
        const { onClick, currentGallery } = this.props;

        executeAction(trackListingGalleryModalOpen, { ...currentGallery });

        onClick(e);
    };

    render() {
        const { currentGallery } = this.props;

        return (
            <button type="button" className="gallery-link-section__gallery-button" onClick={this.trackOpenAndTriggerModal}>
                {currentGallery.name}
                <span className="gallery-link-section__link-arrow">
                    <SVG src="/assets/icons/arrow-right.svg">
                        <img src="/assets/icons/arrow-right.svg" alt="icon arrow right" />
                    </SVG>
                </span>
            </button>
        );
    }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalTrigger } from '@bxm/shared-ui';
import SectionWrapper from '../components/sectionWrapper';
import ImageGallery from '../components/imageGalleryWrapper';
import GalleryModal from '../components/galleryModal';
import GalleryModalTrigger from '../components/galleryModalTrigger';
import GalleryModalHeader from '../components/galleryModalHeader';

export default class GalleryLinkSection extends Component {
    static propTypes = {
        linkedGalleries: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
                id: PropTypes.string,
                name: PropTypes.string,
                caption: PropTypes.string,
                galleryItems: PropTypes.arrayOf(
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
                )
            })
        )
    };

    static defaultProps = {
        linkedGalleries: []
    };

    constructor(props) {
        super(props);

        this.state = {
            currentGallery: (props && props.linkedGalleries && props.linkedGalleries[0]) || {}
        };
    }

    onSlideChange = index => {
        const { linkedGalleries } = this.props;

        this.setState({
            currentGallery: linkedGalleries[index]
        });
    };

    render() {
        const { linkedGalleries } = this.props;
        const { currentGallery } = this.state;

        if (!linkedGalleries.length) {
            return null;
        }

        return (
            <SectionWrapper sectionClass="gallery-link-section">
                <div className="gallery-link-section__heading-row row">
                    <div className="columns small-12">
                        <h1 className="heading heading--large">Explore More</h1>
                    </div>
                </div>
                <div className="row collapse medium-uncollapse">
                    <div className="gallery-link-section__gallery-column columns small-12 medium-12 large-10 large-centered">
                        <ImageGallery size="landscape" items={linkedGalleries} slideChangeCallback={this.onSlideChange} />
                        <ModalTrigger
                            TriggerComponent={props => <GalleryModalTrigger onClick={props.onClick} currentGallery={currentGallery} />}
                            ModalContent={() => <GalleryModal title={currentGallery.name} images={currentGallery.galleryItems} />}
                            modalProps={{
                                renderCloseButton: onClose => <GalleryModalHeader handleClose={onClose} />,
                                additionalModalClassName: 'listing-gallery-modal',
                                cover: true
                            }}
                        />
                    </div>
                </div>
            </SectionWrapper>
        );
    }
}

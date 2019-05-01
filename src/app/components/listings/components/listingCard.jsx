import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import ResponsiveImage from '@bxm/ui/lib/common/ResponsiveImage';
import ContactCard from './contactCard';
import breakpoints from '../../../breakpoints';
import trackListingCardContactOpen from '../../../actions/trackListingCardContactOpen';

export default class ListingCard extends Component {
    static propTypes = {
        title: PropTypes.string,
        subtitle: PropTypes.string,
        listingUrl: PropTypes.string,
        previewImage: PropTypes.shape({
            url: PropTypes.string,
            caption: PropTypes.string
        }).isRequired,
        websiteAddress: PropTypes.string,
        emailAddress: PropTypes.string,
        streetAddress: PropTypes.string,
        phoneNumber: PropTypes.string,
        category: PropTypes.string,
        listingType: PropTypes.oneOf(['CardListing', 'StandardListing', 'EnhancedListing', 'PremiumListing']).isRequired
    };

    static defaultProps = {
        title: '',
        subtitle: '',
        listingUrl: '',
        websiteAddress: '',
        emailAddress: '',
        streetAddress: '',
        phoneNumber: '',
        category: ''
    };

    static contextTypes = {
        executeAction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showOverlay: false
        };
    }

    toggleOverlay = e => {
        e.preventDefault();

        this.setState(prevState => ({
            showOverlay: !prevState.showOverlay
        }));
    };

    trackOpenAndToggleOverlay = event => {
        const { executeAction } = this.context;

        executeAction(trackListingCardContactOpen, {
            ...this.props
        });

        this.toggleOverlay(event);
    };

    renderOverlay = () => {
        const { websiteAddress, emailAddress, streetAddress, phoneNumber } = this.props;

        return (
            <div className="listing-card__contact-overlay">
                <ContactCard
                    classModifier="in-listing-card"
                    streetAddress={streetAddress}
                    phoneNumber={phoneNumber}
                    webAddress={websiteAddress}
                    emailAddress={emailAddress}
                />
                <button className="listing-card__overlay-close" onClick={this.toggleOverlay} type="button">
                    close
                    <SVG src="/assets/svgs/x.svg" className="listing-card__close-icon">
                        <img src="/assets/svgs/x.svg" alt="icon close cross" />
                    </SVG>
                </button>
            </div>
        );
    };

    renderOptions = () => {
        const { listingType, category, listingUrl } = this.props;
        const moreInfoLinkClassNames = classNames('listing-card__button', 'listing-card__button--more-info', 'gtm-listing-card-more-info');

        return (
            <div className="listing-card__options">
                <button onClick={this.trackOpenAndToggleOverlay} className="listing-card__button" type="button">
                    contact
                </button>
                {listingType === 'PremiumListing' && (
                    <a className={moreInfoLinkClassNames} href={`/directory/${category}${listingUrl}`}>
                        more info
                    </a>
                )}
            </div>
        );
    };

    render() {
        const { showOverlay } = this.state;
        const { title, previewImage, listingType, subtitle } = this.props;

        if (!previewImage || !title) {
            return null;
        }

        return (
            <article className="listing-card">
                <div className="listing-card__image-wrapper">
                    {showOverlay && this.renderOverlay()}
                    {listingType === 'PremiumListing' && <div className="listing-card__featured-tag">Featured</div>}
                    <ResponsiveImage
                        sizes={{
                            s: { w: 690, h: 535 },
                            m: { w: 768, h: 596 },
                            l: { w: 490, h: 380 },
                            xl: { w: 490, h: 380 }
                        }}
                        alt={previewImage.caption}
                        url={previewImage.url}
                        ClassName="listing-card__preview-image"
                        scale={imageResize.scale.BOTH}
                        anchor={imageResize.anchor.MC}
                        mode={imageResize.mode.CROP}
                        breakpoints={breakpoints}
                        imageQuality={75}
                    />
                    {!showOverlay && this.renderOptions()}
                </div>
                <div className="listing-card__detail-wrapper">
                    <h1 className="listing-card__title">{title}</h1>
                    <p className="listing-card__subtitle">{subtitle}</p>
                </div>
            </article>
        );
    }
}
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FullWidthGallerySection from '../sections/fullWidthGallerySection';
import CompanyProfileSection from '../sections/companyProfileSection';
import ProductSection from '../sections/productSection';
import GalleryLinkSection from '../sections/galleryLinkSection';
import TestimonialSection from '../sections/testimonialSection';
import FeaturedArticleSection from '../sections/featuredArticleSection';
import ContactSection from '../sections/contactSection';

export default class ListingRenderer extends PureComponent {
    static propTypes = {
        content: PropTypes.shape({
            nodeType: PropTypes.string.isRequired,
            contentVideo: PropTypes.object,
            heroGallery: PropTypes.arrayOf(PropTypes.object),
            businessLogo: PropTypes.object,
            businessName: PropTypes.string,
            streetAddress: PropTypes.string,
            profileGallery: PropTypes.arrayOf(PropTypes.object),
            instagramUrl: PropTypes.string,
            pinterestUrl: PropTypes.string,
            twitterUrl: PropTypes.string,
            facebookUrl: PropTypes.string,
            subHeading: PropTypes.string,
            copy: PropTypes.string,
            products: PropTypes.arrayOf(PropTypes.object),
            linkedGalleries: PropTypes.arrayOf(PropTypes.object),
            testimonials: PropTypes.arrayOf(PropTypes.object),
            featuredIn: PropTypes.arrayOf(PropTypes.object),
            webAddress: PropTypes.string,
            phoneNumber: PropTypes.string,
            emailAddress: PropTypes.string
        }),
        contactForm: PropTypes.object
    };

    static defaultProps = {
        content: null,
        contactForm: null
    };

    getSectionConfig = () => {
        const { content, contactForm } = this.props;

        const {
            contentVideo,
            heroGallery,
            businessLogo,
            businessName,
            streetAddress,
            profileGallery,
            instagramUrl,
            pinterestUrl,
            facebookUrl,
            twitterUrl,
            subheading,
            copy,
            products,
            linkedGalleries,
            testimonials,
            featuredIn: featuredInArticles,
            webAddress,
            phoneNumber,
            emailAddress
        } = content;

        return [
            {
                Component: FullWidthGallerySection,
                props: { contentVideo, heroGallery },
                displayFor: ['PremiumListing', 'EnhancedListing'],
                displayName: 'FullWidthGallerySection'
            },
            {
                Component: CompanyProfileSection,
                props: {
                    businessLogo,
                    businessName,
                    streetAddress,
                    profileGallery,
                    instagramUrl,
                    pinterestUrl,
                    facebookUrl,
                    twitterUrl,
                    subheading,
                    copy
                },
                displayFor: ['PremiumListing', 'EnhancedListing', 'StandardListing'],
                displayName: 'CompanyProfileSection'
            },
            {
                Component: ProductSection,
                props: { businessName, products },
                displayFor: ['PremiumListing'],
                displayName: 'ProductSection'
            },
            {
                Component: GalleryLinkSection,
                props: { linkedGalleries },
                displayFor: ['PremiumListing'],
                displayName: 'GalleryLinkSection'
            },
            {
                Component: TestimonialSection,
                props: { testimonials },
                displayFor: ['PremiumListing', 'EnhancedListing'],
                displayName: 'TestimonialSection'
            },
            {
                Component: FeaturedArticleSection,
                props: { featuredInArticles },
                displayFor: ['PremiumListing'],
                displayName: 'FeaturedArticleSection'
            },
            {
                Component: ContactSection,
                props: {
                    businessName,
                    streetAddress,
                    webAddress,
                    phoneNumber,
                    emailAddress,
                    instagramUrl,
                    pinterestUrl,
                    facebookUrl,
                    twitterUrl,
                    contactForm
                },
                displayFor: ['PremiumListing', 'EnhancedListing', 'StandardListing'],
                displayName: 'ContactSection'
            }
        ];
    };

    getConfigFromNodeType = () => {
        const { content } = this.props;
        const { nodeType } = content;

        return this.getSectionConfig().filter(section => section.displayFor.includes(nodeType));
    };

    renderSections() {
        const { content } = this.props;

        if (!content.nodeType) {
            return null;
        }

        return this.getConfigFromNodeType().map(item => {
            const { Component, props, displayName } = item;

            return <Component key={displayName} {...props} />;
        });
    }

    render() {
        const { content } = this.props;

        if (!content) {
            return null;
        }

        const rootClass = classNames('listing', {
            [`listing--${content.nodeType.toLowerCase()}`]: content.nodeType
        });

        return <article className={rootClass}>{this.renderSections()}</article>;
    }
}

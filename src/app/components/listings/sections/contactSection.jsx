import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SectionWrapper from '../components/sectionWrapper';
import ContactFormWrapper from '../components/contactFormWrapper';
import ContactCard from '../components/contactCard';
import SocialIcons from '../components/socialIcons';

export default class ContactSection extends Component {
    static displayName = 'ContactSection';

    static propTypes = {
        businessName: PropTypes.string.isRequired,
        streetAddress: PropTypes.string.isRequired,
        webAddress: PropTypes.string.isRequired,
        emailAddress: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        instagramUrl: PropTypes.string.isRequired,
        pinterestUrl: PropTypes.string.isRequired,
        twitterUrl: PropTypes.string.isRequired,
        facebookUrl: PropTypes.string.isRequired,
        contactForm: PropTypes.object
    };

    static defaultProps = {
        contactForm: null
    };

    render() {
        const {
            facebookUrl,
            twitterUrl,
            instagramUrl,
            pinterestUrl,
            businessName,
            emailAddress,
            contactForm,
            streetAddress,
            webAddress,
            phoneNumber
        } = this.props;

        const socialLinks = [
            {
                name: 'facebook',
                url: facebookUrl
            },
            {
                name: 'twitter',
                url: twitterUrl
            },
            {
                name: 'instagram',
                url: instagramUrl
            },
            {
                name: 'pinterest',
                url: pinterestUrl
            }
        ].filter(link => link.url);

        return (
            <SectionWrapper sectionClass="contact-section" sectionId="contact-section">
                <div className="row contact-section__main-row">
                    <div className="columns small-12 large-8 xlarge-7 xlarge-offset-1 contact-section__contact-form-column">
                        <div className="row contact-section__heading-row">
                            <div className="columns small-12 large-8 large-offset-1 contact-section__contact-form-heading-column">
                                <div className="contact-section__heading-wrapper">
                                    <h3 className="contact-section__heading">Get In Touch</h3>
                                    <span className="contact-section__sub-heading">Want to know more? Contact {businessName} directly.</span>
                                </div>
                            </div>
                            <div className="columns small-12 large-3 contact-section__contact-form-social-links-column">
                                <SocialIcons links={socialLinks} />
                            </div>
                        </div>
                        <div className="row contact-section__form-row">
                            <div className="columns small-12 large-10 large-offset-1">
                                <ContactFormWrapper emailAddress={emailAddress} contactForm={contactForm} listingName={businessName} />
                            </div>
                        </div>
                    </div>
                    <div className="columns small-12 large-4 xlarge-3 end contact-section__contact-card-column">
                        <ContactCard streetAddress={streetAddress} webAddress={webAddress} phoneNumber={phoneNumber} />
                        <SocialIcons links={socialLinks} />
                    </div>
                </div>
            </SectionWrapper>
        );
    }
}

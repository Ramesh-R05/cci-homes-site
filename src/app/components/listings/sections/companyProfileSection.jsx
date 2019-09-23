import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../components/imageGalleryWrapper';
import Summary from '../components/summary';
import SocialIcons from '../components/socialIcons';
import BrandLogo from '../components/BrandLogo';
import SectionWrapper from '../components/sectionWrapper';

export default function CompanyProfileSection({
    businessLogo,
    businessName,
    streetAddress,
    profileGallery,
    instagramUrl,
    pinterestUrl,
    twitterUrl,
    facebookUrl,
    subheading,
    copy
}) {
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
        <SectionWrapper sectionClass="company-profile-section" sectionId="company-profile-section">
            <div className="row company-profile-section__main-row">
                <div className="columns small-12 medium-6 large-5 large-offset-1 company-profile-section__gallery-column">
                    <ImageGallery size="portrait" items={profileGallery} />
                </div>
                <div className="columns small-12 medium-6 large-5 company-profile-section__summary-column">
                    <BrandLogo {...businessLogo} />
                    <Summary businessName={businessName} copy={copy} streetAddress={streetAddress} subheading={subheading} />
                </div>
                <div className="columns small-12 large-1 show-for-large-up company-profile-section__social-column">
                    <SocialIcons links={socialLinks} isVertical />
                </div>
            </div>
        </SectionWrapper>
    );
}

CompanyProfileSection.displayName = 'CompanyProfileSection';

CompanyProfileSection.propTypes = {
    businessLogo: PropTypes.object.isRequired,
    businessName: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    profileGallery: PropTypes.arrayOf(PropTypes.object).isRequired,
    instagramUrl: PropTypes.string.isRequired,
    pinterestUrl: PropTypes.string.isRequired,
    twitterUrl: PropTypes.string.isRequired,
    facebookUrl: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired
};

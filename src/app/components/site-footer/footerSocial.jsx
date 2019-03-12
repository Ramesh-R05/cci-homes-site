import React from 'react';
import PropTypes from 'prop-types';
import SocialIcon from '@bxm/social/lib/components/socialIcons/socialIcon';

export default function FooterSocial(props) {
    const { socialUrls } = props;

    if (!socialUrls) {
        return null;
    }

    const { facebook, twitter, instagram, pinterest } = socialUrls;
    const socialLinks = [
        {
            name: 'facebook',
            url: facebook
        },
        {
            name: 'twitter',
            url: twitter
        },
        {
            name: 'instagram',
            url: instagram
        },
        {
            name: 'pinterest',
            url: pinterest
        }
    ];

    return (
        <div className="footer-social">
            <h2 className="footer-social__title">Follow us</h2>
            <div className="footer-social__icons">
                {socialLinks.map((link, i) => {
                    const key = `social-links-${i}`;

                    return <SocialIcon key={key} {...link} gtmClass="gtm-follow-social-in-footer" />;
                })}
            </div>
        </div>
    );
}

FooterSocial.displayName = 'FooterSocial';

FooterSocial.propTypes = {
    socialUrls: PropTypes.object.isRequired
};

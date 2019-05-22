import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SocialContainer from '@bxm/social/lib/components/socialIcons/socialContainer';
import Magazine from './magazine';
import Newsletter from './newsletter';
import getBrand from './brand/utilities/getBrand';

export default class SocialAndSubscribeLinks extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { content } = this.props;
        const { config } = this.context;

        let brand = false;

        if (content.nodeType === 'BrandSection') {
            brand = getBrand(config, content.source);
            brand.gtmClass = 'gtm-follow-brand';
        }

        return (
            <div className="social-subscribe-links">
                {content.nodeType === 'BrandSection' && <Magazine {...this.props} />}
                <Newsletter content={content} />

                {brand ? (
                    <SocialContainer socialUrls={brand.social} title="Follow us" classModifier="in-subscribe-sidebar" gtmClass={brand.gtmClass} />
                ) : (
                    <SocialContainer
                        socialUrls={config.site.defaultSocialLinks}
                        title="Follow us"
                        classModifier="in-subscribe-sidebar"
                        gtmClass="gtm-follow-social-in-subscribe-sidebar"
                    />
                )}
            </div>
        );
    }
}

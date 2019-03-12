import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SocialIcon from '@bxm/social/lib/components/socialIcons/socialIcon';
export default class ExternalLinks extends Component {
    static displayName = 'ExternalLinks';

    static propTypes = {
        directoryLogoUrl: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        externalLinks: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };

    static defaultProps = {
        directoryLogoUrl: [],
        externalLinks: []
    };

    getSiteLogo() {
        const { directoryLogoUrl, externalLinks } = this.props;

        if (!directoryLogoUrl || !externalLinks) {
            return null;
        }

        const logoUrl = directoryLogoUrl.url;
        const siteUrl = externalLinks.website;
        const logoTitle = directoryLogoUrl.title;

        return (
            logoUrl &&
            siteUrl && (
                <a className="external-links__site-logo" href={siteUrl} target="_blank">
                    <img src={logoUrl} alt={logoTitle} className="external-links__site-logo__img" />
                    <button className="button button--link external-links__button">VISIT WEBSITE</button>
                </a>
            )
        );
    }

    getConnectLinks() {
        const { externalLinks } = this.props;

        if (!externalLinks) {
            return null;
        }

        const connectLinks = Object.keys(externalLinks)
            .filter(link => link !== 'website')
            .map(link => ({ name: link, url: externalLinks[link] }));

        return (
            !!connectLinks.length && (
                <div className="external-links__connect">
                    <div className="external-links__connect__inner">
                        {connectLinks.map((link, i) => {
                            const key = `social-links-${i}`;

                            return <SocialIcon key={key} {...link} {...this.props} />;
                        })}
                    </div>
                </div>
            )
        );
    }

    render() {
        return (
            <div className="external-links clearfix">
                {this.getSiteLogo()}
                {this.getConnectLinks()}
            </div>
        );
    }
}

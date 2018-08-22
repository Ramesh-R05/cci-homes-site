import React, { Component, PropTypes } from 'react';
import SocialIcons from './social/socialIcons';
export default class ExternalLinks extends Component {
    static displayName = 'ExternalLinks';

    static propTypes = {
        directoryLogoUrl: PropTypes.object.isRequired,
        externalLinks: PropTypes.object.isRequired
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
                            return <SocialIcons key={key} {...link} {...this.props} />;
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

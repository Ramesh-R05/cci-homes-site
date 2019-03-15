import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import FooterColumn from './footerColumn';
import FooterLink from './footerLink';
import FooterSocial from './footerSocial';
import Newsletter from '../newsletter';

export default class SiteFooter extends Component {
    static displayName = 'FooterSection';

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { config } = this.context;

        if (!config || !config.footer || !config.footer.links) {
            return null;
        }

        const socialUrls = config.site.defaultSocialLinks;
        const rootClass = classNames('site-footer');

        return (
            <footer className={rootClass}>
                <div className="site-footer__link-row row">
                    <div className="site-footer__social columns small-12 medium-12 large-4">
                        <Newsletter content={{ nodeType: 'Homepage' }} classModifier="in-footer" />
                        <FooterSocial socialUrls={socialUrls} />
                    </div>
                    <div className="site-footer__link-column columns small-12 medium-11 medium-offset-1 large-7 large-offset-1">
                        <FooterColumn titleText="homes to love" spanSmall={12} spanMedium={4} spanLarge={4} renderChildrenInList>
                            {config.brands.site &&
                                config.brands.site.map(({ title, url, id }) => (
                                    <FooterLink key={id} title={title} url={url} gtmClass="gtm-footer-brand" />
                                ))}
                        </FooterColumn>
                        <FooterColumn titleText="our network" spanSmall={12} spanMedium={4} spanLarge={4} renderChildrenInList>
                            {config.brands.network &&
                                config.brands.network.map(({ title, url, id }) => (
                                    <FooterLink key={id} title={title} url={url} gtmClass="gtm-footer-network" target="_blank" />
                                ))}
                        </FooterColumn>
                        <FooterColumn titleText="bauer media" spanSmall={12} spanMedium={4} spanLarge={4} renderChildrenInList>
                            {config.footer.links.corporate &&
                                config.footer.links.corporate.map(({ title, url, gtmClass }) => (
                                    <FooterLink key={title} title={title} url={url} gtmClass={gtmClass} target="_blank" />
                                ))}
                        </FooterColumn>
                    </div>
                </div>
                <div className="site-footer__copyright-row row">
                    <span className="site-footer__copyright-text">&copy; 2019 Bauer Media PTY LTD</span>
                </div>
            </footer>
        );
    }
}

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import FooterColumn from '../../site-footer/footerColumn';
import FooterLink from '../../site-footer/footerLink';

export default class ListingFooter extends PureComponent {
    static displayName = 'ListingFooter';

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    static propTypes = {
        categories: PropTypes.array
    };

    static defaultProps = {
        categories: []
    };

    render() {
        const { config } = this.context;
        const { categories } = this.props;

        if (!config || !config.footer || !config.footer.links) {
            return null;
        }

        const rootClass = classNames('site-footer');

        return (
            <footer className={rootClass}>
                <div className="site-footer__link-row row">
                    <div className="site-footer__social columns small-12 medium-12 large-4">
                        <a href="/" className="site-footer__logo-link">
                            <i className="site-footer__logo icon-logo" />
                        </a>
                    </div>
                    <div className="site-footer__link-column columns small-12 medium-11 medium-offset-1 large-7 large-offset-1">
                        <FooterColumn titleText="directory categories" spanSmall={12} spanMedium={4} spanLarge={4} renderChildrenInList>
                            {categories &&
                                categories.map(({ title, url, urlName }) => (
                                    <FooterLink key={urlName} title={title} url={url} gtmClass="gtm-footer-brand" />
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

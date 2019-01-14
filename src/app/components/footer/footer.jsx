import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BackToTop from '@bxm/ui/lib/back-to-top/backToTop';
import SocialContainer from '../social/socialContainer';
import FooterBrandLinks from './footerBrandLinks';
import FooterNavigation from './footerNavigation';

export default class FooterSection extends Component {
    static displayName = 'FooterSection';

    static propTypes = {
        modifier: PropTypes.string
    };

    static defaultProps = {
        modifier: ''
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { modifier } = this.props;
        const footerBrands = this.context.config.brands.footer;
        let classNames = 'footer';

        if (modifier) {
            classNames += ` footer--${modifier}`;
        }

        return (
            <div className="footer__wrapper">
                <footer className={classNames}>
                    <div className="home-page__get-social-container">
                        <span className="home-page__social-logo" />
                        <SocialContainer gtmClass="gtm-footer-social" />
                    </div>
                    <div className="footer__logos">
                        <span className="footer__logos-title">CONTENT SUPPORTED BY</span>
                        <br />
                        <nav className="footer__logos-nav">
                            <FooterBrandLinks className="footer__logos-list" footerBrands={footerBrands} />
                        </nav>
                    </div>
                    <FooterNavigation />
                    <div className="footer__copyright">
                        <span>&copy; copyright bauer media pty ltd all rights reserved</span>
                    </div>
                </footer>
                <BackToTop className="button" />
            </div>
        );
    }
}

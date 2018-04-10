import React, { Component, PropTypes } from 'react';
import SocialContainer from '../social/socialContainer';
import FooterBrandLinks from './footerBrandLinks';
import FooterNavigation from './footerNavigation';
import BackToTop from '@bxm/ui/lib/back-to-top/backToTop';

export default class FooterSection extends Component {

    static propTypes = {
        modifier: PropTypes.string
    };

    static contextTypes = {
        config: PropTypes.object
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        const { modifier } = this.props;
        const footerBrands = this.context.config.brands.footer;
        let classNames = 'footer';
        if (modifier) classNames += ` footer--${modifier}`;

        return (
            <div className="footer__wrapper">
                <footer className={classNames}>
                    <div className="home-page__get-social-container">
                        <span className="home-page__social-logo" />
                        <SocialContainer gtmClass="gtm-footer-social" />
                    </div>
                    <div className="footer__logos">
                        <span className="footer__logos-title">CONTENT SUPPORTED BY</span><br />
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
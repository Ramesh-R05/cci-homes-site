import React, {Component, PropTypes} from 'react';
import FooterSocialLinks from './footerSocialLinks';
import FooterNetworkInfo from './footerNetworkInfo';
import FooterNavigation from './footerNavigation';
import MagShop from '../magshop/magshop';
import BackToTop from '@bxm/ui/lib/back-to-top/backToTop';
import Newsletter from '@bxm/newsletter/lib/components/newsletter';

export default class FooterSection extends Component {

    constructor(...args) {
        super(...args);
    }

    static propTypes = {
        config: PropTypes.object.isRequired,
        iframeKey: PropTypes.string,
        modifier: PropTypes.string
    };

    static defaultProps = {
        config: {},
        iframeKey: 'wnfooter'
    };

    render() {
        const {iframeKey, config, modifier} = this.props;
        let classNames = 'footer';

        if (modifier) classNames += ` footer--${modifier}`;

        return (
            <div className="footer-wrapper">
                <footer className={classNames}>
                    <FooterSocialLinks />
                    <div className="row">
                        <Newsletter url={`${config.newsletterIframeUrl}!${iframeKey}`} />
                        <MagShop content={config.magShop} />
                    </div>
                    <div className="row">
                        <FooterNetworkInfo />
                    </div>
                    <FooterNavigation />
                    <div className="footer__copyright">
                        <span>&copy; copyright bauer media pty limited all rights reserved</span>
                    </div>
                </footer>
                <BackToTop className="button" />
            </div>
        );
    }
}

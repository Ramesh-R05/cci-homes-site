import React, {Component, PropTypes} from 'react';
import FooterSocialLinks from './footerSocialLinks';
import FooterNetworkInfo from './footerNetworkInfo';
import FooterNavigation from './footerNavigation';
import MagShop from '../magshop/magshop';
import BackToTop from '@bxm/ui/lib/back-to-top/backToTop';
import FooterNewsletter from '@bxm/newsletter/lib/components/newsletter';

export default class FooterSection extends Component {

    constructor(...args) {
        super(...args);
    }

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    render() {
        const {data} = this.props;
        const iframeUrl = data.newsletter.footerIframeUrl;

        return (
            <div>
                <footer className="footer">
                    <FooterSocialLinks />
                    <div className="row">
                        <FooterNewsletter url={iframeUrl} />
                        <MagShop content={data.magShop} />
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

import React, {Component} from 'react';
import FooterSocialLinks from './footerSocialLinks';
import FooterNetworkInfo from './footerNetworkInfo';
import FooterNavigation from './footerNavigation';
import FooterMagShop from './footerMagShop';
import FooterNewsletter from '../newsletter/newsletter';
import BackToTop from '@bxm/ui/lib/back-to-top/backToTop';

export default class FooterSection extends Component {

    constructor(...args) {
        super(...args);
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <FooterSocialLinks />
                    <div className="row">
                        <FooterNewsletter url="https://d4jqclkssewcy.cloudfront.net/page.aspx?QS=38dfbe491fab00eaf0b8fb992ad1a0b52fb9e1dc0c154322&brand=homes_to_love!wnfooter" />
                        <FooterMagShop />
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

import React from 'react';

const FooterNavigation = () => (
    <nav className="footer__navigation" role="contentinfo">
        <ul>
            <li>
                <a
                  href="http://www.bauer-media.com.au/privacy"
                  className="gtm-footer-privacy"
                  target="_blank"
                >
                    Privacy Policy
                </a>
            </li>
            <li>
                <a
                  href="http://www.bauer-media.com.au/advertising/advertise-with-us"
                  className="gtm-footer-advertising"
                  target="_blank"
                >
                    Advertise
                </a>
            </li>
            <li>
                <a
                  href="http://www.bauer-media.com.au/terms/website-terms"
                  className="gtm-footer-terms"
                  target="_blank"
                >
                    Terms of Use
                </a>
            </li>
        </ul>
    </nav>
);

export default FooterNavigation;

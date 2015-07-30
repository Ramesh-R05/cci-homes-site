import React, {Component} from 'react';

export default class FooterNavigation extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <nav className="footer__navigation" role="contentinfo">
                <ul>
                    <li>
                        <a href="http://www.bauer-media.com.au/privacy" target="_blank">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="http://www.bauer-media.com.au/advertising/advertise-with-us" target="_blank">Advertise</a>
                    </li>
                    <li>
                        <a href="http://www.bauer-media.com.au/terms/website-terms" target="_blank">Terms of Use</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

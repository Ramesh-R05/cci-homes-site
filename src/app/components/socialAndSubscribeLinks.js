import React, {Component, PropTypes} from 'react';
import Magazine from './magazine';
import Newsletter from './newsletter';
import Social from './social';

export default class SocialAndSubscribeLinks extends Component {
    render() {
        const {content} = this.props;
        return (
            <div className="social-subscribe-links">
                {content.nodeType === 'BrandSection' && <Magazine {...this.props} />}
                <Newsletter />
                <Social />
            </div>
        )
    }
}

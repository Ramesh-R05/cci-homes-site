import React, {Component} from 'react';
import Ad from '@bxm/ad/src/google/components/ad';

class FeedAd extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <li className="feed-ad">
                <Ad
                    displayFor={['medium', 'large', 'xlarge']}
                    sizes={['double-mrec', 'mrec']}
                />
            </li>
        );
    }

}

export default FeedAd;

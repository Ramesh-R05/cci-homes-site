import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/src/google/components/ad';
import {isString, isNumber} from 'lodash/lang';
const isArray = Array.isArray;

class FeedAd extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {pageId, keyword, position} = this.props;
        if (!isString(pageId) || !isNumber(position) || !isArray(keyword)) {
            return null;
        }

        return (
            <li className="feed-ad">
                <Ad
                    displayFor={['medium', 'large', 'xlarge']}
                    sizes={['double-mrec', 'mrec']}
                    targets={{ pageId, keyword, position }}
                />
            </li>
        );
    }

}

FeedAd.propTypes = {
    position: PropTypes.number.isRequired,
    keyword: PropTypes.arrayOf(React.PropTypes.string).isRequired,
    pageId: PropTypes.string.isRequired
};

export default FeedAd;

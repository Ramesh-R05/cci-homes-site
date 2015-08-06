import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import isNumber from 'lodash/lang/isNumber';
import isString from 'lodash/lang/isString';
const isArray = Array.isArray;

export default class FeedAd extends Component {

    static propTypes = {
        position: PropTypes.number.isRequired,
        keyword: PropTypes.arrayOf(React.PropTypes.string).isRequired,
        pageId: PropTypes.string.isRequired,
        source: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {pageId, keyword, position, source} = this.props;
        if (!isString(pageId) || !isNumber(position) || !isArray(keyword)) {
            return null;
        }

        return (
            <li className="feed-ad">
                <Ad
                    displayFor={['medium', 'large', 'xlarge']}
                    sizes={['double-mrec', 'mrec']}
                    targets={{ pageId, keyword, position, brand: source }}
                />
            </li>
        );
    }

}

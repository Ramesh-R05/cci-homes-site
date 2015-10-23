import React, {Component, PropTypes} from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import isNumber from 'lodash/lang/isNumber';
import isString from 'lodash/lang/isString';
import isEmpty from 'lodash/lang/isEmpty';
import isUndefined from 'lodash/lang/isUndefined';
import {getFirstTagNameForCategory} from '@bxm/tags/lib/utils';

const isArray = Array.isArray;

export default class FeedAd extends Component {

    static propTypes = {
        position: PropTypes.number.isRequired,
        keyword: PropTypes.arrayOf(React.PropTypes.string).isRequired,
        pageId: PropTypes.string.isRequired,
        source: PropTypes.string,
        tags: PropTypes.arrayOf(React.PropTypes.string)
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {pageId, keyword, position, source, tags} = this.props;

        if (!isString(pageId) || !isNumber(position) || !isArray(keyword)) {
            return null;
        }

        let targets = { pageId, keyword, position, brand: source };

        if (tags) {
            const kingtag = getFirstTagNameForCategory(tags, 'Homes navigation');

            if (!isUndefined(kingtag) && !isEmpty(kingtag)) targets.kingtag = kingtag;
        }

        return (
            <li className="feed-ad">
                <Ad
                    displayFor={['medium', 'large', 'xlarge']}
                    sizes={['double-mrec', 'mrec']}
                    targets={targets}
                />
            </li>
        );
    }

}

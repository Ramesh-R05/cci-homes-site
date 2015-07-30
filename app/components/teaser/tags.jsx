import React, {Component, PropTypes} from 'react';
import * as TagUtils from '../../utils/tagUtils';
import difference from 'lodash/array/difference';
import union from 'lodash/array/union';
import isUndefined from 'lodash/lang/isUndefined';

export default class Tags extends Component {

    static displayName = 'TeaserTags';

    static propTypes = {
        tags: PropTypes.array
    };

    getTags() {
        const primaryTags = TagUtils.getRelatedTags(this.props.tags, [{ category: 'Topic' }]);
        const unwantedTags = TagUtils.getRelatedTags(this.props.tags, [{ category: 'Homes navigation' }]);

        if (primaryTags.length === 0) return {};

        let primary = TagUtils.getTagName(primaryTags[0]);

        let secondaryTags = difference( this.props.tags, union( primaryTags, unwantedTags ) );
        let secondary = TagUtils.getTagName(secondaryTags[0]);
        return { primary, secondary };
    }

    render() {
        if (!this.props.tags || !Array.isArray(this.props.tags)) return null;

        const tags = this.getTags(this.props.tags);

        if (isUndefined(tags.primary)) return null;

        const separator = !isUndefined(tags.secondary) ? ', ' : '';
        const primaryTagHtml = <span className="tag-primary">{`${tags.primary}${separator}`}</span>;
        const secondaryTagHtml = isUndefined(tags.secondary) ? null : <span className="tag-secondary">{tags.secondary}</span>;

        return (
            <p className="teaser__tags">
                {primaryTagHtml}
                {secondaryTagHtml}
            </p>
        );
    }
}

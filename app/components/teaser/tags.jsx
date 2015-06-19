import React, {Component, PropTypes} from 'react';
//import tagUtils from '@bxm/ui/lib/to-love/utils/tagUtils';
import TagUtils from '../../utils/tagUtils';
import _ from 'lodash';

export default class Tags extends Component {

    getTags() {
        TagUtils.setRelatedCategories(['Topic']);
        const primaryTags = TagUtils.getRelatedTags(this.props.tags);

        TagUtils.setRelatedCategories(['Homes navigation']);
        const unwantedTags = TagUtils.getRelatedTags(this.props.tags);

        if (primaryTags.length === 0) return {};

        let primary = TagUtils.getTagName( primaryTags[0]);

        let secondaryTags = _.difference( this.props.tags, _.union( primaryTags, unwantedTags ) );
        let secondary = secondaryTags.length > 0 ? TagUtils.getTagName(secondaryTags[0]) : null;
        return { primary, secondary };
    }

    render() {
        if (!this.props.tags || !Array.isArray(this.props.tags)) return null;

        const tags = this.getTags( this.props.tags );

        if (!tags.primary) return null;

        const primaryTagHtml = <span className="tag-primary">{tags.primary}</span>;
        const secondaryTagHtml = _.isNull(tags.secondary) ? '' : <span className="tag-secondary">, {tags.secondary}</span>;

        return (
            <p className="teaser__tags">
                {primaryTagHtml}
                {secondaryTagHtml}
            </p>
        );
    }
}

Tags.displayName = 'TeaserTags';

Tags.propTypes = {
    tags: PropTypes.array
};

Tags.defaultProps = {};

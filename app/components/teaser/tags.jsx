import React, {Component, PropTypes} from 'react';
import tagUtils from '@bxm/ui/lib/to-love/utils/tagUtils';

export default class Tags extends Component {
    getPrimaryTag() {
        let primaryTag;
        const topicTags = this.props.tags.filter((tag) => {
            return tagUtils.getTagCategory(tag) === 'Topic';
        });

        if (topicTags.length > 0) {
            primaryTag = tagUtils.getTagName(topicTags[0]);
        }

        return primaryTag;
    }

    getSecondaryTag(primaryTag) {
        let secondaryTag;

        const tagsNotPrimary = this.props.tags.filter((tag) => {
            return tagUtils.getTagName(tag) !== primaryTag &&
                tagUtils.getTagCategory(tag) !== 'Homes navigation';
        });

        if (tagsNotPrimary.length > 0) {
            secondaryTag = tagUtils.getTagName(tagsNotPrimary[0]);
        }

        return secondaryTag;
    }

    render() {
        const {tags} = this.props;
        if (!this.props.tags || !Array.isArray(tags)) return null;

        const primaryTag = this.getPrimaryTag();
        if (!primaryTag) return null;

        const secondaryTag = this.getSecondaryTag(primaryTag);

        const primaryTagHtml = <span className="tag-primary">{primaryTag}</span>;
        let secondaryTagHtml;
        if (secondaryTag) {
            secondaryTagHtml = <span className="tag-secondary">, {secondaryTag}</span>;
        }

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

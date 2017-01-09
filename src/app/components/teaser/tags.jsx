import React, {Component, PropTypes} from 'react';
import TagLink from '@bxm/tags/lib/components/link';

export default class Tags extends Component {

    static displayName = 'TeaserTags';

    static propTypes = {
        tagsDetails: PropTypes.array
    };

    getPrimaryTag(tagsDetails) {
        return tagsDetails.find((tag)=>{
            return tag.name.includes('Topic');
        });
    }

    getSecondaryTag(tagsDetails) {
        return tagsDetails.find((tag)=>{
            return !tag.name.includes('Topic') && !tag.name.includes('Homes navigation');
        });
    }

    render() {

        const { tagsDetails = [] } = this.props;

        const primaryTag = this.getPrimaryTag(tagsDetails);
        const secondaryTag = this.getSecondaryTag(tagsDetails);

        if (!primaryTag || !primaryTag.displayName) return null;

        const primaryTagHtml = <span className="tag-primary"><TagLink name={primaryTag.displayName} /></span>;

        let separator = null;
        let secondaryTagHtml = null;

        if (secondaryTag && secondaryTag.displayName) {
            separator = <span className="tag-separator">, </span>;
            secondaryTagHtml = <span className="tag-secondary"><TagLink name={secondaryTag.displayName} /></span>;
        }

        return (
            <p className="teaser__tags">
                {primaryTagHtml}
                {separator}
                {secondaryTagHtml}
            </p>
        );
    }
}

import React, {Component, PropTypes} from 'react';
import getRelatedTags from '@bxm/tags/lib/utils/getRelatedTags';
import TagLink from '@bxm/tags/lib/components/link';

export default class Tags extends Component {

    static displayName = 'ArticleTags';

    static propTypes = {
        tags: PropTypes.array.isRequired
    };

    static defaultProps = {
        tags: []
    };

    static filters = [
        { category: 'Audience' },
        { category: 'Building', subCategory: 'Building style' },
        { category: 'Building', subCategory: 'Type' },
        { category: 'Decorating', subCategory: 'Style' },
        { category: 'DIY and craft', subCategory: 'DIY projects' },
        { category: 'Difficulty' },
        { category: 'Duration' },
        { category: 'Garden/Outdoor', subCategory: 'Garden style' },
        { category: 'Garden/Outdoor', subCategory: 'Landscaping' },
        { category: 'Location and setting' },
        { category: 'Occasion' },
        { category: 'Renovating', subCategory: 'Renovation type'},
        { category: 'Renovating', subCategory: 'Materials'},
        { category: 'Room' },
        { category: 'Topic', tag: 'How to' }
    ];

    render() {
        let relatedTags = getRelatedTags(this.props.tags, Tags.filters, { nameOnly: true });

        if (relatedTags.length === 0) return null;

        const linkedTags = relatedTags.map((tagName, index) => {
            const separator = index < relatedTags.length - 1 ? ', ' : '';
            return <li key={`tag-link-${index}`}><TagLink name={tagName} />{separator}</li>;
        });

        relatedTags = relatedTags.join(', ');

        return (
            <section className="article__tags">
                <meta itemProp="keywords" content={relatedTags}/>
                <span className="tags__title">RELATED TAGS: </span>
                <ul className="related-tags">{linkedTags}</ul>
            </section>
        );
    }
}


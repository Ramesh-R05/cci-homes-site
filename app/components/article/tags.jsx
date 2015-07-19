import React, {Component, PropTypes} from 'react';
import {getRelatedTags} from '../../utils/tagUtils';

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
        { category: 'Building', subCategory: 'Building style'},
        { category: 'Building', subCategory: 'Type'},
        { category: 'Decorating', subCategory: 'Style'},
        { category: 'DIY and craft', subCategory: 'DIY projects'},
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

        relatedTags = relatedTags.join(', ');

        return (
            <section className="article__tags">
                <meta itemProp="keywords" content={relatedTags}/>
                <span className="tags__title">RELATED TAGS: </span>
                <span className="related-tags">{relatedTags}</span>
            </section>
        );
    }
}


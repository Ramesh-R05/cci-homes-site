import React, {Component, PropTypes} from 'react';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';

export default class ArticleGroup extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: []
    };

    render() {
        const articles = this.props.articles;

        if (!articles.length) return null;

        return <div className="brand-section brand-section--repeat">
                {slice(articles, 0, 6).map(item => <Teaser {...item} key={item.id} modifier="img-left" sizes="brand-list" />)}
            </div>;
    }
}

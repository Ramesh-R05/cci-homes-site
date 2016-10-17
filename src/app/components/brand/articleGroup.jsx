import React, {Component, PropTypes} from 'react';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';

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
                {slice(articles, 0, 3).map(item => <Teaser {...item} key={item.id} modifier="img-left" />)}
                {/* Second MREC - Soon to be repeated in a future task */}
                    <Ad
                        className="ad--section-mrec"
                        sizes="mrec"
                        targets={{position: 2}} />
                {slice(articles, 3, 7).map(item => <Teaser {...item} key={item.id} modifier="img-top" sizes="large" />)}
            </div>;
    }
}

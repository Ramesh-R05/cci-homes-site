import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import chunk from 'lodash/array/chunk';
import Ad from '@bxm/ad/src/google/components/ad';


export default class GroupRepeatable extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: []
    };

    render() {
        const {articles} = this.props;

        if (!articles.length) return null;

        const groups = chunk(articles, 9);

        return (
            <div>
                {groups.map((groupArticles, index) => {
                    return (
                        <section key={index} className="section--9-items">
                            {groupArticles.slice(0, 2).map(item => <Teaser {...item} key={item.id} />)}
                            <Ad
                                className="ad--section-mrec"
                                displayFor="large"
                                sizes="mrec"
                                targets={{
                                    position: 2
                                }}
                            />
                            {groupArticles.slice(2, 3).map(item => <Teaser {...item} key={item.id} />)}
                            <Ad
                                className="ad--section-mrec"
                                displayFor={['small', 'medium', 'xlarge']}
                                sizes={{
                                    small: 'mrec',
                                    xlarge: ['double-mrec', 'mrec']
                                }}
                                targets={{
                                    position: 2
                                }}
                            />
                            {groupArticles.slice(3, 7).map(item => <Teaser {...item} key={item.id} modifier="img-top" />)}
                            {groupArticles.slice(7, 9).map(item => <Teaser {...item} key={item.id} modifier="img-top" sizes="small-hero" />)}
                        </section>
                    );
                })}
            </div>
        );
    }
}

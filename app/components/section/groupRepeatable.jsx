import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import chunk from 'lodash/array/chunk';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class GroupRepeatable extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: []
    };

    displayAd = () => {
        return (<div className="section-heading">
            <Ad
                className="ad--section-middle-leaderboard"
                displayFor="large"
                sizes={{
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                }}
                targets={{
                    position: 1
                }}
            />
            <Ad
                className="ad--section-middle-leaderboard"
                displayFor={['small', 'medium', 'xlarge']}
                sizes={{
                    small: 'banner',
                    leaderboard: 'leaderboard',
                    billboard: ['billboard', 'leaderboard']
                }}
                targets={{
                    position: 1
                }}
            />
        </div>);
    };

    render() {
        const {articles} = this.props;
        if (!articles.length) return null;
        const groups = chunk(articles, 9);
        return (
            <div>
                {groups.map((groupArticles, index) => {
                    return (
                        <div>
                            {this.displayAd()}

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
                        </div>
                    );
                })}
            </div>
        );
    }
}

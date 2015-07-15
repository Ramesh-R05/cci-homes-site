import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/src/google/components/ad';


export default class SectionFeatured extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        children: PropTypes.any
    };

    static defaultProps = {
        articles: []
    };

    render() {
        const articles = this.props.articles;
        const hero = first(articles);

        if (articles.length === 0) return null;

        return (
            <div>
                <div className="row">
                    {/* Top ad */}
                    <div className="columns small-12">
                        <Ad
                            className="ad--section-top-leaderboard"
                            displayFor={['medium', 'large', 'xlarge']}
                            sizes={{
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                        />
                    </div>
                    {/* First 10 articles */}
                    <section className="section-featured section-featured--top">
                        {/* Hero article displayed in first position from sm to lg viewports */}
                        <Teaser {...hero} key={hero.id} modifier="hero" />
                        <div className="columns small-12 hide-for-medium-up">
                            <Ad
                                className="ad--section-top-leaderboard"
                                displayFor={['small']}
                                sizes="banner"
                            />
                        </div>
                        {slice(articles, 1, 2).map(item => <Teaser {...item} key={item.id} />)}
                        {/* Hero article displayed in second position from xl viewports */}
                        <Teaser {...hero} key={`${hero.id}-xl`} modifier="hero" />
                        {slice(articles, 2, 6).map(item => <Teaser {...item} key={item.id} />)}
                        {/* First MREC */}
                        <Ad
                            className="ad--section-mrec"
                            sizes={{
                                small: 'mrec',
                                xlarge: ['double-mrec', 'mrec']
                            }}
                        />
                        {slice(articles, 6, 10).map(item => <Teaser {...item} key={item.id} />)}
                    </section>
                </div>
                <div className="row">
                    {/* In Focus articles */}
                    <div className="fixed-column fixed-column--in-focus">
                        {this.props.children}
                    </div>
                    {/* Next 5 articles */}
                    <section className="section-featured section-featured--heroes">
                        <div className="row">
                            {slice(articles, 10, 12).map(item => <Teaser {...item} key={item.id} sizes="img-left-to-hero" />)}
                        </div>
                    </section>
                    <div className="fixed-column">
                        <section className="section-featured section-featured--bottom">
                            <div className="row">
                                {slice(articles, 12, 15).map(item => <Teaser {...item} key={item.id} sizes="base-to-narrow" />)}
                            </div>
                        </section>
                    </div>
                    {/* Middle ad */}
                    <div className="columns small-12">
                        <Ad
                            className="ad--section-middle-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{ position: 2 }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

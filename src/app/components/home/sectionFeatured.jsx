import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import PolarTeaser from '../polar/polarTeaser';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';
import Ad from '@bxm/ad/lib/google/components/ad';
import PolarNativeHub from '../polar/polarNativeHub';

export default class SectionFeatured extends Component {
    static displayName = 'SectionFeatured';

    static propTypes = {
        articles: PropTypes.array.isRequired,
        children: PropTypes.any,
        className: PropTypes.string
    };

    static defaultProps = {
        articles: [],
        className: '',
        children: []
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {articles, children} = this.props;
        const hero = first(articles);

        if (articles.length === 0) return null;

        return (
            <div className={this.props.className}>
                <div className="home-section">
                    <div className="row">
                        <section className="home-section--top columns small-12">
                            <div className="row">
                                <section className="top-teasers columns large-8">

                                    <div className="small-12 medium-12">
                                        <Teaser {...hero}
                                            key={hero.id}
                                            lazyload={false}
                                            modifier="hero-img-top"
                                            sizes="home-hero"
                                        />
                                    </div>

                                    <div className="large-12">
                                        <Teaser {...hero}
                                            key={hero.id}
                                            lazyload={false}
                                            modifier="hero"
                                            sizes="home-hero"
                                        />
                                    </div>

                                    <Ad
                                        className="ad--section-mrec home-section-top-mrec-1"
                                        displayFor={['small','medium']}
                                        sizes={{
                                            small: 'mrec',
                                            medium: 'mrec'
                                        }}
                                        targets={{position: 1}}
                                    />

                                    {slice(articles, 1, 2).map(item =>
                                        <Teaser {...item}
                                            key={item.id}
                                            modifier="img-top"
                                        />
                                    )}

                                    <PolarTeaser
                                        {...articles[2]}
                                        ad={{label: 'home_teaser_1'}}
                                        modifier="img-top"
                                        className="home-section-top-polar"
                                    />

                                    {slice(articles, 3, 7).map(item =>
                                        <Teaser {...item} key={item.id}
                                            modifier="img-top"
                                        />
                                    )}

                                    <Ad
                                        className="ad--section-mrec home-section-top-mrec-2"
                                        displayFor={['medium']}
                                        sizes={{
                                            medium: 'mrec'
                                        }}
                                        targets={{position: 2}}
                                    />

                                </section>

                                <StickyBlock
                                    breakpoints={['large', 'xlarge']}
                                    containerMarginBottom={120}
                                    containerClasses="show-for-large-up large-4 columns">
                                    <Ad
                                        className="ad--section-mrec"
                                        displayFor={['large', 'xlarge']}
                                        sizes={['double-mrec', 'mrec']}
                                        targets={{position: 1}}
                                    />
                                </StickyBlock>
                            </div>
                        </section>
                    </div>

                    <PolarNativeHub/>

                    <div className="row">
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

                    <div className="row">
                        <div className="home-section--bottom columns small-12">
                            <div className="row">
                                <section className="bottom-teasers columns large-8">

                                    <Ad
                                        className="ad--section-mrec"
                                        displayFor={['small', 'medium']}
                                        sizes={{
                                            small: 'mrec',
                                            medium: 'mrec'
                                        }}
                                        targets={{position: 3}}
                                    />

                                    {slice(articles, 7, 12).map(item =>
                                        <Teaser {...item}
                                            key={item.id}
                                            modifier="img-top"
                                        />
                                    )}

                                    <PolarTeaser
                                        {...articles[12]}
                                        ad={{label: 'home_teaser_2'}}
                                        modifier="img-top"
                                        className="home-section-bottom-polar"
                                    />

                                    <Ad
                                        className="ad--section-mrec"
                                        displayFor={['medium']}
                                        sizes={{
                                            medium: 'mrec'
                                        }}
                                        targets={{position: 4}}
                                    />

                                </section>

                                <StickyBlock
                                    breakpoints={['large', 'xlarge']}
                                    containerMarginBottom={60}
                                    containerClasses="show-for-large-up large-4 columns">
                                    <Ad
                                        className="ad--section-mrec"
                                        displayFor={['large', 'xlarge']}
                                        sizes={['double-mrec', 'mrec']}
                                        targets={{position: 3}}
                                    />
                                </StickyBlock>
                            </div>
                        </div>

                        <div className="columns small-12">
                            <Ad
                                className="ad--section-bottom-leaderboard"
                                sizes={{
                                    small: 'banner',
                                    leaderboard: 'leaderboard',
                                    billboard: ['billboard', 'leaderboard']
                                }}
                                targets={{position: 3}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

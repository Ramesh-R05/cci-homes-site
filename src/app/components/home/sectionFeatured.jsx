import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import PolarTeaser from '../polar/polarTeaser';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';
import Ad from '@bxm/ad/lib/google/components/ad';
import PolarNativeHub from '../polar/polarNativeHub';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import List from '../section/list';
import SocialAndSubscribeLinks from '../socialAndSubscribeLinks';

export default class SectionFeatured extends Component {
    static displayName = 'SectionFeatured';

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
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
        const {hero, articles, content, list, listNextParams} = this.props;

        if (articles.length === 0) return null;

        return (
            <div className={this.props.className}>
                <div className="home-section">
                    <div className="row">
                        <section className="home-section--top columns small-12">
                            <div className="row">
                                <section className="top-teasers columns large-8">

                                    <div className="row">
                                        <div className="column small-12">
                                            <Teaser {...hero}
                                                key={hero.id}
                                                lazyload={false}
                                                modifier="hero-img-top"
                                                sizes="home-hero"
                                                gtmClass="gtm-hero-homepage"
                                            />
                                        </div>

                                        <div className="column large-12">
                                            <Teaser {...hero}
                                                key={hero.id}
                                                lazyload={false}
                                                modifier="hero"
                                                sizes="home-hero"
                                                gtmClass="gtm-hero-homepage"
                                            />
                                        </div>
                                    </div>

                                    <div className="row hide-for-large-up">
                                        <SocialAndSubscribeLinks content={content} />
                                    </div>

                                    <Ad
                                        className="ad--section-mrec home-section-top-mrec-1"
                                        displayFor={['small','medium']}
                                        sizes={{
                                            small: 'mrec',
                                            medium: 'mrec'
                                        }}
                                        targets={{position: 1}}
                                        label={{active: false}}
                                    />

                                    {articles.slice(0, 1).map(item =>
                                        <Teaser {...item}
                                            key={item.id}
                                            modifier="img-top"
                                            gtmClass="gtm-topteaserlist-homepage"
                                        />
                                    )}

                                    <PolarTeaser
                                        {...articles[1]}
                                        ad={{label: 'home_teaser_1'}}
                                        modifier="img-top"
                                        className="home-section-top-polar"
                                    />

                                    {articles.slice(2, 6).map(item =>
                                        <Teaser {...item} key={item.id}
                                            modifier="img-top"
                                            gtmClass="gtm-topteaserlist-homepage"
                                        />
                                    )}

                                    <Ad
                                        className="ad--section-mrec home-section-top-mrec-2"
                                        displayFor={['medium']}
                                        sizes={{
                                            medium: 'mrec'
                                        }}
                                        targets={{position: 2}}
                                        label={{active: false}}
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
                                        label={{active: false}}
                                    />
                                    <SocialAndSubscribeLinks content={content} />
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
                                label={{active: false}}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="home-section--bottom columns small-12">
                            <div className="row">

                                <Repeatable
                                    component={List}
                                    action={loadList}
                                    dataSource={list}
                                    nextParams={listNextParams}
                                    className="news-feed bottom-news-feed"
                                    adTargets={{ position: 2 }}
                                    content={ content }
                                />

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
                                label={{active: false}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

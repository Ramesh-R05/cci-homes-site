import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import PolarTeaser from '../polar/polarTeaser';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';
import Ad from '@bxm/ad/lib/google/components/ad';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import List from '../section/list';
import SocialAndSubscribeLinks from '../socialAndSubscribeLinks';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';

export default class SectionFeatured extends Component {
    static displayName = 'SectionFeatured';

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        children: PropTypes.any,
        className: PropTypes.string,
        polarTargets: PropTypes.array
    };

    static defaultProps = {
        articles: [],
        className: '',
        children: [],
        polarTargets: [ [], []]
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {hero, articles, latestRealHomes, list, listNextParams, content, polarTargets} = this.props;

        if (articles.length === 0) return null;

        const stickyAdProps = {
            className: 'ad--section-bottom-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                banner: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            targets: {
                position: 3
            }
        };

        let latestRealHomesComponent = null;
        if (latestRealHomes && latestRealHomes.length > 0) {
            latestRealHomesComponent = (
                <div className="row show-for-large-up">
                    <div className="latest-real-homes">
                        <div className="latest-real-homes__title-container">
                            <span className="latest-real-homes__title">Latest Real Homes</span>
                        </div>
                        <div>
                            {latestRealHomes.map((item, i)=>{
                                const teaser = {
                                    id: item.id,
                                    title: item.title,
                                    url: item.url,
                                    imageUrl: item.imageUrl,
                                    imageAltText: item.imageAltText
                                };
                                return (
                                    <Teaser
                                        {...teaser}
                                        key={item.id}
                                        lazyload={false}
                                        modifier="latest-real-homes"
                                        gtmClass={`gtm-realhomes${i+1}-homepage`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={this.props.className}>
                <div className="home-section">
                    {latestRealHomesComponent}
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

                                    <div className="hide-for-large-up">
                                        <SocialAndSubscribeLinks content={content} />
                                    </div>

                                    <Ad
                                        className="ad--section-mrec home-section-top-mrec-1"
                                        displayFor={['small','medium']}
                                        sizes={{
                                            small: 'mrec',
                                            medium: 'mrec'
                                        }}
                                        updatePageOffset={true}
                                        targets={{position: 1}}
                                        label={{active: false}}
                                    />

                                    {articles.slice(0, 6).map( (item, i) => {
                                        const polarDetails = polarTargets[0].find(slot => slot.index === i);

                                            if (polarDetails) {
                                                return <PolarTeaser {...item} key={item.id} ad={polarDetails} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-homepage" />;
                                            } else {
                                                return <Teaser {...item} key={item.id} modifier="img-top" gtmClass="gtm-topteaserlist-homepage"/>;
                                            }
                                    }
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
                                    polarTargets={polarTargets[1]}
                                />

                            </div>

                        </div>
                    </div>

                    <StickyAd
                        adProps={stickyAdProps}
                        minHeight={450} />

                </div>
            </div>
        );
    }
}

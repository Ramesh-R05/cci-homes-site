import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import Teaser from '../teaser/teaser';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import List from '../section/list';
import SocialAndSubscribeLinks from '../socialAndSubscribeLinks';
// import LatestVideos from './latestVideos';

export default class SectionFeatured extends Component {
    static displayName = 'SectionFeatured';

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        children: PropTypes.any,
        className: PropTypes.string,
        polarTargets: PropTypes.array,
        latestVideos: PropTypes.array,
        list: PropTypes.object,
        listNextParams: PropTypes.object
    };

    static defaultProps = {
        articles: [],
        className: '',
        children: [],
        polarTargets: [[], []],
        hero: {},
        latestVideos: [],
        list: {},
        listNextParams: {}
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { hero, articles, list, listNextParams, content, polarTargets, className /* latestVideos */ } = this.props;
        // const { config } = this.context;
        // const isLipstickEnabled = config.isFeatureEnabled('lipstick');

        if (articles.length === 0) {
            return null;
        }

        const stickyAdProps = {
            className: 'ad--section-bottom-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                banner: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            pageLocation: Ad.pos.outside,
            lazyLoad: true
        };

        // let latestVideosComponent = null;

        // if (latestVideos && latestVideos.length && isLipstickEnabled) {
        //     latestVideosComponent = (
        //         <div className="row">
        //             <LatestVideos videoList={latestVideos} title="Latest Videos" />
        //         </div>
        //     );
        // }

        return (
            <div className={className}>
                <div className="row">
                    <section className="home-section__top">
                        <section className="top-teasers columns large-8">
                            <div className="row">
                                <Teaser
                                    {...hero}
                                    key={hero.id}
                                    lazyload={false}
                                    modifier="hero"
                                    sizes="home-hero"
                                    gtmClass="gtm-hero-homepage"
                                    className="home-section__hero-teaser columns small-12"
                                />
                            </div>

                            <div className="row hide-for-large-up">
                                <div className="columns medium-6">
                                    <Ad
                                        className="ad--section-mrec home-section-top-mrec-1"
                                        displayFor={['small', 'medium']}
                                        sizes={{
                                            small: 'mrec',
                                            medium: 'mrec'
                                        }}
                                        updatePageOffset
                                        label={{ active: false }}
                                        pageLocation={Ad.pos.body}
                                    />
                                </div>
                                <div className="columns medium-6">
                                    <SocialAndSubscribeLinks content={content} />
                                </div>
                            </div>

                            <div className="row">
                                {articles.slice(0, 6).map((item, i) => {
                                    const polarDetails = polarTargets[0].find(slot => slot.index === i) || false;

                                    const teaserClassName = classNames('column small-12 medium-6 large-6 ', {
                                        'home-section__polar-teaser': polarDetails,
                                        'home-section__grid-teaser': true
                                    });

                                    return (
                                        <Teaser
                                            {...item}
                                            key={item.id}
                                            polar={polarDetails}
                                            sizes="brand-list"
                                            modifier="img-top"
                                            gtmClass="gtm-topteaserlist-brand"
                                            className={teaserClassName}
                                        />
                                    );
                                })}
                            </div>

                            <Ad
                                className="ad--section-mrec home-section-top-mrec-2"
                                displayFor={['medium']}
                                sizes={{
                                    medium: 'mrec'
                                }}
                                label={{ active: false }}
                                pageLocation={Ad.pos.body}
                            />
                        </section>

                        <StickyBlock
                            breakpoints={['large', 'xlarge']}
                            containerMarginBottom={120}
                            containerClasses="show-for-large-up large-4 columns"
                        >
                            <Ad
                                className="ad--section-mrec"
                                displayFor={['large', 'xlarge']}
                                sizes={['double-mrec', 'mrec']}
                                label={{ active: false }}
                                pageLocation={Ad.pos.aside}
                            />
                            <SocialAndSubscribeLinks content={content} />
                        </StickyBlock>
                    </section>
                </div>

                {/* {latestVideosComponent} */}

                <div className="row">
                    <div className="columns small-12">
                        <Ad
                            className="ad--section-middle-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            label={{ active: false }}
                            pageLocation={Ad.pos.outside}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="home-section__bottom columns small-12">
                        <Repeatable
                            component={List}
                            action={loadList}
                            dataSource={list}
                            nextParams={listNextParams}
                            className="news-feed bottom-news-feed"
                            adTargets={{ position: 2 }}
                            content={content}
                            polarTargets={polarTargets[1]}
                        />
                    </div>
                </div>

                <StickyAd adProps={stickyAdProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
            </div>
        );
    }
}

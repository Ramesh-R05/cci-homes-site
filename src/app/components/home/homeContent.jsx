import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import { connectToStores } from '@bxm/flux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import loadList from '../../actions/loadList';
import FeaturedBrandsSection from '../featuredBrandsSection/featuredBrandsSection';
import WithLoadMore from '../helpers/withLoadMore';
import Repeatable from '../repeatable';
import Featured from '../section/featured';
import List from '../section/list';
import Rail from '../section/rail';
import SocialAndSubscribeLinks from '../socialAndSubscribeLinks';
import LatestVideos from './latestVideos';

export class HomeContent extends Component {
    static displayName = 'HomeContent';

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        latestVideos: PropTypes.array,
        list: PropTypes.object,
        listNextParams: PropTypes.object,
        featuredBrands: PropTypes.object,
        latestBrandItems: PropTypes.object
    };

    static defaultProps = {
        articles: [],
        hero: {},
        latestVideos: [],
        list: {},
        listNextParams: {},
        featuredBrands: {},
        latestBrandItems: {}
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { hero, articles, list, listNextParams, content, latestVideos, latestBrandItems, featuredBrands } = this.props;
        const { config } = this.context;
        const isLipstickEnabled = config.isFeatureEnabled('lipstick');
        const { homeTopFeed, homeBottomFeed } = config.polar.details;

        if (articles.length === 0) {
            return null;
        }

        return (
            <div className="home-section">
                <div className="home-section__featured">
                    <div className="home-section__top row">
                        <Featured
                            polarTargets={homeTopFeed}
                            hero={hero}
                            articles={articles}
                            renderBlockBelowHero={() => (
                                <div className="hide-for-large-up">
                                    <SocialAndSubscribeLinks content={content} />
                                </div>
                            )}
                        />
                        <Rail marginBottom={120} yPosition={95}>
                            <SocialAndSubscribeLinks content={content} />
                        </Rail>
                    </div>

                    {isLipstickEnabled && (
                        <FeaturedBrandsSection featuredBrands={featuredBrands} latestBrandItems={latestBrandItems} className="home__body" />
                    )}

                    {latestVideos && latestVideos.length && isLipstickEnabled && (
                        <div className="row">
                            <LatestVideos videoList={latestVideos} title="Latest Videos" />
                        </div>
                    )}

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
                                polarTargets={homeBottomFeed}
                            />
                        </div>
                    </div>

                    <StickyAd
                        adProps={{
                            className: 'ad--section-bottom-leaderboard',
                            displayFor: ['small', 'medium', 'large', 'xlarge'],
                            sizes: {
                                banner: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            },
                            pageLocation: Ad.pos.outside,
                            lazyLoad: true
                        }}
                        minHeight={450}
                        stickyAtViewPort="mediumRangeMax"
                        stickyDelay={5500}
                    />
                </div>
            </div>
        );
    }
}

export default connectToStores(WithLoadMore(HomeContent), ['PageStore'], context => {
    const { getStore } = context;
    const pageStore = getStore('PageStore');

    return {
        hero: pageStore.getHeroItem(),
        articles: pageStore.getItems(),
        content: pageStore.getContent(),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams(),
        latestVideos: pageStore.getLatestVideos(),
        latestBrandItems: pageStore.getlatestBrandItems(),
        featuredBrands: pageStore.getFeaturedBrands()
    };
});

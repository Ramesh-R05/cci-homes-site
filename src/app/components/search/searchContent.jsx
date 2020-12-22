import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Featured from '../section/featured';
import List from '../section/list';
import Rail from '../section/rail';
import Repeatable from '../repeatable';
import loadSearch from '../../actions/loadSearch';

export default class SearchContent extends Component {
    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object,
        list: PropTypes.object,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        list: {},
        content: {}
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { articles, list, listNextParams, content } = this.props;
        const { config } = this.context;
        const { sectionTopFeed, sectionBottomFeed } = config.googleNativeAds.details;

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

        return (
            <div className="section__landing">
                <div className="container">
                    <div className="section__row row">
                        <Featured articles={articles} nativeAdTargets={sectionTopFeed} showSearchBar />
                        <Rail adPosition={1} marginBottom={60} yPosition={95} />
                    </div>

                    <div className="section__row section__middle">
                        <Ad
                            className="ad--section-middle-leaderboard section__ad"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            label={{ active: false }}
                            pageLocation={Ad.pos.outside}
                        />
                    </div>
                    <div className="section__row">
                        <Repeatable
                            component={List}
                            action={loadSearch}
                            dataSource={list}
                            nextParams={listNextParams}
                            className="news-feed bottom-news-feed"
                            content={content}
                            nativeAdTargets={sectionBottomFeed}
                        />
                    </div>
                    <StickyAd adProps={stickyAdProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
                </div>
            </div>
        );
    }
}

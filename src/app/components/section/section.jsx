import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import Featured from './featured';
import Rail from './rail';
import List from './list';

export default class Section extends Component {
    static displayName = 'GenericSection';

    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        list: PropTypes.object,
        listNextParams: PropTypes.object.isRequired,
        hero: PropTypes.object
    };

    static defaultProps = {
        articles: [],
        list: {},
        hero: {}
    };

    render() {
        const { articles, list, content, listNextParams, hero } = this.props;
        let { sectionTopFeed, sectionBottomFeed } = this.context.config.polar.details;

        // There is paid content in this section so we don't want to override it with Polar Ads
        if (content.title === 'Directories') {
            sectionTopFeed = [];
            sectionBottomFeed = [];
        }

        if (!articles.length) {
            return null;
        }

        if (!list && !list.items && !list.items.length) {
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

        return (
            <div className="section__landing">
                <div className="container">
                    <div className="section__row">
                        <Featured articles={articles} polarTargets={sectionTopFeed} hero={hero} />
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
                            action={loadList}
                            dataSource={list}
                            nextParams={listNextParams}
                            className="news-feed bottom-news-feed"
                            content={content}
                            polarTargets={sectionBottomFeed}
                        />
                    </div>

                    <StickyAd adProps={stickyAdProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
                </div>
            </div>
        );
    }
}

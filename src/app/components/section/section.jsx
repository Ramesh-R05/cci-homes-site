import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import Ad from '@bxm/ad/lib/google/components/ad';
import Featured from './featured';
import Rail from './rail';
import List from './list';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';

export default class Section extends Component {

    static displayName = 'GenericSection';

    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        inlineGalleries: PropTypes.element,
        isSideMenuOpen: PropTypes.bool,
        list: PropTypes.object.isRequired,
        listNextParams: PropTypes.object.isRequired,
        hero: PropTypes.object
    };

    static defaultProps = {
        articles: [],
        isSideMenuOpen: false,
        list: {},
        hero: {}
    };

    render() {
        const { articles, list, content, listNextParams, isSideMenuOpen, hero } = this.props;
        const { sectionTopFeed, sectionBottomFeed } = this.context.config.polar.details;

        if (!articles.length) return null;
        if (!list && !list.items && !list.items.length) return null;

        const sectionClassName = cx('section__landing', 'side-menu-slider', {
            'side-menu-slider--side-menu-open': isSideMenuOpen
        });

        let title = content.title;
        if (content.tagsDetails && content.tagsDetails.length > 0) {
            title = content.tagsDetails[0].displayName;
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
            <div className={sectionClassName}>
                <div className="container">
                    <div className="section__row">
                        <Featured articles={articles} polarTargets={sectionTopFeed} hero={hero} />
                        <Rail
                          adPosition={1}
                          marginBottom={60}
                          yPosition={95}
                        />
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

                    <StickyAd
                      adProps={stickyAdProps}
                      minHeight={450}
                      stickyAtViewPort="mediumRangeMax"
                      stickyDelay={5500}
                    />

                </div>
            </div>
        );
    }
}

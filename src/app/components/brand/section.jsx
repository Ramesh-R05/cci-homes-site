import React, { Component, PropTypes } from 'react';
import slice from 'lodash/array/slice';
import { connectToStores } from '@bxm/flux';
import cx from 'classnames';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import Featured from './featured';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import List from '../section/list';

class Section extends Component {
    static displayName = 'BrandSection';

    static propTypes = {
        hero: PropTypes.object,
        articles: PropTypes.array,
        content: PropTypes.object,
        isSideMenuOpen: PropTypes.bool,
        list: PropTypes.object.isRequired,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        hero: {},
        articles: [],
        content: {},
        isSideMenuOpen: false
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const {
            hero, articles, content, list, listNextParams, isSideMenuOpen
        } = this.props;
        const { config } = this.context;
        const { sectionTopFeed, sectionBottomFeed } = config.polar.details;

        const { urlName } = content;
        const menuSliderClassName = cx('brand', `brand--${urlName}`, 'side-menu-slider', {
            'side-menu-slider--side-menu-open': isSideMenuOpen
        });

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
            <div className={menuSliderClassName}>
                <div className="brand__body container">
                    <div className="row">

                        <Featured
                          hero={hero}
                          articles={slice(articles, 0, 6)}
                          content={content}
                          polarTargets={sectionTopFeed}
                        />
                    </div>
                </div>

                <div className="row-fullwidth brand__body--fullwidth-ad">
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

                <div className="brand__body brand__body--bottom">
                    <Repeatable
                      component={List}
                      action={loadList}
                      dataSource={list}
                      nextParams={listNextParams}
                      className="news-feed bottom-news-feed"
                      adTargets={{ position: 2 }}
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
        );
    }
}


export default connectToStores(Section, ['PageStore'], (context) => {
    const { getStore } = context;
    const pageStore = getStore('PageStore');

    return {
        hero: pageStore.getHeroItem(),
        articles: pageStore.getItems(),
        content: pageStore.getContent(),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams()
    };
});

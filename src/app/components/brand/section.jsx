import PropTypes from 'prop-types';
import React, { Component } from 'react';
import slice from 'lodash/array/slice';
import classNames from 'classnames';
import { connectToStores } from '@bxm/flux';
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
        list: PropTypes.object.isRequired,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        hero: {},
        articles: [],
        content: {}
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const { hero, articles, content, list, listNextParams } = this.props;
        const { config } = this.context;
        const { sectionTopFeed, sectionBottomFeed } = config.polar.details;

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

        const { urlName } = content;
        const brandSectionClassName = classNames('brand-section', 'container', { [`brand-section--${urlName}`]: true });

        return (
            <div className={brandSectionClassName}>
                <div className="brand-section__top">
                    <Featured hero={hero} articles={slice(articles, 0, 6)} content={content} polarTargets={sectionTopFeed} />
                </div>

                <div className="row-fullwidth brand-section__top-fullwidth-ad">
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

                <div className="brand-section__bottom">
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

                <StickyAd adProps={stickyAdProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
            </div>
        );
    }
}

export default connectToStores(Section, ['PageStore'], context => {
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

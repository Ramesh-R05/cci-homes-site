import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'exenv';
import slice from 'lodash/array/slice';
import {connectToStores} from '@bxm/flux';
import cx from 'classnames';
import Featured from './featured';
import Group from './articleGroup';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';

class Section extends Component {
    static propTypes = {
        brandConfig: PropTypes.object.isRequired,
        hero: PropTypes.object,
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        isSideMenuOpen: PropTypes.bool,
        moduleConfig: PropTypes.object
    };

    static defaultProps = {
        brandConfig: {},
        articles: [],
        content: {},
        moduleConfig: {},
        isSideMenuOpen: false
    };

    constructor(...args) {
        super(...args);
    }

    getGroupedArticles(articles) {
        const initIndex = 6;
        const incrementVal = 6;
        let moreArticles = articles[initIndex] ? true : false;
        let group = [];
        let startIndex = initIndex;
        let endIndex = initIndex + incrementVal;

        while (moreArticles) {
            group.push(
                <div className="row">
                    <Group articles={slice(articles, startIndex, endIndex)} />
                </div>
            );

            if (articles[endIndex]) {
                startIndex = endIndex;
                endIndex += incrementVal;
            } else {
                moreArticles = false;
            }
        }

        return group;
    }

    render() {
        const {brandConfig, hero, articles, content} = this.props;
        const {urlName} = content;
        const menuSliderClassName = cx('brand', `brand--${urlName}`, 'side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });
        const groupedArticles = this.getGroupedArticles(articles);

        return (
            <div className={menuSliderClassName}>
                <div className="brand__body container">
                    <div className="row">

                        <Featured
                            hero={hero}
                            articles={slice(articles, 0, 6)}
                            brand={content.title}
                            brandConfig={brandConfig} />
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
                            targets={{ position: 2 }} />
                </div>

                <div className="brand__body brand__body--bottom">
                    <div className="row">
                        <div className="brand-section--bottom-teasers columns small-12 large-8">
                            {groupedArticles}
                        </div>

                        <StickyBlock
                            breakpoints={['large', 'xlarge']}
                            containerClasses="columns show-for-large-up large-4 xlarge-4"
                            containerMarginBottom={10}
                            carriageYPosition={95}>
                            <Ad
                                className="ad--section-mrec"
                                displayFor={["large","xlarge"]}
                                sizes={{
                                    large: ['mrec', 'double-mrec']
                                }}
                                targets={{position: 2}}/>
                        </StickyBlock>

                    </div>
                </div>

                <div className="row">
                    <div className="columns small-12">
                        <Ad
                            className="ad--section-bottom-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{position: 4}}
                        />

                    </div>
                </div>

            </div>
        );
    }
}


export default connectToStores(Section, ['PageStore'], (context) => {
    const pageStore = context.getStore('PageStore');

    return {
        hero: pageStore.getHeroItem(),
        articles: pageStore.getItems(),
        content: pageStore.getContent()
    };
});

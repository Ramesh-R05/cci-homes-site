import React, {Component, PropTypes} from 'react';
import slice from 'lodash/array/slice';
import {connectToStores} from '@bxm/flux';
import cx from 'classnames';
import Featured from './featured';
import Ad from '@bxm/ad/lib/google/components/ad';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import List from '../section/list';

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

    static contextTypes = {
        config: PropTypes.object
    };

    constructor(...args) {
        super(...args);
    }

    render() {
        const {brandConfig, hero, articles, content, list, listNextParams} = this.props;
        const { sectionTopFeed, sectionBottomFeed } = this.context.config.polar.details;

        const {urlName} = content;
        const menuSliderClassName = cx('brand', `brand--${urlName}`, 'side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <div className={menuSliderClassName}>
                <div className="brand__body container">
                    <div className="row">

                        <Featured
                            hero={hero}
                            articles={slice(articles, 0, 6)}
                            content={content}
                            brand={content.title}
                            brandConfig={brandConfig}
                            polarTargets={sectionTopFeed} />
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
                            targets={{ position: 2 }}
                            label={{active: false}}
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

                <div className="row">
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
        );
    }
}


export default connectToStores(Section, ['PageStore'], (context) => {
    const pageStore = context.getStore('PageStore');

    return {
        hero: pageStore.getHeroItem(),
        articles: pageStore.getItems(),
        content: pageStore.getContent(),
        list: pageStore.getList(),
        listNextParams: pageStore.getListNextParams()
    };
});

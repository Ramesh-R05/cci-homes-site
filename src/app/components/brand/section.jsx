import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'exenv';
import slice from 'lodash/array/slice';
import {connectToStores} from '@bxm/flux';
import Header from './header';
import Featured from './featured';
import Group from './articleGroup';
import Ad from '@bxm/ad/lib/google/components/ad';
import cx from 'classnames';
import StickyBlock from '@bxm/behaviour/lib/components/sticky';

class Section extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        isSideMenuOpen: PropTypes.bool,
        moduleConfig: PropTypes.object
    };

    static defaultProps = {
        articles: [],
        content: {},
        moduleConfig: {},
        isSideMenuOpen: false
    };

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    static brands = {
        belle: {
            subscribe: {
                image: '/assets/images/brand-pages/subscribe/belle.jpg',
                link: 'https://www.magshop.com.au/store/homestolove'
            },
            logo: '/assets/svgs/belle.svg',
            social: {
                facebook: 'https://www.facebook.com/BelleMagazineAu',
                twitter: 'https://twitter.com/BelleMagazineAu',
                instagram: 'https://instagram.com/bellemagazineau/?hl=en'
            }
        },
        realliving: {
            subscribe: {
                image: '/assets/images/brand-pages/subscribe/real-living.jpg',
                link: 'https://www.magshop.com.au/store/homestolove'
            },
            logo: '/assets/svgs/realliving_black.svg',
            social: {
                facebook: 'https://www.facebook.com/reallivingmagazine',
                twitter: 'https://twitter.com/reallivingmag',
                instagram: 'https://instagram.com/reallivingmag/'
            }
        },
        homesplus: {
            subscribe: {
                image: '/assets/images/brand-pages/subscribe/homes.jpg',
                link: 'https://www.magshop.com.au/store/homestolove'
            },
            logo: '/assets/svgs/homesplus.svg',
            social: {
                facebook: 'https://www.facebook.com/Homesplusmag',
                twitter: 'https://twitter.com/homesplusmag',
                instagram: 'https://instagram.com/homesplusmag/'
            }
        },
        australianhouseandgarden: {
            subscribe: {
                image: '/assets/images/brand-pages/subscribe/house-and-garden.jpg',
                link: 'https://www.magshop.com.au/store/homestolove'
            },
            logo: '/assets/svgs/housegarden.svg',
            social: {
                facebook: 'https://www.facebook.com/australianhouseandgarden',
                instagram: 'https://instagram.com/houseandgarden/?hl=en',
                pinterest: 'https://www.pinterest.com/HOUSEnGARDEN/'
            }
        }
    };

    constructor(...args) {
        super(...args);
    }

    getGroupedArticles(articles) {
        const initIndex = 7;
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

    getBrandAlias(brand) {
        return brand.toLowerCase().replace(/\-/g, '');
    }

    render() {
        const {articles, content} = this.props;
        const {urlName} = content;
        const menuSliderClassName = cx('brand', `brand--${urlName}`, 'side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        const alias = this.getBrandAlias(urlName);
        const brandConfig = Section.brands[alias] || {};
        const groupedArticles = this.getGroupedArticles(articles);

        return (
            <div className={menuSliderClassName}>
                <div className="brand__body container">
                    <div className="row">
                        <Header brand={content.title} logo={brandConfig.logo} />

                        <Featured
                            articles={slice(articles, 0, 7)}
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
                            carriageYPosition={147}>
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


export default connectToStores(Section, ['AppStore'], (context) => {
    return {
        articles: context.getStore('AppStore').getItems(),
        content: context.getStore('AppStore').getContent()
    };
});

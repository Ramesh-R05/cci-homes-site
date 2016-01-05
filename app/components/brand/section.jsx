import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'exenv';
import slice from 'lodash/array/slice';
import {connectToStores} from '@bxm/flux';
import EntityStore from '../../stores/entity';
import BrandSectionStore from '../../stores/facetedStores/brand';
import * as FacetedModuleActions from '../../actions/facetedModule';
import Header from './header';
import Featured from './featured';
import Group from './articleGroup';
import Ad from '@bxm/ad/lib/google/components/ad';
import Recommendations from '@bxm/recommendations/lib/components/recommendations';
import cx from 'classnames';

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

    getAsyncData() {
        const page = 0;
        let params;

        // SEO Task : params = { pagestart: 0, pageend: page };
        params = {
            page, source: this.props.content.source
        };

        this.context.executeAction(FacetedModuleActions.getPage, {
            params: params,
            moduleConfig: this.props.moduleConfig
        });
    }

    getGroupedArticles(articles) {
        const initIndex = 5;
        const incrementVal = 7;
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

    componentWillMount() {
        if (!canUseDOM) this.getAsyncData();
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
                            articles={slice(articles, 0, 5)}
                            brand={content.title}
                            brandConfig={brandConfig} />
                    </div>

                    <div className="row">
                        {/* Middle ad */}
                        <div className="columns small-12">
                            <Ad
                                className="ad--section-middle-leaderboard"
                                sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                                targets={{ position: 2 }} />
                        </div>
                    </div>
                    {/* Insert Gallery of Galleries Here */}

                    {/* Template for load more content */}

                    {groupedArticles}

                    <Recommendations
                        nodeType={content.nodeType}
                        nodeId={content.id} />
                </div>

                <div className="row">
                    {/* Bottom ad */}
                    <div className="columns small-12">
                        <Ad
                            className="ad--section-bottom-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{position: 3}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default connectToStores(Section, [BrandSectionStore, EntityStore], (context) => {
    return {
        articles: context.getStore(BrandSectionStore).getItems(),
        content: context.getStore(EntityStore).getContent(),
        moduleConfig: context.getStore(BrandSectionStore).getConfiguration()
    };
});

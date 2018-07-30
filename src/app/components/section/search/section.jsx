import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { connectToStores } from '@bxm/flux';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import AdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';
import Repeatable from '../../repeatable';
import loadSearch from '../../../actions/loadSearch';
import Featured from '../featured';
import Rail from '../rail';
import List from '../list';
import SiteHeader from '../../header/header';
import SiteFooter from '../../footer/footer';
import SideMenu from '../../side-menu/sideMenu';
import SectionHeader from '../header';
import MenuStore from '../../../stores/menu';
import ErrorHandlerBuilder from '../../error/errorHandlerBuilder';

class Section extends Component {
    static displayName = 'SearchSection';

    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        isSideMenuOpen: PropTypes.bool,
        list: PropTypes.object,
        listNextParams: PropTypes.object.isRequired,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.shape({
            statusCode: PropTypes.number.isRequired
        }),
        headerNavItems: PropTypes.array,
        title: PropTypes.string.isRequired,
        searchTotal: PropTypes.number.isRequired
    };

    static defaultProps = {
        articles: [],
        isSideMenuOpen: false,
        list: {},
        contentErrorStatus: null,
        currentNavigateError: null,
        headerNavItems: []
    };

    static contextTypes = {
        config: PropTypes.object
    };

    render() {
        const {
            articles, list, content, listNextParams, isSideMenuOpen,
            searchTotal, title, headerNavItems, contentErrorStatus, currentNavigateError
        } = this.props;
        const { sectionTopFeed, sectionBottomFeed } = this.context.config.polar.details;
        const sectionClassName = cx('section__landing', 'side-menu-slider', {
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
        const navItems = headerNavItems.map(item => ({ ...item, name: item.contentTitle }));
        const headerProps = { ...this.props };
        let ErrorElement = null;

        delete headerProps.title;

        if (contentErrorStatus || currentNavigateError) {
            let errorStatus = ErrorHandlerBuilder.DEFAULT_CODE;
            if (currentNavigateError) {
                errorStatus = currentNavigateError.statusCode;
            } else if (contentErrorStatus) {
                errorStatus = contentErrorStatus.status;
            }
            ErrorElement = ErrorHandlerBuilder(errorStatus);
        }

        return (
            <div className="default-template">
                <SiteHeader isSideMenuOpen={isSideMenuOpen} navItems={navItems} />
                <SideMenu open={isSideMenuOpen} navItems={navItems} />

                <SectionHeader
                  {...headerProps}
                  title={`${searchTotal} ${title} results`}
                  splitTitle={false}
                />

                <AdsWrapper>

                    { ErrorElement ? <ErrorElement />
                    : (
                        <div className={sectionClassName}>
                            <div className="container">
                                <div className="section__row">
                                    <Featured articles={articles} polarTargets={sectionTopFeed} showSearchBar />
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
                                      action={loadSearch}
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
) }
                </AdsWrapper>

                <SiteFooter />

            </div>
        );
    }
}

export default connectToStores(Section, ['SearchStore', MenuStore], (context) => {
    const searchStore = context.getStore('SearchStore');
    const menuStore = context.getStore(MenuStore);

    return {
        title: searchStore.getTitle(),
        listNextParams: searchStore.getSearchListNextParams(),
        searchTotal: searchStore.getSearchTotal(),
        articles: searchStore.getInitialSearchResults(),
        list: searchStore.getSearchResultsList(),
        content: { nodeType: 'search' },
        isSideMenuOpen: menuStore.isSideMenuOpen(),
        headerNavItems: searchStore.getHeaderItems(),
        contentErrorStatus: searchStore.getErrorStatus()
    };
});

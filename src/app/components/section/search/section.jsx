import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectToStores } from '@bxm/flux';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import AdsWrapper from '@bxm/ad/lib/google/components/standardPageAdsWrapper';
import hamburgerWrapper from '@bxm/nav/lib/components/hamburgerWrapper';
import Header from '@bxm/site-header';
import Repeatable from '../../repeatable';
import loadSearch from '../../../actions/loadSearch';
import Featured from '../featured';
import Rail from '../rail';
import List from '../list';
import SiteFooter from '../../site-footer';
import SectionHeader from '../header';
import ErrorHandlerBuilder from '../../error/errorHandlerBuilder';
import OffCanvas from '../../off-canvas/offCanvas';

@hamburgerWrapper
class Section extends Component {
    static displayName = 'SearchSection';

    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        list: PropTypes.object,
        listNextParams: PropTypes.object.isRequired,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.shape({
            statusCode: PropTypes.number.isRequired
        }),
        headerNavItems: PropTypes.array,
        hamburgerNavItems: PropTypes.array,
        title: PropTypes.string.isRequired,
        searchTotal: PropTypes.number.isRequired,
        currentUrl: PropTypes.string.isRequired,
        toggleSideMenu: PropTypes.func.isRequired,
        menuClasses: PropTypes.string.isRequired
    };

    static defaultProps = {
        articles: [],
        list: {},
        contentErrorStatus: null,
        currentNavigateError: null,
        headerNavItems: [],
        hamburgerNavItems: []
    };

    static contextTypes = {
        config: PropTypes.object
    };

    toggleMenu = () => {
        const { toggleSideMenu } = this.props;

        toggleSideMenu('left');
    };

    render() {
        const {
            articles,
            list,
            content,
            listNextParams,
            searchTotal,
            title,
            headerNavItems,
            hamburgerNavItems,
            contentErrorStatus,
            currentNavigateError,
            currentUrl,
            menuClasses
        } = this.props;
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
                <div className={menuClasses}>
                    <Header
                        currentUrl={currentUrl}
                        navItems={headerNavItems}
                        siteName={config.site.name}
                        toggleMenu={this.toggleMenu}
                        permanentlyFixedIfShorterThan={49}
                        isExpanded
                        wrapperClassName="header"
                        headerClassName="header__inner"
                    />
                    <OffCanvas navItems={hamburgerNavItems} toggleSideMenu={this.toggleMenu} currentUrl={currentUrl} />

                    <SectionHeader {...headerProps} title={`${searchTotal} ${title} results`} splitTitle={false} />

                    <AdsWrapper>
                        {ErrorElement ? (
                            <ErrorElement />
                        ) : (
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
                        )}
                    </AdsWrapper>

                    <SiteFooter />
                </div>
            </div>
        );
    }
}

export default connectToStores(Section, ['SearchStore', 'NavigationStore'], context => {
    const searchStore = context.getStore('SearchStore');
    const navigationStore = context.getStore('NavigationStore');

    return {
        title: searchStore.getTitle(),
        listNextParams: searchStore.getSearchListNextParams(),
        searchTotal: searchStore.getSearchTotal(),
        articles: searchStore.getInitialSearchResults(),
        list: searchStore.getSearchResultsList(),
        content: { nodeType: 'search' },
        headerNavItems: navigationStore.getHeaderItems(),
        hamburgerNavItems: navigationStore.getHamburgerItems(),
        contentErrorStatus: searchStore.getErrorStatus()
    };
});

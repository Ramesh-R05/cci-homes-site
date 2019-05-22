import { connectToStores } from '@bxm/flux';
import Header from '@bxm/site-header';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';
import ContentComponent from '../search/searchContent';
import SearchContentHeader from '../section/header';
import SiteFooter from '../site-footer';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';

export class SearchResultsPage extends Component {
    static propTypes = {
        articles: PropTypes.array,
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
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
        currentUrl: PropTypes.string.isRequired
    };

    static defaultProps = {
        articles: [],
        list: {},
        contentErrorStatus: null,
        currentNavigateError: null,
        headerNavItems: [],
        hamburgerNavItems: []
    };

    render() {
        const {
            headerNavItems,
            hamburgerNavItems,
            currentUrl,
            content,
            searchTotal,
            title,
            contentErrorStatus,
            currentNavigateError,
            theme,
            list,
            listNextParams,
            articles
        } = this.props;

        const templateProps = {
            classModifier: 'search-results-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content, list, listNextParams, articles },
            contentErrorStatus,
            currentNavigateError,
            withAdsWrapper: true,
            HeaderComponent: Header,
            ContentHeaderComponent: SearchContentHeader,
            ContentComponent,
            FooterComponent: SiteFooter,
            headerProps: {
                permanentlyFixedIfShorterThan: 49,
                theme,
                isExpanded: true,
                wrapperClassName: 'header',
                headerClassName: 'header__inner'
            },
            contentHeaderProps: {
                title: `${searchTotal} ${title} results`,
                splitTitle: false
            }
        };

        return <Renderer Template={PageTemplate} templateProps={templateProps} />;
    }
}

export default connectToStores(CheckHeaderTheme(SearchResultsPage), ['SearchStore', 'NavigationStore'], context => {
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

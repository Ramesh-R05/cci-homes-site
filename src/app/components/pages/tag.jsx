import { connectToStores } from '@bxm/flux';
import Header from '@bxm/site-header';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';
import TagContentHeader from '../section/header';
import TagContent from '../section/tag/section';
import SiteFooter from '../site-footer';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';

export class TagPage extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        currentUrl: PropTypes.string.isRequired,
        articles: PropTypes.array.isRequired,
        list: PropTypes.array.isRequired,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        headerNavItems: [],
        hamburgerNavItems: [],
        contentErrorStatus: null,
        currentNavigateError: null
    };

    render() {
        const {
            headerNavItems,
            hamburgerNavItems,
            currentUrl,
            theme,
            content,
            contentErrorStatus,
            currentNavigateError,
            articles,
            list,
            listNextParams
        } = this.props;

        const templateProps = {
            classModifier: 'campaign-section-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content, articles, list, listNextParams },
            contentErrorStatus,
            currentNavigateError,
            withAdsWrapper: true,
            HeaderComponent: Header,
            ContentHeaderComponent: TagContentHeader,
            ContentComponent: TagContent,
            FooterComponent: SiteFooter,
            headerProps: {
                permanentlyFixedIfShorterThan: 49,
                theme,
                isExpanded: true,
                wrapperClassName: 'header',
                headerClassName: 'header__inner'
            }
        };

        return <Renderer Template={PageTemplate} templateProps={templateProps} />;
    }
}

export default connectToStores(CheckHeaderTheme(TagPage), ['PageStore', 'NavigationStore'], context => {
    const PageStore = context.getStore('PageStore');
    const NavigationStore = context.getStore('NavigationStore');

    return {
        content: PageStore.getContent(),
        theme: PageStore.getTheme(),
        contentErrorStatus: PageStore.getErrorStatus(),
        headerNavItems: NavigationStore.getHeaderItems(),
        hamburgerNavItems: NavigationStore.getHamburgerItems(),
        articles: PageStore.getItems(),
        list: PageStore.getList(),
        listNextParams: PageStore.getListNextParams()
    };
});

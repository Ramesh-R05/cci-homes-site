import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '@bxm/site-header';
import { connectToStores } from '@bxm/flux';
import getBrand from '../brand/utilities/getBrand';
import Renderer from '../templates/templateRenderer';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import HeaderAd from '../home/header';
import ArticleContent from '../article/page';
import SiteFooter from '../site-footer';
import HeaderThemeCheck from '../helpers/checkHeaderTheme';

export class ArticlePage extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        currentUrl: PropTypes.string.isRequired
    };

    static defaultProps = {
        headerNavItems: [],
        hamburgerNavItems: [],
        contentErrorStatus: null,
        currentNavigateError: null,
        theme: {}
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const { headerNavItems, hamburgerNavItems, currentUrl, theme, content, contentErrorStatus, currentNavigateError } = this.props;
        const { config } = this.context;

        const brandConfig = getBrand(config, content && content.source);

        const templateProps = {
            classModifier: 'article-content-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentErrorStatus,
            currentNavigateError,
            contentProps: { content, brandConfig },
            withAdsWrapper: true,
            HeaderComponent: Header,
            ContentHeaderComponent: HeaderAd,
            ContentComponent: ArticleContent,
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

export default connectToStores(HeaderThemeCheck(ArticlePage), ['PageStore', 'NavigationStore'], context => {
    const PageStore = context.getStore('PageStore');
    const NavigationStore = context.getStore('NavigationStore');

    return {
        content: PageStore.getContent(),
        theme: PageStore.getTheme(),
        contentErrorStatus: PageStore.getErrorStatus(),
        headerNavItems: NavigationStore.getHeaderItems(),
        hamburgerNavItems: NavigationStore.getHamburgerItems()
    };
});

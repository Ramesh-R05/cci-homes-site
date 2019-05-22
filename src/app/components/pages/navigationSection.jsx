import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '@bxm/site-header';
import { connectToStores } from '@bxm/flux';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import Renderer from '../templates/templateRenderer';
import SectionHeader from '../section/header';
import NavSectionContent from '../section/navigationTag/section';
import SiteFooter from '../site-footer';
import CheckHeaderTheme from '../helpers/checkHeaderTheme';

export class NavigationSection extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        currentUrl: PropTypes.string.isRequired,
        articles: PropTypes.arrayOf(PropTypes.object),
        galleries: PropTypes.array.isRequired,
        hero: PropTypes.object.isRequired,
        list: PropTypes.object,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        list: {},
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
            galleries,
            hero,
            listNextParams,
            list
        } = this.props;

        const useContentTitle = content && content.nodeType === 'CommercialTagSection';

        const templateProps = {
            classModifier: 'navigation-section-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content, articles, galleries, hero, listNextParams, list },
            contentErrorStatus,
            currentNavigateError,
            useContentTitle,
            withAdsWrapper: true,
            HeaderComponent: Header,
            ContentHeaderComponent: SectionHeader,
            ContentComponent: NavSectionContent,
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

export default connectToStores(CheckHeaderTheme(NavigationSection), ['PageStore', 'NavigationStore'], context => {
    const PageStore = context.getStore('PageStore');
    const NavigationStore = context.getStore('NavigationStore');

    return {
        content: PageStore.getContent(),
        theme: PageStore.getTheme(),
        contentErrorStatus: PageStore.getErrorStatus(),
        headerNavItems: NavigationStore.getHeaderItems(),
        hamburgerNavItems: NavigationStore.getHamburgerItems(),
        articles: PageStore.getItems(),
        galleries: PageStore.getModuleItems('galleries'),
        list: PageStore.getList(),
        listNextParams: PageStore.getListNextParams(),
        hero: PageStore.getHeroItem()
    };
});

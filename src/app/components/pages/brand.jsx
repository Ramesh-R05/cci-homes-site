import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from '@bxm/site-header';
import { connectToStores } from '@bxm/flux';
import getBrand from '../brand/utilities/getBrand';
import Renderer from '../templates/templateRenderer';
import PageTemplate from '../templates/pageTemplate/PageTemplate';
import BrandHeader from '../brand/header';
import Brand from '../brand/section';
import SiteFooter from '../site-footer';
import HeaderThemeCheck from '../helpers/checkHeaderTheme';

export class BrandPage extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        theme: PropTypes.object,
        contentErrorStatus: PropTypes.object,
        currentNavigateError: PropTypes.object,
        headerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        hamburgerNavItems: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        currentUrl: PropTypes.string.isRequired,
        hero: PropTypes.object.isRequired,
        articles: PropTypes.array.isRequired,
        list: PropTypes.object.isRequired,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        headerNavItems: [],
        hamburgerNavItems: [],
        contentErrorStatus: null,
        currentNavigateError: null,
        theme: null
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
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
            hero,
            articles,
            list,
            listNextParams
        } = this.props;
        const { config } = this.context;

        const { logo } = getBrand(config, content.source);

        const templateProps = {
            classModifier: 'brand-page',
            hamburgerNavItems,
            headerNavItems,
            currentUrl,
            contentProps: { content, hero, articles, list, listNextParams },
            contentErrorStatus,
            currentNavigateError,
            withAdsWrapper: true,
            HeaderComponent,
            ContentHeaderComponent: BrandHeader,
            ContentComponent: Brand,
            FooterComponent: SiteFooter,
            headerProps: {
                permanentlyFixedIfShorterThan: 49,
                theme,
                isExpanded: true,
                wrapperClassName: 'header',
                headerClassName: 'header__inner'
            },
            contentHeaderProps: { logo }
        };

        return <Renderer Template={PageTemplate} templateProps={templateProps} />;
    }
}

export default connectToStores(HeaderThemeCheck(BrandPage), ['PageStore', 'NavigationStore'], context => {
    const PageStore = context.getStore('PageStore');
    const NavigationStore = context.getStore('NavigationStore');

    return {
        content: PageStore.getContent(),
        theme: PageStore.getTheme(),
        contentErrorStatus: PageStore.getErrorStatus(),
        headerNavItems: NavigationStore.getHeaderItems(),
        hamburgerNavItems: NavigationStore.getHamburgerItems(),
        hero: PageStore.getHeroItem(),
        articles: PageStore.getItems(),
        list: PageStore.getList(),
        listNextParams: PageStore.getListNextParams()
    };
});

import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import PageStore from '../../stores/page';
import MenuStore from '../../stores/menu';
import Header from '../header/header';
import Footer from '../footer/footer';
import SideMenu from '../side-menu/sideMenu';
import HomePageHandler from '../home/home';
import HomesArticleHandler from '../article/page';
import NavigationSectionHandler from '../section/navigationTag/section';
import TagSectionHandler from '../section/tag/section';
import BrandSectionHandler from '../brand/section';
import CampaignSectionHandler from '../section/sponsorTag/section';
import GalleryHandler from '@bxm/gallery/lib/components/page/gallery';
import ErrorHandlerBuilder from '../error/errorHandlerBuilder';
import Uniheader from '../header/uniheader';
import cx from 'classnames';
import {load} from '@bxm/config';
const config = load();

class DefaultTemplate extends Component {

    static propTypes = {
        content: PropTypes.object,
        contentErrorStatus: PropTypes.object,
        isSideMenuOpen: PropTypes.bool,
        headerNavItems: PropTypes.array
    };

    static defaultProps = {
        content: null,
        contentErrorStatus: null,
        isSideMenuOpen: false,
        headerNavItems: []
    };

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);
    }

    componentDidMount() {
        // Temp added here due to unforseen update of versions when updating react.
        // This loads <picture> element in older browsers and IE
        require('picturefill');
    }

    render() {
        const {content} = this.props;
        const {Handler, hideFooter, hideHeader} = this.getPageMetadata();
        const localeData = config.get('localeData');

        return (
            <div className="default-template">
                {content && content.url === '/' ? <Uniheader /> : null }
                {hideHeader ? null :
                    <Header
                        isSideMenuOpen={this.props.isSideMenuOpen}
                        navItems={this.props.headerNavItems}
                    />
                }
                <SideMenu
                    open={this.props.isSideMenuOpen}
                    navItems={this.props.headerNavItems}
                    data={localeData}
                />
                <Handler
                    content={this.props.content}
                    isSideMenuOpen={this.props.isSideMenuOpen}
                />
                {hideFooter ? null : <Footer config={localeData} />}
            </div>
        );
    }

    getPageMetadata() {
        // Error cases
        if (this.props.contentErrorStatus) {
            return this.handleContentError(this.props.contentErrorStatus);
        } else if (!this.props.content) {
            return this.handleNoContent();
        }

        switch (this.props.content.nodeType) {
            case 'Homepage':
                return {
                    Handler: HomePageHandler
                };
            case 'HomesArticle':
                return {
                    Handler: HomesArticleHandler,
                    hideFooter: true
                };
            case 'NavigationSection':
                return {
                    Handler: NavigationSectionHandler
                };
            case 'TagSection':
                return {
                    Handler: TagSectionHandler
                };
            case 'BrandSection':
                return {
                    Handler: BrandSectionHandler
                };
            case 'Campaign':
                return {
                    Handler: CampaignSectionHandler
                };
            case 'Gallery':
                return {
                    Handler: GalleryHandler,
                    hideHeader: true,
                    hideFooter: true
                };
            default:
                console.error({message: `Unsupported nodeType (${this.props.content.nodeType})`});
                return this.handleNoContent();
        }
    }

    handleNoContent() {
        return {
            Handler: ErrorHandlerBuilder(500)
        };
    }

    handleContentError(errorStatus) {
        return {
            Handler: ErrorHandlerBuilder(errorStatus.status) || ErrorHandlerBuilder(500)
        };
    }
}

export default connectToStores(DefaultTemplate, ['AppStore', PageStore, MenuStore], (context) => {
    return {
        content: context.getStore(PageStore).getContent(),
        contentErrorStatus: context.getStore(PageStore).getErrorStatus(),
        isSideMenuOpen: context.getStore(MenuStore).isSideMenuOpen(),
        headerNavItems: context.getStore('AppStore').getHeaderItems()
    };
});
